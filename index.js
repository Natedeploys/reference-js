const fs = require("fs");
const { parseBibTex } = require("./utilities/BibTexParsers");

/**
 * @function - Checks if the file exists
 * @param {string, buffer, URL} path
 * @returns {error}
 */

const fileExistsCheck = path => {
  fs.access(__dirname + path, fs.constants.F_OK, err => {
    if (err) {
      return err;
    }
  });
};

/**
 * @function - Converts BibTeX to JSON
 * @param {string, buffer, URL} path
 * @returns {JSON}
 */

const BibTeXToJSON = path =>
  new Promise((resolve, reject) => {
    let error = fileExistsCheck(path);
    fs.readFile(__dirname + path, "utf8", (err, data) => {
      error = err;
      if (!error) {
        const parsedData = parseBibTex(data.toString());
        resolve(parsedData);
      } else {
        reject(error.message);
      }
    });
  });

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
