const chevrotain = require('chevrotain');

const { createToken } = chevrotain;

const typeProperty = createToken({
  name: 'Type',
  pattern: /@ARTICLE|@BOOK|@INCOLLECTION|@PHDTHESIS|@TECHREPORT|@MISC|@INPROCEEDINGS/i,
});
const keyProperty = createToken({ name: 'Key', pattern: /[a-z]{4}[0-9][0-9]/i });
const generalProperty = createToken({
  name: 'Field',
  pattern: /AUTHOR.*|TITLE.*|JOURNAL.*|VOLUME.*|YEAR.*|NUMBER.*|PAGES.*|EDITION.*|PUBLISHER.*|ADDRESS.*|VOLUME.*|SERIES.*|BOOKTITLE.*|EDITOR.*|NOTE.*|HOWPUBLISHED.*|DOI.*|MONTH.*|URL.*|ORGANIZATION.*/i,
});

const SelectLexer = new chevrotain.Lexer([typeProperty, generalProperty, keyProperty], {
  positionTracking: 'onlyOffset',
});

/**
 * @function - Transforms a token vector into JSON
 * @param {vector} Tokens
 * @returns {Array}
 */

const transformToJSON = (parsedData) => {
  const bibtexArray = [];
  let item = {};

  parsedData.tokens.forEach(({ image, tokenType: { name } }, index) => {
    if (name === 'Type') {
      item.type = image.replace(/@/, '');
    }

    if (name === 'Key') {
      item.key = image;
    }

    if (name === 'Field') {
      const str = image.split(/[=]/gm);
      const property = str[0].replace(/[ \t]+$/, '');
      item[property] = str[1].replace(/^\s+/, '');

      if (
        parsedData.tokens[index + 1] === undefined
        || parsedData.tokens[index + 1].tokenType.name === 'Type'
      ) {
        bibtexArray.push(item);
        item = {};
      }
    }
  });

  return bibtexArray;
};

/**
 * @function - Cleans the string and transforms into token vector
 * @param {string, buffer, URL} path
 * @returns {Array}
 */

const parseBibtex = (data) => {
  const dataString = data.toString();
  const noComments = dataString.replace(/^%(.*\n)/gm, '');
  const typeLine = noComments.replace(
    /ARTICLE|BOOK|INCOLLECTION|PHDTHESIS|TECHREPORT|MISC|INPROCEEDINGS/gim,
    '$&\n',
  );
  const cleansed = typeLine.replace(/['*{},"]/gm, '');
  const parsedData = SelectLexer.tokenize(cleansed);

  // console.log(cleansed)

  return transformToJSON(parsedData);
};

module.exports = {
  parseBibtex,
};
