#!/bin/bash
echo "Cleaning project..."
rm tests/modules.min.js
echo "Starting building additional components..."
#PROJECT_PATH=`dirname $0`
#export PROJECT_PATH
echo "Step 1: Starting jsDoc..."
/usr/local/bin/jsdoc tests/modules.js  -p -e utf-8 README.md -d jsDoc
echo "Starting minifier..."
/usr/local/bin/uglifyjs tests/modules.js >> tests/modules.min.js
echo "OK! Completed."