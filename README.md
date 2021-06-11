# Node File Tree

Simple file tree data structure coded for NodeJS

## Install

Installing with npm
`npm i --save @enigmaoffline/node-file-tree`

## Usage

Importing

```js
const FTree = require("github-fetch");

const ft = new FTree('./src');

ft.setIgnoreNodeModules(false);
ft.printTree();

ft.travel(
    (node, layer) => {
        // do something when file is reached
    },
    (node, layer) => {
        // do something when directory is reached
    }
);
```