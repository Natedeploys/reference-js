const fs = require("fs");
const { parseBibTex } = require("./utilities/BibTexParsers");

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

const BibTeXToJSON = path => {
  fs.readFile(__dirname + path, "utf8", (err, data) => {
    if (!err) {
      console.log(parseBibTex(data.toString()));
    } else {
      console.log(err);
    }
  });
};

/**
 * @function - Converts JSON to BibTeX
 * @param {string, buffer, URL} path
 * @returns {JSON}
 */

const JSONToBibTeX = path => {};

module.exports = {
  fileExistsCheck,
  BibTeXToJSON,
  JSONToBibTeX
};
