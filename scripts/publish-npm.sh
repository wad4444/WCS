#!/bin/sh

set -e

npm i
npm run build-npm

npm publish