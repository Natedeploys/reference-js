const fs = require('fs');
const path = require('path');
const { fileExistsCheck, isValidJSON } = require('./utilities/validation');
const { parseBibtex, parseToBibtex } = require('./parsers/bibtexParsers');

/**
 * @function - Converts JSON to BibTeX
 * @param {string, buffer, URL} path
 * @returns {JSON}
 */

const jsonToBibtex = (loc) => new Promise((resolve, reject) => {
  let error = fileExistsCheck(loc);
  fs.readFile(path.join(__dirname, loc), 'utf8', (err, data) => {
    error = err;
    const valid = isValidJSON(data.toString());
    if (valid && !error) {
      const parsedData = parseToBibtex(data.toString());
      resolve(parsedData);
    } else {
      const invalid = new Error('Invalid JSON');
      reject(invalid.message);
    }
  });
});

/**
 * @function - Converts BibTeX to JSON
 * @param {string, buffer, URL} path
 * @returns {JSON}
 */

const bibtexToJSON = (loc) => new Promise((resolve, reject) => {
  let error = fileExistsCheck(loc);
  fs.readFile(path.join(__dirname, loc), 'utf8', (err, data) => {
    error = err;
    if (!error) {
      const parsedData = parseBibtex(data);
      resolve(parsedData);
    } else {
      reject(error.message);
    }
  });
});

module.exports = {
  fileExistsCheck,
  bibtexToJSON,
  jsonToBibtex,
};
