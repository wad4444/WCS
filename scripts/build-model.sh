#!/bin/sh

set -e

npm i
npm run build-wally
rm -rf out/**/*.d.ts
rm -rf out/**/*.spec.lua
rojo build -o wcs.rbxm default.project.json