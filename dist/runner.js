"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextTree_1 = require("./TextTree");
var effects_1 = require("./effects");
var helpers_1 = require("./helpers");
exports.checkerFor = function (_a) {
    var _b = _a === void 0 ? {} : _a, dictFile = _b.dictFile, callback = _b.callback;
    if (!dictFile) {
        throw Error("checkerFor: Missing dictFile");
    }
    var tree = new TextTree_1.TextTree();
    var pairsChecker = helpers_1.createPairsChecker(tree, { runBefore: effects_1.runBefore, runAfter: effects_1.runAfter });
    var initCb = function (err, lineCount) {
        if (err) {
            throw err;
        }
        console.log("dictionary: " + dictFile + " :: words " + lineCount);
        callback(pairsChecker);
    };
    tree.initialise(dictFile, { callback: initCb });
};
