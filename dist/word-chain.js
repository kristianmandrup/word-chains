"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Limiter for how far a chain should be attempted before quitting
// Set fairly low to avoid exceeding maximum call stack size
// Set fairly high to find complex word chains
var CHAIN_LIMIT = 20;
// Limiter for number of candidates to "branch" word chain building
// Set fairly low to solve word chains faster, but increase risk of failure
var CANDIDATE_LIMIT = 5;
// TODO Support differing length words
// TODO Add means to grow/shrink given word
/**
 * buildWordChain wrapper with basic validation
 * @param {Object} textTree TextTree instance
 * @param {string} startWord first word in chain
 * @param {string} endWord target last word in chain
 * @returns {(Array|null)} Completed list of words or null
 */
exports.wordChain = function (textTree, startWord, endWord) {
    var fromWord = startWord.toLowerCase();
    var toWord = endWord.toLowerCase();
    if (!textTree) {
        console.error("wordChain", { textTree: textTree, startWord: startWord, endWord: endWord });
        throw new Error("wordChain: Missing TextTree as first argument");
    }
    if (fromWord.length === toWord.length &&
        textTree.hasWord(fromWord) &&
        textTree.hasWord(toWord)) {
        return buildWordChain(textTree, [fromWord], toWord);
    }
    return null;
};
var getCandidates = function (textTree, fromWord, targetWord) {
    // Try optimistic transformation strategy (match a target character)
    var candidates = exports.optimisticTransformStrategy(textTree, fromWord, targetWord);
    // Fall back to brute force strategy (change any character)
    if (!candidates.length) {
        candidates = exports.bruteForceStrategy(textTree, fromWord, targetWord);
    }
    return candidates;
};
/**
 * Extend a given word list with words that change by a single character
 * until they match the given target word
 * @param {Object} textTree TextTree instance
 * @param {Array} chain assembled chain so far
 * @param {string} targetWord intended word to
 * @returns {(Array|null)} Completed list of words or null
 */
var buildWordChain = function (textTree, chain, targetWord) {
    var fromWord = exports.lastElement(chain);
    if (fromWord === targetWord) {
        return chain;
    }
    // Abort if chain is too long
    if (chain.length > CHAIN_LIMIT) {
        return null;
    }
    var candidates = getCandidates(textTree, fromWord, targetWord);
    // Limit candidates to try lucky candidates will be used first)
    var tryEntries = Math.min(candidates.length, CANDIDATE_LIMIT);
    // Extend word chain, attempting with each candidate word
    for (var idx = 0; idx < tryEntries; ++idx) {
        var newWord = candidates[idx];
        // Only add words not already in chain
        if (chain.indexOf(newWord) < 0) {
            var newChain = buildWordChain(textTree, chain.concat([newWord]), targetWord);
            // Check if new chain is successful
            if (newChain) {
                return newChain;
            }
        }
    }
    // No more words to attempt
    return null;
};
/**
 * List potential words changing a character in fromWord to one that matches in toWord
 * "Match letter transformation"
 * @param {Object} textTree TextTree instance
 * @param {string} fromWord starting word
 * @param {string} toWord target word
 * @returns {Array} list of "candidate" words
 */
exports.optimisticTransformStrategy = function (textTree, fromWord, toWord) {
    var candidates = [];
    for (var idx = 0, len = fromWord.length; idx < len; ++idx) {
        var fromLetter = fromWord[idx];
        var toLetter = toWord[idx];
        if (fromLetter !== toLetter) {
            // Attempt to transform character of word into a chain entry
            var newWord = exports.swapLetter(fromWord, idx, toLetter);
            if (textTree.hasWord(newWord)) {
                candidates.push(newWord);
            }
        }
    }
    return candidates;
};
/**
 * List potential words changing a character in fromWord to one that matches in toWord
 * "Brute force transformation"
 * @param {Object} textTree TextTree instance
 * @param {string} fromWord starting word
 * @param {string} toWord target word
 * @returns {Array} list of "candidate" words
 */
exports.bruteForceStrategy = function (textTree, fromWord, _toWord) {
    var candidates = [];
    var fromPath = textTree.getPath(fromWord);
    if (!fromPath) {
        return candidates;
    }
    for (var idx = 0, len = fromWord.length; idx < len; ++idx) {
        var fromMap = fromPath[idx];
        var fromLetter = fromWord[idx];
        // Try any other neighbor character in text tree
        for (var testLetter in fromMap) {
            if (testLetter !== fromLetter) {
                var newWord = exports.swapLetter(fromWord, idx, testLetter);
                if (textTree.hasWord(newWord)) {
                    candidates.push(newWord);
                }
            }
        }
    }
    return candidates;
};
/**
 * Return a copy of the last item in an aray
 * @param {Array} list array with at least 1 entry
 * @returns {*} copy of the last item in list
 */
exports.lastElement = function (list) {
    return list[list.length - 1];
};
/**
 * Replace letter in word at given index
 * @param {string} word source word
 * @param {number} idx letter replace index
 * @param {string} letter target letter
 * @returns {string} word with replaced letter
 */
exports.swapLetter = function (word, idx, letter) {
    return word.substr(0, idx) + letter + word.substr(idx + 1);
};
