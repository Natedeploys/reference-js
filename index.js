const fs = require('fs');
const path = require('path');
const { parseBibtex } = require('./utilities/BibTexParsers');

/**
 * @function - Checks if the file exists
 * @param {string, buffer, URL} path
 * @returns {error}
 */

const fileExistsCheck = (loc) => {
  fs.access(path.join(__dirname, loc), fs.constants.F_OK, (err) => {
    if (err) {
      return err;
    }
    return null;
  });
};

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
      const parsedData = parseBibtex(data.toString());
      resolve(parsedData);
    } else {
      reject(error.message);
    }
  });
});

module.exports = {
  fileExistsCheck,
  bibtexToJSON,
};
