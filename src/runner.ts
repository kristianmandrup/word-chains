import { TextTree } from "./TextTree";
import { runBefore, runAfter } from "./effects";
import { createChecker } from "./helpers";

export const run = ({ file, first, last }: any = {}) => {
  const tree = new TextTree();
  const createAndCheck = createChecker(tree, { runBefore, runAfter });
  tree.initialise(file, (err: any, lineCount: any) => {
    if (err) {
      throw err;
    }
    console.log(`file: ${file} :: words ${lineCount}`);
    createAndCheck(first, last);
  });
};
