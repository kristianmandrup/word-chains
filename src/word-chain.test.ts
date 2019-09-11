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
    const callback = (err: any, lineCount: any) => {
      notExist(err);
      exist(lineCount);
      isNumber(lineCount);
      done();
    };
    tree.initialise(dictionaryFilePath, { callback });
  });
});

let createAndCheck: any = null;

describe("Word chain solver", () => {
  beforeAll(done => {
    tree = new TextTree();
    createAndCheck = createChecker(tree, { runBefore, runAfter });
    const callback = () => {
      done();
    };
    tree.initialise(dictionaryFilePath, { callback });
  });

  it("not create chain for invalid words", () => {
    const chain = wordChain(tree, "xxxxx", "zzzzz");
    notExist(chain);
  });

  it("lead => gold", () => {
    createAndCheck({ first: "lead", last: "gold" });
  });

  it("ruby => code", () => {
    createAndCheck({ first: "ruby", last: "code" });
  });

  it("travel => market", () => {
    createAndCheck({ first: "travel", last: "market" });
  });

  // it("create a word chain from pair", () => {
  //   createAndCheck({ pair: ["travel", "market"] });
  // });
});
