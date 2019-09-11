# Word chains

## Pre-requisites

node

### Using brew

`brew install node`

### Using pkg installer

[Installing Node.js: macOS](https://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/)

## Install

`$ npm install`

Downloads all dependencies

## Compile

Compiles typescript `.ts` files in `src` folder to `.js` files in `dist` folder using `tsconfig.json` compile configuration

`$ tsc`

## Test

To run tests

`$ npm test`

```bash
> jest

 PASS  src/TextTree.test.ts
 PASS  src/word-chain.test.ts

Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        2.583s, estimated 3s
```

### CLI runner

`$ ./word-chain --file ./data/50kwords.txt --first cat --last dog`

Example:

```bash
./word-chain --file ./data/50kwords.txt --first cat --last dog
file: ./data/50kwords.txt :: words 49028
cat-dog
4 cat,cot,dot,dog :: time: 0 ms
```
