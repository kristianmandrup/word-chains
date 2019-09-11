"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayTime = function (label, time) {
    console.log(label + ": " + time + " ms");
};
exports.runBefore = function (_a) {
    var _b = _a === void 0 ? {} : _a, first = _b.first, last = _b.last;
    var time = new Date().getTime();
    return time;
};
exports.runAfter = function (beforeTime, _a) {
    var _b = _a === void 0 ? {} : _a, chain = _b.chain, first = _b.first, last = _b.last;
    var time = new Date().getTime();
    var diffTime = time - beforeTime;
    var chainWrds = first + "-" + last;
    var chainLength = chain.length;
    var chainComma = chain.join(",");
    console.log(chainWrds);
    exports.displayTime(chainLength + " " + chainComma + " :: time", diffTime);
    return time;
};
