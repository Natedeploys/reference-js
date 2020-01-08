<p align="center">
  <br>
  <a href="" rel="noopener">
 <img width=267px height=80px src="https://i.imgur.com/K4zwgBt.png" alt="Project logo"></a>
</p>

<h3 align="center">@devisle/reference-js</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-development-important.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/devisle/reference-js)](https://github.com/devisle/reference-js/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/devisle/reference-js)](https://github.com/devisle/reference-js/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> For all the popular Reference Manager formats
    <br> 
</p>

## 📝 Table of Contents

- [Quick Start](#quick)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Todo](TODO.md)
- [Contributing](CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## ⌛️ Quick Start <a name = "quick"></a>

See it on [npm](https://www.npmjs.com/package/@devisle/reference-js)

```
npm install @devisle/reference-js
```

Use like below

```js
const { BibTeXToJSON } = require("@devisle/reference-js");

//Returns JSON
BibTeXToJSON("file:///current/dir/references.bib");
```

## 🧐 About <a name = "about"></a>

Reference JS is a collection of parsing functions for Node that allow you to import, export and convert between BibTeX, EndNote, XML, JSON files and more.

Reference Managers are software tools used to organise research work. We aim to tackle the vast Reference Manager format types that exist i.e. bibtex, f1000, XML. 

By parsing all formats into JSON, we alleviate the need to for JSON based storage and point-to-point conversion i.e. Bibtex to JSON to XML.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will set reference-js up and running on your local machine for development and deployment purposes. See [Usage](#usage) for notes on how to use the API.

### Prerequisites

You will need NodeJS and NPM. Not sure if you have node or npm? use in your terminal:

```
node -v
```

or

```
node hello.js
```

### Installing

Install the package with

```
npm install @devisle/reference-js
```

Require in Node as

```js
const { BibTeXToJSON } = require("@devisle/reference-js");

//Returns JSON
BibTeXToJSON("file:///current/dir/references.bib");
```

## 🔧 Running the tests <a name = "tests"></a>

Each function is tested agaisnt before release.

### Contributors

Run the tests using:

```
npm run test
```

Further information on [Contributing](CONTRIBUTING.md)

## 🎈 Usage <a name="usage"></a>

Formats from Reference managers can be converted into JSON and back. Using this approach, you are able to leverage the library to convert between other formats e.g. Bibtex to JSON to RIS behind the scenes.

For further code demos, see the examples folder.

API Coming soon.

## 🚀 Deployment <a name = "deployment"></a>

We recommend storing your references in JSON format as it is highly compatible with NoSQL databases and Web Applications.

## ⛏️ Built Using <a name = "built_using"></a>

- [Esprima](https://www.npmjs.com/package/esprima) - Esprima parser 
- [Jest](https://jestjs.io/) - Testing Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@natedeploys](https://github.com/Natedeploys) - Idea & Initial work
- [@endormi](https://github.com/endormi) - Contributor

What is the Dev Isle?

It is a [community](https://github.com/devisle) focusing on Open Source projects for learning purposes.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Dev Isle community members for feedback, ideas and code reviews.
- ETH Zurich for Open Source encouragement
