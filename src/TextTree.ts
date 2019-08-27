import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

// Character to insert in tree where a word ends
const terminator = "\n";

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
   * Load a given "dictionary" file into the text tree
   * Will also reset a populated text tree
   * @param {string} filePath relative path to dictionary file
   * @param {loadCallback} callback tree loaded callback
   * @returns {undefined}
   */
  initialise(filePath: string, callback: Callback) {
    // Reset any existing text tree
    this.tree = {};
    // Attempt to access given file
    fs.open(filePath, "r", (err, descriptor) => {
      if (err) {
        return callback(err);
      }
      const ext = path.extname(filePath);
      // Validate dictionary format and apply transform if required
      if (ext !== ".txt") {
        callback(new Error("Unsupported dictionary format"));
      }
      this.readDictionaryLines(filePath, descriptor, callback);
    });
  }

  readDictionaryLines(filePath: string, descriptor: any, callback: Callback) {
    let lineCount = 0;
    const lineStream = fs.createReadStream(filePath, { fd: descriptor });
    // Read "dictionary" lines
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
   * Add a given word to the text tree
   * @param {string} word word
   * @returns {undefined}
   */
  pushWord(word: string) {
    // Add word to tree in case-insensitive manner
    const inWord = word.toLowerCase();
    // Start at tree root
    let treeLevel = this.tree;
    // Add each letter of the word to the text tree
    for (let idx = 0, len = inWord.length; idx < len; ++idx) {
      const letter = inWord[idx];
      // Add tree branch for letters not yet added
      if (!treeLevel.hasOwnProperty(letter)) {
        treeLevel[letter] = {};
      }
      // Traverse up to next branch
      treeLevel = treeLevel[letter];
    }
    // Add word terminator to branch
    treeLevel[terminator] = true;
    return;
  }

  /**
   * Each tree level (if found) contains the character of the word
   * and the final tree level (if found) contains the "terminator" character
   * @param {string} word word
   * @returns {Array} List of text tree levels that create the given word
   */
  getPath(word: string) {
    // Start at tree root
    let treeLevel = this.tree;
    const treePath = [treeLevel];
    // Traverse for each letter
    for (let idx = 0, len = word.length; idx < len; ++idx) {
      const letter = word[idx];
      // Attempt to traverse up to next branch
      if (treeLevel.hasOwnProperty(letter)) {
        treeLevel = treeLevel[letter];
      } else {
        return null;
      }
      // Add tree level to path
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
    // Start at tree root
    let treeLevel = this.tree;
    // Traverse for each letter
    for (let idx = 0, len = word.length; idx < len; ++idx) {
      const letter = word[idx];
      // Attempt to traverse up to next branch
      if (treeLevel.hasOwnProperty(letter)) {
        treeLevel = treeLevel[letter];
      } else {
        return false;
      }
    }
    // Ensure final tree level has word terminator
    return treeLevel.hasOwnProperty(terminator);
  }
}
