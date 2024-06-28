#!/bin/sh

set -e

npm i
npm run build-wally
rm -rf out/**/*.d.ts
rm -rf out/**/*.spec.lua
rm -rf out/*.d.ts
rm -rf out/*.tsbuildinfo

wally package --output wcs.zip