// Pruebas de extremo a extremo de Segunda Mente FPE.
// Uso: node tests/app.test.js   (necesita el paquete "playwright" y Chromium)
// Sirve la web en un puerto local, simula la API de GitHub y recorre las funciones principales.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium, devices } = require("playwright");

const ROOT = path.join(__dirname, "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json", ".json": "application/json" };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split("?")[0]);
  const file = path.join(ROOT, p === "/" ? "index.html" : p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

const results = [];
async function test(name, fn) {
  try { await fn(); results.push([true, name]); console.log("  ok  " + name); }
  catch (e) { results.push([false, name]); console.log("  FALLO  " + name + "\n        " + (e && e.message || e)); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }
const key = t => { const d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };

// Datos de ejemplo inventados en el formato antiguo (v1), para probar la migración.
function sampleV1() {
  const now = Date.now();
  return {
    v: 1, updated: now, onboarded: true, name: "Alex",
    subjects: [{ id: "s1", name: "Microeconomía", color: "#2d55c8", ects: 6 }, { id: "s2", name: "Lógica", color: "#0f9488", ects: 6 }],
    tasks: [
      { id: "t1", title: "Problemas tema 4", subjectId: "s1", type: "tarea", due: key(now + 3 * 864e5), est: 30, done: false, today: true },
      { id: "t2", title: "Examen parcial de Lógica", subjectId: "s2", type: "examen", due: key(now + 10 * 864e5), done: false },
      { id: "t3", title: "Lectura de Rawls", subjectId: "s1", type: "lectura", done: true, doneAt: now }
    ],
    notes: [{ id: "n1", kind: "duda", text: "¿Por qué el equilibrio de Nash no es eficiente?", subjectId: "s1", ts: now }],
    sessions: [{ id: "x1", subjectId: "s1", min: 25, ts: now - 864e5 }, { id: "x2", subjectId: "s2", min: 50, ts: now - 3600e3 }],
    checkins: {}, control: [], settings: { focus: 25, brk: 5, termStart: "2026-09-21" }
  };
}

(async () => {
  await new Promise(r => server.listen(0, r));
  const BASE = "http://localhost:" + server.address().port + "/index.html";
  const browser = await chromium.launch();
  const errors = [];
  const newPage = async (opts = {}) => {
    const ctx = await browser.newContext(Object.assign({ viewport: { width: 1280, height: 900 } }, opts));
    const page = await ctx.newPage();
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error" && !/Failed to load resource|401/.test(m.text())) errors.push(m.text()); });
    return { ctx, page };
  };
  const state = page => page.evaluate(() => JSON.parse(localStorage.getItem("segunda-mente-fpe-v1") || "{}"));

  console.log("Segunda Mente FPE: pruebas");

  await test("primer uso: bienvenida y elegir asignaturas", async () => {
    const { page } = await newPage();
    await page.goto(BASE);
    await page.click('[data-act="ob-pick"][data-name="Lógica"]');
    await page.click('[data-act="ob-pick"][data-name="Ciencia Política"]');
    await page.fill("#ob-name", "Alex");
    await page.click('[data-act="ob-done"]');
    const s = await state(page);
    assert(s.onboarded && s.subjects.length === 2, "no se guardaron las asignaturas");
    assert(s.habits.length === 4 && s.milestones.length > 0, "faltan hábitos o hitos por defecto");
  });

  await test("migración desde datos antiguos sin perder nada", async () => {
    const { page } = await newPage();
    await page.goto(BASE);
    await page.evaluate(d => localStorage.setItem("segunda-mente-fpe-v1", d), JSON.stringify(sampleV1()));
    await page.reload();
    await page.click('[data-act="energy"][data-v="media"]');
    const s = await state(page);
    assert(s.v >= 4, "versión de datos no actualizada: " + s.v);
    assert(s.tasks.length === 3 && s.notes.length === 1 && s.sessions.length === 2, "se perdieron datos");
    assert(s.tasks[0].plan === key(Date.now()), "la tarea de hoy no pasó a planificada");
    assert(s.xp > 0, "no se calcularon los puntos");
  });

  await test("todas las secciones se abren sin errores", async () => {
    const { page } = await newPage();
    await page.goto(BASE);
    await page.evaluate(d => localStorage.setItem("segunda-mente-fpe-v1", d), JSON.stringify(sampleV1()));
    await page.reload();
    for (const v of ["hoy", "foco", "plan", "calendario", "coach", "repasar", "mente", "progreso", "camino", "calma", "guia"]) {
      await page.evaluate(x => { location.hash = x; }, v);
      await page.waitForTimeout(150);
      const h1 = await page.$eval("h1", e => e.textContent);
      assert(h1 && h1.length > 0, "la sección " + v + " no se pintó");
    }
    for (const t of ["lista", "semana", "trimestre", "prioridades", "examenes", "horario", "asignaturas"]) {
      await page.evaluate(() => { location.hash = "plan"; });
      await page.click(`[data-act="plan-tab"][data-v="${t}"]`);
    }
  });

  await test("tareas: añadir, completar y deshacer un borrado", async () => {
    const { page } = await newPage();
    await page.goto(BASE);
    await page.evaluate(d => localStorage.setItem("segunda-mente-fpe-v1", d), JSON.stringify(sampleV1()));
    await page.reload();
    await page.click('.tab[data-go="plan"]');
    await page.fill("#nt-title", "Ejercicios de prueba");
    await page.click('[data-act="add-task"]');
    const xp0 = (await state(page)).xp;
    await page.click('.task:has-text("Ejercicios de prueba") [data-act="toggle-task"]');
    assert((await state(page)).xp >= xp0 + 10, "completar no dio al menos 10 XP");
    await page.click('.task:has-text("Problemas tema 4") [data-act="del-task"]');
    await page.click('#toast [data-act="undo"]');
    assert((await state(page)).tasks.some(t => t.title === "Problemas tema 4"), "deshacer no recuperó la tarea");
  });

  await test("foco: ritual, bloque completo y planta en el jardín", async () => {
    const { page } = await newPage();
    await page.goto(BASE);
    await page.evaluate(d => localStorage.setItem("segunda-mente-fpe-v1", d), JSON.stringify(sampleV1()));
    await page.reload();
    await page.click('.tab[data-go="foco"]');
    await page.click('[data-act="t-toggle"]');
    assert(await page.$('[data-act="ritual-go"]'), "no apareció el ritual");
    await page.click('[data-act="ritual-go"]');
    await page.evaluate(() => { const real = Date.now; Date.now = () => real() + 26 * 60000; });
    await page.waitForSelector('[data-act="rate"]', { timeout: 5000 });
    await page.click('[data-act="rate"][data-v="3"]');
    const s = await state(page);
    assert(s.sessions.length === 3 && s.sessions[2].rating === 3, "el bloque no se guardó");
  });

  await test("calendario: crear un evento semanal y exportar .ics", async () => {
    const { page } = await newPage({ acceptDownloads: true });
    await page.goto(BASE);
    await page.evaluate(d => localStorage.setItem("segunda-mente-fpe-v1", d), JSON.stringify(sampleV1()));
    await page.reload();
    await page.click('.tab[data-go="calendario"]');
    await page.click('main [data-act="ev-new"]');
    await page.fill("#ev-title", "Tutoría");
    await page.selectOption("#ev-rep", "semanal");
    await page.click('[data-act="ev-save"]');
    assert((await state(page)).events.length === 1, "no se guardó el evento");
    const [dl] = await Promise.all([page.waitForEvent("download"), page.click('[data-act="ics"]')]);
    const ics = fs.readFileSync(await dl.path(), "utf8");
    assert(ics.includes("BEGIN:VCALENDAR") && ics.includes("RRULE:FREQ=WEEKLY"), "el .ics no es válido");
  });

  await test("coach: entiende órdenes y preguntas", async () => {
    const { page } = await newPage();
    await page.goto(BASE);
    await page.evaluate(d => localStorage.setItem("segunda-mente-fpe-v1", d), JSON.stringify(sampleV1()));
    await page.reload();
    await page.click('.tab[data-go="coach"]');
    const ask = async q => { await page.fill("#coach-in", q); await page.click('[data-act="coach-send"]'); return page.$$eval(".msg.ai", els => els[els.length - 1].innerText); };
    assert(/Examen/.test(await ask("añade examen de lógica el jueves")), "no creó el examen");
    assert(/Pareto/.test(await ask("explícame el óptimo de Pareto")), "no explicó el concepto");
    assert(/agobi|momento|respir/i.test(await ask("estoy agobiado")), "no respondió al agobio");
  });

  await test("sincronización entre dos dispositivos e historial de versiones (GitHub simulado)", async () => {
    let gist = null; const TOKEN = "ghp_PruebaPrueba1234567890abc";
    const route = async r => {
      const req = r.request(), u = new URL(req.url()), m = req.method();
      if (req.headers()["authorization"] !== "Bearer " + TOKEN) return r.fulfill({ status: 401, json: {} });
      if (u.pathname === "/gists" && m === "GET") return r.fulfill({ json: gist ? [gist] : [] });
      if (u.pathname === "/gists" && m === "POST") { const b = JSON.parse(req.postData()); gist = { id: "g1", description: b.description, files: { "segunda-mente.json": { content: b.files["segunda-mente.json"].content } } }; return r.fulfill({ status: 201, json: gist }); }
      if (u.pathname === "/gists/g1/commits") return r.fulfill({ json: [{ version: "v-old", committed_at: new Date(Date.now() - 864e5).toISOString(), change_status: { additions: 3, deletions: 1 } }] });
      if (u.pathname === "/gists/g1/v-old") { const old = sampleV1(); old.v = 4; old.updated = Date.now() - 864e5; old.tasks = old.tasks.slice(0, 1); return r.fulfill({ json: { files: { "segunda-mente.json": { content: JSON.stringify(old) } } } }); }
      if (u.pathname === "/gists/g1" && m === "GET") return r.fulfill({ json: gist });
      if (u.pathname === "/gists/g1" && m === "PATCH") { gist.files["segunda-mente.json"].content = JSON.parse(req.postData()).files["segunda-mente.json"].content; return r.fulfill({ json: gist }); }
      return r.fulfill({ status: 404, json: {} });
    };
    const A = await newPage(); await A.ctx.route("https://api.github.com/**", route);
    await A.page.goto(BASE);
    await A.page.evaluate(d => localStorage.setItem("segunda-mente-fpe-v1", d), JSON.stringify(sampleV1()));
    await A.page.reload();
    await A.page.click('main [data-act="sync-wizard"]');
    await A.page.fill("#sync-token", TOKEN);
    await A.page.click('[data-act="sync-connect"]');
    await A.page.waitForSelector("#qr-box svg", { timeout: 5000 });
    const B = await newPage(devices["iPhone 13"]); await B.ctx.route("https://api.github.com/**", route);
    await B.page.goto(BASE + "#vincular=" + TOKEN);
    await B.page.waitForTimeout(1500);
    const sb = await state(B.page);
    assert(sb.name === "Alex" && sb.sessions.length === 2, "el móvil no recibió los datos");
    await B.page.click('[data-act="habit-toggle"] >> nth=0');
    await B.page.waitForTimeout(3200);
    await A.page.evaluate(() => window.dispatchEvent(new Event("focus")));
    await A.page.waitForTimeout(1200);
    const sa = await state(A.page);
    assert(Object.keys(sa.habitLog || {}).length === 1, "el ordenador no recibió el cambio del móvil");
    // historial de versiones: volver a la versión de ayer (que solo tenía una tarea)
    if (await A.page.$('#modal-root .modal')) await A.page.click('[data-act="modal-close"]');
    await A.page.click('main [data-act="sync-wizard"]');
    await A.page.click('[data-act="hist-open"]');
    await A.page.waitForSelector('[data-act="hist-restore"]', { timeout: 5000 });
    await A.page.click('[data-act="hist-restore"]');
    await A.page.click('[data-act="hist-restore"]');
    await A.page.waitForTimeout(800);
    assert((await state(A.page)).tasks.length === 1, "no se restauró la versión anterior");
  });

  await test("catalán: la interfaz cambia de idioma", async () => {
    const { page } = await newPage();
    await page.goto(BASE);
    const d = sampleV1(); d.settings.lang = "ca";
    await page.evaluate(x => localStorage.setItem("segunda-mente-fpe-v1", x), JSON.stringify(d));
    await page.reload();
    await page.waitForTimeout(300);
    const nav = await page.$$eval(".tab", els => els.map(e => e.textContent.trim()).join(" "));
    assert(/Avui/.test(nav) && /Calendari/.test(nav), "la navegación no está en catalán: " + nav);
  });

  await test("sin errores de JavaScript en ninguna prueba", async () => {
    assert(errors.length === 0, errors.slice(0, 3).join(" | "));
  });

  await browser.close(); server.close();
  const failed = results.filter(r => !r[0]).length;
  console.log(`\n${results.length - failed} de ${results.length} pruebas superadas`);
  process.exit(failed ? 1 : 0);
})();
