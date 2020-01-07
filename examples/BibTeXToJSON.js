const { BibTeXToJSON } = require("../index");

// Path relative to where index.js is
BibTeXToJSON("/samples/references.bib")
  .then(data => console.log(data))
  .catch(error => console.log(error));
