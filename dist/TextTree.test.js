"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextTree_1 = require("./TextTree");
var helpers_1 = require("./helpers");
var helpers_2 = require("./helpers");
var tree = null;
var hasWord = function (word) { return helpers_1.isTrue(tree.hasWord(word)); };
var notHasWord = function (word) { return helpers_1.isFalse(tree.hasWord(word)); };
describe("Text tree", function () {
    beforeEach(function () {
        tree = new TextTree_1.TextTree();
    });
    it("constructs tree", function () {
        helpers_1.exist(tree);
    });
    describe("initialise", function () {
        it("missing dictionary file", function (done) {
            var callback = function (err, lineCount) {
                helpers_1.exist(err);
                helpers_1.notExist(lineCount);
                done();
            };
            tree.initialise("./nonexistant.txt", { callback: callback });
        });
        it("text dictionary", function (done) {
            var callback = function (err, lineCount) {
                helpers_1.notExist(err);
                helpers_1.exist(lineCount);
                helpers_1.isNumber(lineCount);
                done();
            };
            tree.initialise(helpers_2.dictionaryFilePath, { callback: callback });
        });
    });
    describe("initialised tree", function () {
        beforeEach(function (done) {
            tree = new TextTree_1.TextTree();
            var callback = function () {
                done();
            };
            tree.initialise(helpers_2.dictionaryFilePath, { callback: callback });
        });
        describe("getPath", function () {
            it("get the tree path for a valid word", function () {
                var path = tree.getPath("aba");
                expect(path).toBeDefined();
                helpers_1.hasLength(path, 4);
            });
            it("get null for an invalid word", function () {
                var path = tree.getPath("abc");
                helpers_1.notExist(path);
            });
        });
        describe("hasWord", function () {
            it("validate a known word", function () {
                hasWord("aardvark");
            });
            it("invalidate an incomplete word", function () {
                notHasWord("aard");
            });
            it("invalidate an unknown word", function () {
                notHasWord("aaaaa");
            });
        });
    });
});
