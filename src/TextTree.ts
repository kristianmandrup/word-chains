import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

// Character to insert in tree where a word ends
const wordTerminatorChar = "\n";

/**
 * TextTree initialisation callback
 * @callback loadCallback
 * @param {Error} err Node Error
 * @param {number} lineCount number of lines read
 */

type Callback = (...args: any[]) => void;

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
  initialise(filePath: string, callback: Callback) {
    this.tree = {};
    fs.open(filePath, "r", (err, descriptor) => {
      if (err) {
        return callback(err);
      }
      const ext = path.extname(filePath);
      if (ext !== ".txt") {
        callback(new Error("Unsupported dictionary format"));
      }
      this.readDictionaryLines(filePath, descriptor, callback);
    });
  }

  readDictionaryLines(filePath: string, descriptor: any, callback: Callback) {
    let lineCount = 0;
    const lineStream = fs.createReadStream(filePath, { fd: descriptor });
    readline
      .createInterface({
        input: lineStream
      })
      .on("line", line => {
        this.pushWord(line);
        lineCount++;
        return;
      })
      .on("error", callback)
      .on("close", () => {
        callback(null, lineCount);
      });
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
