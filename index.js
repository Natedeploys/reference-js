const fs = require("fs");

/**
 * @function - Checks if the file exists
 * @param {string, buffer, URL} path
 * @returns {error}
 */

const fileExistsCheck = path => {
  fs.access(path, fs.constants.F_OK, err => {
    if (err) {
      return err;
    } else {
      return;
    }
  });
};

/**
 * @function - Converts BibTeX to JSON
 * @param {string, buffer, URL} path
 * @returns {JSON}
 */

const BibTeXToJSON = path => {};

/**
 * @function - Converts JSON to BibTeX
 * @param {string, buffer, URL} path
 * @returns {JSON}
 */

const JSONToBibTeX = path => {};

module.exports = {
  fileExistsCheck,
  BibTeXToJSON
};
