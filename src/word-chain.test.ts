import { TextTree } from "./TextTree";
import { wordChain } from "./word-chain";
import { exist, notExist, isNumber, createChecker } from "./helpers";
import { dictionaryFilePath } from "./helpers";
import { runBefore, runAfter } from "./effects";

let tree: any = null;

describe("Text tree", () => {
  it("initialise from dictionary", done => {
    tree = new TextTree();
    exist(tree);
    tree.initialise(dictionaryFilePath, (err: any, lineCount: any) => {
      notExist(err);
      exist(lineCount);
      isNumber(lineCount);
      done();
    });
  });
});

let createAndCheck: any = null;

describe("Word chain solver", () => {
  beforeEach(done => {
    tree = new TextTree();
    createAndCheck = createChecker(tree, { runBefore, runAfter });
    tree.initialise(dictionaryFilePath, (err: any, lineCount: any) => {
      done();
    });
  });

  it("not create chain for invalid words", () => {
    const chain = wordChain(tree, "xxxxx", "zzzzz");
    notExist(chain);
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
