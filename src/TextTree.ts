import { FileLineReader } from "./FileLineReader";

// Character to insert in tree where a word ends
const wordTerminatorChar = "\n";

/**
 * TextTree initialisation callback
 * @callback loadCallback
 * @param {Error} err Node Error
 * @param {number} lineCount number of lines read
 */

export class TextTree {
  tree: any;
  /**
   * @constructor
   */
  constructor() {
    this.tree = null;
  }

  /**
   * TODO: Add async/Promise support
   * Load adictionary file as text tree
   * @param {string} filePath path to dictionary file
   * @param {loadCallback} callback tree loaded callback
   * @returns {undefined}
   */
  initialise(filePath: string, opts: any) {
    this.tree = {};
    const onLine = (line: string) => this.pushWord(line);
    new FileLineReader(filePath, { onLine, ...opts });
  }

  /**
   * Add a word to the text tree
   * @param {string} word word
   * @returns {undefined}
   */
  pushWord(word: string) {
    const wordLetters = word.toLowerCase();
    let treeLevel = this.tree;
    for (let idx = 0, len = wordLetters.length; idx < len; ++idx) {
      const letter = wordLetters[idx];
      if (!this.hasLetter(treeLevel, letter)) {
        treeLevel[letter] = {};
      }
      treeLevel = treeLevel[letter];
    }
    treeLevel[wordTerminatorChar] = true;
    return;
  }

  /**
   * Each tree level present contains the character of the word
   * and the final tree level present contains the last character
   * @param {string} word word
   * @returns {Array} List of text tree levels that create the given word
   */
  getPath(word: string) {
    let treeLevel = this.tree;
    const treePath = [treeLevel];
    for (let idx = 0, len = word.length; idx < len; ++idx) {
      const letter = word[idx];

      if (this.hasLetter(treeLevel, letter)) {
        treeLevel = treeLevel[letter];
      } else {
        return null;
      }

      treePath.push(treeLevel);
    }
    return treePath;
  }

  /**
   * Test a given whole word is present in text tree
   * @param {string} word word
   * @returns {boolean} true if word is present
   */
  hasWord(word: string) {
    let treeLevel = this.tree;
    for (let idx = 0, len = word.length; idx < len; ++idx) {
      const letter = word[idx];

      if (this.hasLetter(treeLevel, letter)) {
        treeLevel = treeLevel[letter];
      } else {
        return false;
      }
    }
    return this.hasLetter(treeLevel, wordTerminatorChar);
  }

  hasLetter(treeLevel: any, letter: string): boolean {
    return treeLevel.hasOwnProperty(letter);
  }
}
