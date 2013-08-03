#!/bin/bash
echo "Starting building additional components..."
PROJECT_PATH=`dirname $0`
export PROJECT_PATH
echo "Step 1: Starting jsDoc..."
/usr/local/share/npm/bin/jsDoc $PROJECT_PATH/tests/modules.js  -p -e utf-8  $PROJECT_PATH/README.md -d $PROJECT_PATH/jsDoc
echo "Starting minifier..."
/usr/local/share/npm/bin/minify $PROJECT_PATH/tests/modules.js
echo "OK! Completed."