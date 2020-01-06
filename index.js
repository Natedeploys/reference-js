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

const BibtexToJSON = file => {};

module.exports = {
  fileExistsCheck,
  BibtexToJSON
};
