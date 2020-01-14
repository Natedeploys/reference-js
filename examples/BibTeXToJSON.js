const fs = require('fs');
const path = require('path');
const { bibtexToJSON } = require('../index');

// Read or access your file however you want,
// just pass in the file contents.
fs.readFile(path.join(__dirname, '../samples/references.bib'), 'utf8', (_, content) => {
  bibtexToJSON(content)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
