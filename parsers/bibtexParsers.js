const chevrotain = require('chevrotain');

const { createToken } = chevrotain;

const typeProperty = createToken({
  name: 'Type',
  pattern: /ARTICLE|BOOK|INCOLLECTION|PHDTHESIS|TECHREPORT|MISC/,
});
const keyProperty = createToken({ name: 'Key', pattern: /[a-z]{4}[0-9][0-9]/ });
const generalProperty = createToken({
  name: 'Field',
  pattern: /AUTHOR.*|TITLE.*|JOURNAL.*|VOLUME.*|YEAR.*|NUMBER.*|PAGES.*|EDITION.*|PUBLISHER.*|ADDRESS.*|VOLUME.*|SERIES.*|BOOKTITLE.*|EDITOR.*|NOTE.*|HOWPUBLISHED.*/,
});

const SelectLexer = new chevrotain.Lexer([typeProperty, generalProperty, keyProperty], {
  positionTracking: 'onlyOffset',
});

const transformToJSON = (parsedData) => {
  const bibtexArray = [];
  let item = {};

  parsedData.tokens.forEach(({ image, tokenType: { name } }, index) => {
    if (name === 'Type') {
      item.type = image;
    }

    if (name === 'Key') {
      item.key = image;
    }

    if (name === 'Field') {
      const str = image.split(' = ');
      const property = str[0];
      item[property] = str[1];

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

const parseBibtex = (data) => {
  const dataString = data.toString();
  const noComments = dataString.replace(/^%(.*\n)/gm, '');
  const content = noComments.replace(/[*@{},]/gm, '');
  const parsedData = SelectLexer.tokenize(content);

  return transformToJSON(parsedData);
};

module.exports = {
  parseBibtex,
};
