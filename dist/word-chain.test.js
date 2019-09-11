"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextTree_1 = require("./TextTree");
var word_chain_1 = require("./word-chain");
var helpers_1 = require("./helpers");
var helpers_2 = require("./helpers");
var effects_1 = require("./effects");
var tree = null;
describe("Text tree", function () {
    it("initialise from dictionary", function (done) {
        tree = new TextTree_1.TextTree();
        helpers_1.exist(tree);
        tree.initialise(helpers_2.dictionaryFilePath, function (err, lineCount) {
            helpers_1.notExist(err);
            helpers_1.exist(lineCount);
            helpers_1.isNumber(lineCount);
            done();
        });
    });
});
var createAndCheck = null;
describe("Word chain solver", function () {
    beforeEach(function (done) {
        tree = new TextTree_1.TextTree();
        createAndCheck = helpers_1.createChecker(tree, { runBefore: effects_1.runBefore, runAfter: effects_1.runAfter });
        tree.initialise(helpers_2.dictionaryFilePath, function (err, lineCount) {
            done();
        });
    });
    it("not create chain for invalid words", function () {
        var chain = word_chain_1.wordChain(tree, "xxxxx", "zzzzz");
        helpers_1.notExist(chain);
    });
    it("create a word chain", function () {
        createAndCheck("lead", "gold");
    });
    it("create a word chain", function () {
        createAndCheck("market", "barter");
    });
    it("create a word chain", function () {
        createAndCheck("carry", "sough");
    });
    it("create a word chain", function () {
        createAndCheck("bread", "table");
    });
    it("create a word chain", function () {
        createAndCheck("travel", "market");
    });
});
