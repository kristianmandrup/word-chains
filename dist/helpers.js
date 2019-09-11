"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var word_chain_1 = require("./word-chain");
exports.dataFilePath = path.join(__dirname, "../data");
var dictionaryFile = "50kwords.txt";
exports.dictionaryFilePath = path.join(exports.dataFilePath, dictionaryFile);
var noValue = function (value) { return value === null || value === undefined; };
exports.exist = function (value) { return expect(noValue(value)).toBeFalsy(); };
exports.notExist = function (value) {
    expect(noValue(value)).toBeTruthy();
};
exports.isEqual = function (value, checkValue) {
    return expect(value).toEqual(checkValue);
};
exports.isNumber = function (value) { return expect(typeof value).toEqual("number"); };
exports.isArray = function (value) {
    return expect(Array.isArray(value)).toBeTruthy();
};
exports.hasLength = function (value, len) {
    exports.isArray(value);
    expect(value.length).toEqual(len);
};
exports.isTrue = function (value) { return expect(value).toBeTruthy(); };
exports.isFalse = function (value) { return expect(value).toBeFalsy(); };
exports.checkersFor = function (chain) {
    var isChain = function () {
        exports.exist(chain);
        exports.isArray(chain);
    };
    var checkFirst = function (word) { return exports.isEqual(chain.shift(), word); };
    var checkLast = function (word) { return exports.isEqual(chain.pop(), word); };
    var checkTerminators = function (first, last) {
        isChain();
        checkFirst(first);
        checkLast(last);
    };
    return { isChain: isChain, checkFirst: checkFirst, checkLast: checkLast, checkTerminators: checkTerminators };
};
exports.createChecker = function (textTree, opts) {
    if (opts === void 0) { opts = {}; }
    return function (first, last) {
        var runBefore = opts.runBefore, runAfter = opts.runAfter;
        var beforeResult = runBefore && runBefore({ first: first, last: last });
        var chain = word_chain_1.wordChain(textTree, first, last);
        chain && runAfter && runAfter(beforeResult, { chain: chain, first: first, last: last });
        var checkTerminators = exports.checkersFor(chain).checkTerminators;
        return checkTerminators;
    };
};
