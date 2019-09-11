import * as path from "path";
import { wordChain } from "./word-chain";

export const dataFilePath = path.join(__dirname, "../data");
const dictionaryFile = "50kwords.txt";

export const dictionaryFilePath = path.join(dataFilePath, dictionaryFile);

const noValue = (value: any) => value === null || value === undefined;

export const exist = (value: any) => expect(noValue(value)).toBeFalsy();
export const notExist = (value: any) => {
  expect(noValue(value)).toBeTruthy();
};

export const isEqual = (value: any, checkValue: any) =>
  expect(value).toEqual(checkValue);

export const isNumber = (value: any) => expect(typeof value).toEqual("number");
export const isArray = (value: any) =>
  expect(Array.isArray(value)).toBeTruthy();

export const hasLength = (value: any, len: number) => {
  isArray(value);
  expect(value.length).toEqual(len);
};

export const isTrue = (value: any) => expect(value).toBeTruthy();
export const isFalse = (value: any) => expect(value).toBeFalsy();

export const checkersFor = (chain: any) => {
  const isChain = () => {
    exist(chain);
    isArray(chain);
  };

  const checkFirst = (word: string) => isEqual(chain.shift(), word);
  const checkLast = (word: string) => isEqual(chain.pop(), word);

  const checkTerminators = (first: string, last: string) => {
    isChain();
    checkFirst(first);
    checkLast(last);
  };

  return { isChain, checkFirst, checkLast, checkTerminators };
};

type checkerArgs = {
  first?: string;
  last?: string;
  pair?: string[];
};

export const createPairsChecker = (textTree: any, opts: any) => (
  pairs: any[]
) => {
  const checker = createChecker(textTree, opts);
  pairs.map(pair => checker({ pair }));
};

export const createChecker = (textTree: any, opts: any = {}) => ({
  first,
  last,
  pair
}: checkerArgs = {}) => {
  const { runBefore, runAfter } = opts;
  const firstWord = first || (pair && pair[0]);
  const lastWord = last || (pair && pair[1]);
  // console.log({ firstWord, lastWord });
  if (!firstWord) {
    console.error("Missing first word", { first, pair });
    throw Error("Missing first word");
  }
  if (!lastWord) {
    console.error("Missing last word", { first, pair });
    throw Error("Missing last word");
  }
  const args = { first: firstWord, last: lastWord };
  const beforeResult = runBefore && runBefore(args);
  const chain = wordChain(textTree, firstWord, lastWord);
  chain && runAfter && runAfter(beforeResult, { chain, ...args });
  const { checkTerminators } = checkersFor(chain);
  return checkTerminators;
};
