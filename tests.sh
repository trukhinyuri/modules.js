#!/usr/bin/env bash
npx mocha-headless-chrome -f http://localhost:8080/test -e /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
rm -r -f jsDoc/*
npx jsdoc modules.js -d jsDoc --package package.json --readme README.md --tutorials tutorials