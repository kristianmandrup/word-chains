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
      const callback = (err: any, lineCount: any) => {
        exist(err);
        notExist(lineCount);
        done();
      };
      tree.initialise("./nonexistant.txt", { callback });
    });

    it("text dictionary", done => {
      const callback = (err: any, lineCount: any) => {
        notExist(err);
        exist(lineCount);
        isNumber(lineCount);
        done();
      };
      tree.initialise(dictionaryFilePath, { callback });
    });
  });

  describe("initialised tree", () => {
    beforeEach(done => {
      tree = new TextTree();
      const callback = () => {
        done();
      };
      tree.initialise(dictionaryFilePath, { callback });
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
