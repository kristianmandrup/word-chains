import { TextTree } from "./TextTree";
import {
  exist,
  notExist,
  isNumber,
  hasLength,
  isTrue,
  isFalse
} from "./helpers";

import { dictionaryFilePath } from "./helpers";

let tree: any = null;

const hasWord = (word: string) => isTrue(tree.hasWord(word));
const notHasWord = (word: string) => isFalse(tree.hasWord(word));

describe("Text tree", () => {
  beforeEach(() => {
    tree = new TextTree();
  });

  it("constructs tree", () => {
    exist(tree);
  });

  describe("initialise", () => {
    it("missing dictionary file", done => {
      tree.initialise("./nonexistant.txt", (err: any, lineCount: any) => {
        exist(err);
        notExist(lineCount);
        done();
      });
    });

    it("text dictionary", done => {
      tree.initialise(dictionaryFilePath, (err: any, lineCount: any) => {
        notExist(err);
        exist(lineCount);
        isNumber(lineCount);
        done();
      });
    });
  });

  describe("initialised tree", () => {
    beforeEach(done => {
      tree = new TextTree();
      tree.initialise(dictionaryFilePath, (err: any, lineCount: any) => {
        done();
      });
    });

    describe("getPath", () => {
      it("get the tree path for a valid word", () => {
        const path = tree.getPath("aba");
        expect(path).toBeDefined();
        hasLength(path, 4);
      });

      it("get null for an invalid word", () => {
        const path = tree.getPath("abc");
        notExist(path);
      });
    });

    describe("hasWord", () => {
      it("validate a known word", () => {
        hasWord("aardvark");
      });

      it("invalidate an incomplete word", () => {
        notHasWord("aard");
      });

      it("invalidate an unknown word", () => {
        notHasWord("aaaaa");
      });
    });
  });
});
