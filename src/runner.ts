import { TextTree } from "./TextTree";
import { runBefore, runAfter } from "./effects";
import { createPairsChecker } from "./helpers";

export const checkerFor = ({ dictFile, callback }: any = {}) => {
  if (!dictFile) {
    throw Error("checkerFor: Missing dictFile");
  }
  const tree = new TextTree();
  const pairsChecker = createPairsChecker(tree, { runBefore, runAfter });
  const initCb = (err: any, lineCount: any) => {
    if (err) {
      throw err;
    }
    console.log(`dictionary: ${dictFile} :: words ${lineCount}`);

    callback(pairsChecker);
  };
  tree.initialise(dictFile, { callback: initCb });
};
