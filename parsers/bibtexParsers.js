const chevrotain = require('chevrotain');

const { createToken } = chevrotain;

const typeProperty = createToken({
  name: 'Type',
  pattern: /@ARTICLE|@BOOK|@INCOLLECTION|@PHDTHESIS|@TECHREPORT|@MISC|@INPROCEEDINGS|@UNPUBLISHED/i,
});

const keyProperty = createToken({
  name: 'Key',
  pattern: /([a-zA-Z+-]{2,}[0-9]{2,}[a-zA-Z]*)/i,
});

const generalProperty = createToken({
  name: 'Field',
  pattern: /AUTHOR.*|BOOKTITLE.*|\bTITLE.*|JOURNAL.*|VOLUME.*|YEAR.*|NUMBER.*|PAGES.*|EDITION.*|PUBLISHER.*|ADDRESS.*|VOLUME.*|SERIES.*|EDITOR.*|NOTE.*|HOWPUBLISHED.*|DOI.*|MONTH.*|URL.*|ORGANIZATION.*/i,
});

const sentenceProperty = createToken({
  name: 'Sentence',
  pattern: /[a-zA-Z0-9-.]+/i,
});

const SelectLexer = new chevrotain.Lexer(
  [typeProperty, keyProperty, generalProperty, sentenceProperty],
  {
    positionTracking: 'onlyOffset',
  },
);

/**
 * @function - Transforms a token vector into JSON
 * @param {vector} Tokens
 * @returns {.json}
 */

const transformToJSON = (parsedData) => {
  const bibtexArray = [];
  let property = '';
  let item = {};

  parsedData.tokens.forEach(({ image, tokenType: { name } }, index) => {
    if (name === 'Type') {
      item.type = image.replace(/@/, '');
    }

    if (name === 'Key') {
      item.key = image.replace(/{/, '');
    }

    if (name === 'Field') {
      const str = image.split(/[=]/gm);
      property = str[0].replace(/[ \t]+$/, '');
      item[property] = str[1].replace(/^\s+/, '');

      if (
        parsedData.tokens[index + 1] === undefined
        || parsedData.tokens[index + 1].tokenType.name === 'Type'
      ) {
        bibtexArray.push(item);
        item = {};
        property = '';
      }
    }

    if (name === 'Sentence') {
      if (parsedData.tokens[index + 1].tokenType.name !== 'Sentence') {
        item[property] += image;
      } else {
        item[property] += `${image} `;
      }
    }
  });

  return {
    total: bibtexArray.length + 1,
    references: bibtexArray,
  };
};

/**
 * @function - Cleans the string, tokenizes and returns json
 * @param {string, buffer, URL} path
 * @returns {JSON}
 */

const parseBibtex = (data) => {
  const dataString = data.toString();
  const noComments = dataString.replace(/^%(.*\n)/gm, '');
  const typeLine = noComments.replace(
    /ARTICLE|\b@BOOK\b|INCOLLECTION|PHDTHESIS|TECHREPORT|MISC|INPROCEEDINGS/gim,
    '$&\n',
  );
  const doubleDashes = typeLine.replace(/--/gm, '-');
  const cleansed = doubleDashes.replace(/['*{},"]/gm, '');
  const parsedData = SelectLexer.tokenize(cleansed);

  return transformToJSON(parsedData);
};

/**
 * @function - Transform JSON into Bibtex
 * @param {JSON}
 * @returns {string}
 */

const parseToBibtex = (data, property) => {
  let bibtex = '';
  const list = JSON.parse(data);
  try {
    list[property].forEach((item) => {
      Object.keys(item).forEach((key) => {
        switch (key) {
          case 'type':
            bibtex += `@${item[key]}`;
            break;
          case 'key':
            bibtex += `{${item[key]},\n`;
            break;
          default:
            bibtex += `${key} = ${item[key]},\n`;
        }
      });
      bibtex += '}\n';
    });

    return bibtex;
  } catch (_) {
    throw new Error('Check the object property is an array or is named correctly');
  }
};

module.exports = {
  parseBibtex,
  parseToBibtex,
};
