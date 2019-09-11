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
exports.createPairsChecker = function (textTree, opts) { return function (pairs) {
    var checker = exports.createChecker(textTree, opts);
    pairs.map(function (pair) { return checker({ pair: pair }); });
}; };
exports.createChecker = function (textTree, opts) {
    if (opts === void 0) { opts = {}; }
    return function (_a) {
        var _b = _a === void 0 ? {} : _a, first = _b.first, last = _b.last, pair = _b.pair;
        var runBefore = opts.runBefore, runAfter = opts.runAfter;
        var firstWord = first || (pair && pair[0]);
        var lastWord = last || (pair && pair[1]);
        // console.log({ firstWord, lastWord });
        if (!firstWord) {
            console.error("Missing first word", { first: first, pair: pair });
            throw Error("Missing first word");
        }
        if (!lastWord) {
            console.error("Missing last word", { first: first, pair: pair });
            throw Error("Missing last word");
        }
        var args = { first: firstWord, last: lastWord };
        var beforeResult = runBefore && runBefore(args);
        var chain = word_chain_1.wordChain(textTree, firstWord, lastWord);
        chain && runAfter && runAfter(beforeResult, __assign({ chain: chain }, args));
        var checkTerminators = exports.checkersFor(chain).checkTerminators;
        return checkTerminators;
    };
};
