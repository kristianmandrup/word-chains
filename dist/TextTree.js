"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var readline = __importStar(require("readline"));
// Character to insert in tree where a word ends
var wordTerminatorChar = "\n";
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
    TextTree.prototype.initialise = function (filePath, callback) {
        var _this = this;
        this.tree = {};
        fs.open(filePath, "r", function (err, descriptor) {
            if (err) {
                return callback(err);
            }
            var ext = path.extname(filePath);
            if (ext !== ".txt") {
                callback(new Error("Unsupported dictionary format"));
            }
            _this.readDictionaryLines(filePath, descriptor, callback);
        });
    };
    TextTree.prototype.readDictionaryLines = function (filePath, descriptor, callback) {
        var _this = this;
        var lineCount = 0;
        var lineStream = fs.createReadStream(filePath, { fd: descriptor });
        readline
            .createInterface({
            input: lineStream
        })
            .on("line", function (line) {
            _this.pushWord(line);
            lineCount++;
            return;
        })
            .on("error", callback)
            .on("close", function () {
            callback(null, lineCount);
        });
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
