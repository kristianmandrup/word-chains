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
        var callback = function (err, lineCount) {
            helpers_1.notExist(err);
            helpers_1.exist(lineCount);
            helpers_1.isNumber(lineCount);
            done();
        };
        tree.initialise(helpers_2.dictionaryFilePath, { callback: callback });
    });
});
var createAndCheck = null;
describe("Word chain solver", function () {
    beforeAll(function (done) {
        tree = new TextTree_1.TextTree();
        createAndCheck = helpers_1.createChecker(tree, { runBefore: effects_1.runBefore, runAfter: effects_1.runAfter });
        var callback = function () {
            done();
        };
        tree.initialise(helpers_2.dictionaryFilePath, { callback: callback });
    });
    it("not create chain for invalid words", function () {
        var chain = word_chain_1.wordChain(tree, "xxxxx", "zzzzz");
        helpers_1.notExist(chain);
    });
    it("lead => gold", function () {
        createAndCheck({ first: "lead", last: "gold" });
    });
    it("ruby => code", function () {
        createAndCheck({ first: "ruby", last: "code" });
    });
    it("travel => market", function () {
        createAndCheck({ first: "travel", last: "market" });
    });
    // it("create a word chain from pair", () => {
    //   createAndCheck({ pair: ["travel", "market"] });
    // });
});
