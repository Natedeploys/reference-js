const parseBibTexLine = (text) => {
  let m = text.match(/^\s*(\S+)\s*=\s*/);
  if (!m) {
    console.log(`line: "${text}"`);
    throw new Error('Unrecogonised line format');
  }
  const name = m[1];
  const search = text.slice(m[0].length);
  const re = /[\n\r,{}]/g;
  let braceCount = 0;
  const { length } = m[0];
  do {
    m = re.exec(search);
    if (m[0] === '{') {
      braceCount++;
    } else if (m[0] === '}') {
      if (braceCount === 0) {
        throw new Error('Unexpected closing brace: "}"');
      }
      braceCount--;
    }
  } while (braceCount > 0);
  return {
    field: name,
    value: search.slice(0, re.lastIndex),
    length: length + re.lastIndex + m[0].length,
  };
};

const parseBibTex = (text) => {
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
    const pair = parseBibTexLine(text);
    result[pair.field] = pair.value;
    text = text.slice(pair.length).trim();
  }

  return result;
};

module.exports = {
  parseBibTex,
};
