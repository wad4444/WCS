#!/bin/sh

set -e

npm i
npm run build-wally
rm -rf out/**/*.d.ts

wally publish