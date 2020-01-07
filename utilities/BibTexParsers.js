const parseBibtexLine = (bibline) => {
  const text = bibline;

  let m = text.match(/^\s*(\S+)\s*=\s*/);

  if (!m) {
    console.log(`line: "${text}"`);
    throw new Error('Unrecognised line format');
  }

  const name = m[1];
  const search = text.slice(m[0].length);
  const re = /[\n\r,{}]/g;
  let braceCount = 0;
  const { length } = m[0];

  do {
    m = re.exec(search);
    if (m[0] === '{') {
      braceCount += 1;
    } else if (m[0] === '}') {
      if (braceCount === 0) {
        throw new Error('Unexpected closing brace: "}"');
      }
      braceCount -= 1;
    }
  } while (braceCount > 0);

  return {
    field: name,
    value: search.slice(0, re.lastIndex),
    length: length + re.lastIndex + m[0].length,
  };
};

const parseBibtex = (bibtext) => {
  let text = bibtext;

  const m = text.match(/^\s*@([^{]+){([^,\n]+)[,\n]/);

  if (!m) {
    throw new Error('Unrecognised header format');
  }

  const result = {
    typeName: m[1].trim(),
    citationKey: m[2].trim(),
  };

  text = text.slice(m[0].length).trim();

  while (text[0] !== '}') {
    const pair = parseBibtexLine(text);
    result[pair.field] = pair.value;
    text = text.slice(pair.length).trim();
  }

  return result;
};

module.exports = {
  parseBibtex,
};
