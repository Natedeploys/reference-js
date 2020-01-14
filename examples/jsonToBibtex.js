const { jsonToBibtex } = require('../index');

// Pass in JSON or file, provide property to access array of objects
jsonToBibtex('/samples/references.json', 'references')
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
