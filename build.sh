#!/bin/bash
echo "Cleaning project..."
rm modules.min.js
echo "Starting building additional components..."
#PROJECT_PATH=`dirname $0`
#export PROJECT_PATH
echo "Step 1: Starting jsDoc..."
/usr/local/bin/jsdoc modules.js  -p -e utf-8 README.md -d jsDoc
echo "Starting minifier..."
/usr/local/bin/uglifyjs modules.js >> modules.min.js
echo "OK! Completed."