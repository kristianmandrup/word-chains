"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var FileLineReader_1 = require("./FileLineReader");
// Character to insert in tree where a word ends
var wordTerminatorChar = "\n";
/**
 * TextTree initialisation callback
 * @callback loadCallback
 * @param {Error} err Node Error
 * @param {number} lineCount number of lines read
 */
var TextTree = /** @class */ (function () {
    /**
     * @constructor
     */
    function TextTree() {
        this.tree = null;
    }
    /**
     * TODO: Add async/Promise support
     * Load adictionary file as text tree
     * @param {string} filePath path to dictionary file
     * @param {loadCallback} callback tree loaded callback
     * @returns {undefined}
     */
    TextTree.prototype.initialise = function (filePath, opts) {
        var _this = this;
        this.tree = {};
        var onLine = function (line) { return _this.pushWord(line); };
        FileLineReader_1.createFileLineReader(filePath, __assign({ onLine: onLine }, opts));
    };
    /**
     * Add a word to the text tree
     * @param {string} word word
     * @returns {undefined}
     */
    TextTree.prototype.pushWord = function (word) {
        var wordLetters = word.toLowerCase();
        var treeLevel = this.tree;
        for (var idx = 0, len = wordLetters.length; idx < len; ++idx) {
            var letter = wordLetters[idx];
            if (!this.hasLetter(treeLevel, letter)) {
                treeLevel[letter] = {};
            }
            treeLevel = treeLevel[letter];
        }
        treeLevel[wordTerminatorChar] = true;
        return;
    };
    /**
     * Each tree level present contains the character of the word
     * and the final tree level present contains the last character
     * @param {string} word word
     * @returns {Array} List of text tree levels that create the given word
     */
    TextTree.prototype.getPath = function (word) {
        var treeLevel = this.tree;
        var treePath = [treeLevel];
        for (var idx = 0, len = word.length; idx < len; ++idx) {
            var letter = word[idx];
            if (this.hasLetter(treeLevel, letter)) {
                treeLevel = treeLevel[letter];
            }
            else {
                return null;
            }
            treePath.push(treeLevel);
        }
        return treePath;
    };
    /**
     * Test a given whole word is present in text tree
     * @param {string} word word
     * @returns {boolean} true if word is present
     */
    TextTree.prototype.hasWord = function (word) {
        var treeLevel = this.tree;
        for (var idx = 0, len = word.length; idx < len; ++idx) {
            var letter = word[idx];
            if (this.hasLetter(treeLevel, letter)) {
                treeLevel = treeLevel[letter];
            }
            else {
                return false;
            }
        }
        return this.hasLetter(treeLevel, wordTerminatorChar);
    };
    TextTree.prototype.hasLetter = function (treeLevel, letter) {
        return treeLevel.hasOwnProperty(letter);
    };
    return TextTree;
}());
exports.TextTree = TextTree;
