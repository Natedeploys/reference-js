const { bibtexToJSON } = require('../index');

// Path relative to where index.js is
bibtexToJSON('/samples/references.bib')
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
