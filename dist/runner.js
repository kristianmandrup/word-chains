"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextTree_1 = require("./TextTree");
var effects_1 = require("./effects");
var helpers_1 = require("./helpers");
exports.run = function (_a) {
    var _b = _a === void 0 ? {} : _a, file = _b.file, first = _b.first, last = _b.last;
    var tree = new TextTree_1.TextTree();
    var createAndCheck = helpers_1.createChecker(tree, { runBefore: effects_1.runBefore, runAfter: effects_1.runAfter });
    tree.initialise(file, function (err, lineCount) {
        if (err) {
            throw err;
        }
        console.log("file: " + file + " :: words " + lineCount);
        createAndCheck(first, last);
    });
};
