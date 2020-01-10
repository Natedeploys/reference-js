const { jsonToBibtex } = require('../index');

// Path relative to where index.js is
jsonToBibtex('/samples/references.json')
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
