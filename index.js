const { isValidJSON } = require('./utilities/validation');
const { parseBibtex, parseToBibtex } = require('./parsers/bibtexParsers');

/**
 * @function - Converts JSON to BibTeX
 * @param {string} content
 * @returns {Promise}
 */

const jsonToBibtex = (data, property) => new Promise((resolve, reject) => {
  const valid = isValidJSON(data.toString());
  if (valid) {
    const parsedData = parseToBibtex(data.toString(), property);
    resolve(parsedData);
  } else {
    const invalid = new Error('Invalid JSON');
    reject(invalid.message);
  }
});

/**
 * @function - Converts BibTeX to JSON
 * @param {string} content
 * @returns {Promise}
 */

const bibtexToJSON = (content) => new Promise((resolve, reject) => {
  if (content) {
    const parsedData = parseBibtex(content);
    resolve(parsedData);
  } else {
    const error = new Error('Data passed in is invalid');
    reject(error.message);
  }
});

module.exports = {
  bibtexToJSON,
  jsonToBibtex,
};
