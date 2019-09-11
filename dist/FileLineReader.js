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
var readline = __importStar(require("readline"));
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // console.log(args);
};
var FileLineReader = /** @class */ (function () {
    function FileLineReader(filePath, _a) {
        var callback = _a.callback, onLine = _a.onLine;
        if (!filePath) {
            throw Error("new FileLineReader: missing filePath");
        }
        this.filePath = filePath;
        this.callback = callback || log;
        this.onLine = onLine;
        this.readFile(filePath);
    }
    FileLineReader.prototype.readFile = function (filePath) {
        var _this = this;
        var callback = this.callback;
        // console.log("FileLineReader: readFile", filePath);
        fs.open(filePath, "r", function (err, descriptor) {
            if (err) {
                return callback(err);
            }
            _this.readLines(descriptor);
        });
    };
    FileLineReader.prototype.readLines = function (descriptor) {
        var _a = this, filePath = _a.filePath, callback = _a.callback, onLine = _a.onLine;
        // console.log("FileLineReader: readLines", filePath);
        var lineCount = 0;
        var lineStream = fs.createReadStream(filePath, { fd: descriptor });
        readline
            .createInterface({
            input: lineStream
        })
            .on("line", function (line) {
            onLine(line);
            lineCount++;
            return;
        })
            .on("error", callback)
            .on("close", function () {
            callback(null, lineCount);
        });
    };
    return FileLineReader;
}());
exports.FileLineReader = FileLineReader;
