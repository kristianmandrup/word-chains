// wordChain.js

import { TextTree } from "./TextTree";
import { wordChain } from "./word-chain";
import {
  exist,
  notExist,
  isNumber,
  isArray,
  isEqual,
  hasLength,
  isTrue,
  isFalse
} from "./helpers";

const checkersFor = (chain: any) => {
  const isChain = () => {
    exist(chain);
    isArray(chain);
  };

  const checkFirst = (word: string) => isEqual(chain.shift(), word);
  const checkLast = (word: string) => isEqual(chain.pop(), word);

  const checkTerminators = (first: string, last: string) => {
    isChain();
    checkFirst("lead");
    checkLast("gold");
  };

  return { isChain, checkFirst, checkLast, checkTerminators };
};

const createAndCheck = (first: string, last: string) => {
  const chain = wordChain(textTree, first, last);
  const { checkTerminators } = checkersFor(chain);
  checkTerminators(first, last);
};

let textTree: any = null;

describe("Text tree", () => {
  it("initialise from large gzip dictionary", done => {
    textTree = new TextTree();
    exist(textTree);
    textTree.initialise("../data/50kwords.txt", (err: any, lineCount: any) => {
      notExist(err);
      exist(lineCount);
      isNumber(lineCount);
      done();
    });
  });
});

describe("Word chain solver", () => {
  // Some word chains may take a long time to solve

  it("not create chain for invalid words", () => {
    const chain = wordChain(textTree, "xxxxx", "zzzzz");
    exist(chain);
  });

  it("create a word chain", () => {
    createAndCheck("lead", "gold");
  });

  it("create a word chain", () => {
    createAndCheck("market", "barter");
  });

  it("create a word chain", () => {
    createAndCheck("carry", "sough");
  });

  it("create a word chain", () => {
    createAndCheck("bread", "table");
  });

  it("create a word chain", () => {
    createAndCheck("travel", "market");
  });
});
