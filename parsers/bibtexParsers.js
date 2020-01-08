const esprima = require('esprima');

const parseBibtex = (data) => {
  const dataString = data.toString();
  const noComments = dataString.replace(/^%(.*\n)/gm, '');
  const noChars = noComments.replace(/[*@{}']/gm, '');
  const typeLine = noChars.replace(/ARTICLE|BOOK/gm, '$&\n');

  const parsedData = esprima.tokenize(typeLine, {
    comment: true,
  });

  return parsedData;
};

module.exports = {
  parseBibtex,
};
