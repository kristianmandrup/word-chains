import { TextTree } from "./TextTree";
import { wordChain } from "./word-chain";
import { exist, notExist, isNumber, createChecker } from "./helpers";
import { dictionaryFilePath } from "./helpers";

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

const displayTime = (label: string, time: number) => {
  console.log(label + ": " + time + " ms");
};

const runBefore = ({ first, last }: any = {}) => {
  const time = new Date().getTime();
  // const chainWrds = `${first}-${last}`;
  // console.log(chainWrds);
  // displayTime(`start`, time);
  return time;
};

const runAfter = (beforeTime: number, { first, last }: any = {}) => {
  const time = new Date().getTime();
  // displayTime("end", time);
  const diffTime = time - beforeTime;
  const chainWrds = `${first}-${last}`;
  displayTime(chainWrds + " :: time", diffTime);
  return time;
};

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
