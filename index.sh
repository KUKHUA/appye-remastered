#!/bin/bash

# Function to escape special characters in JSON
json_escape() {
    printf '%s' "$1" | python -c 'import json,sys; print(json.dumps(sys.stdin.read()))'
}

# Start the JSON array
echo "{" > files.json
echo "  \"files\": [" >> files.json

# Use find to get all files in fileSystem/, then format as JSON
first=true
find fileSystem/ -type f -printf '%P\0' | while IFS= read -r -d '' file; do
    if [ "$first" = true ]; then
        first=false
    else
        echo "," >> files.json
    fi
    escaped_path=$(json_escape "/fileSystem/$file")
    echo "    $escaped_path" >> files.json
done

# Close the JSON array and object
echo "  ]" >> files.json
echo "}" >> files.json

echo "File list from fileSystem/ has been saved to files.json"
