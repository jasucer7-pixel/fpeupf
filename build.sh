#!/bin/sh
# Builds the standalone web page (index.html) from the artifact source.
set -e
cd "$(dirname "$0")"
{
  printf '%s\n' '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  printf '%s\n' '<meta name="theme-color" content="#2d55c8"><link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="icon.svg">'
  printf '%s\n' '<meta name="apple-mobile-web-app-capable" content="yes"><meta name="description" content="Organiza el estudio, concéntrate y no te agobies. Para FPE en la UPF.">'
  printf '%s\n' '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}img{max-width:100%}</style></head><body>'
  cat src/segunda-mente.html
  printf '%s\n' '</body></html>'
} > index.html
echo "index.html generado"
