#!/bin/sh

set -e

npm i
npm run build-wally
rojo build -o wcs.rbxm default.project.json
lune run scripts/omit-tests.luau wcs.rbxm