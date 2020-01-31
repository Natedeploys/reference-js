const fs = require('fs');
const path = require('path');
const { jsonToBibtex } = require('../index');

// Read or access your file however you want,
// just pass in the file contents.
fs.readFile(path.join(__dirname, '../samples/references.json'), 'utf8', (_, content) => {
  // Pass in the JSON as a string and JSON property as a string
  // holding array fo objects
  jsonToBibtex(content, 'references')
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
