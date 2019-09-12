import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

type onLineCb = (line: string) => any;
type Callback = (...args: any[]) => void;

type opts = {
  callback: Callback;
  onLine: onLineCb;
};

const log = (...args: any[]) => {
  // console.log(args);
};

export class FileLineReader {
  callback: Callback;
  onLine: onLineCb;
  filePath: string;

  constructor(filePath: string, { callback, onLine }: opts) {
    if (!filePath) {
      throw Error("new FileLineReader: missing filePath");
    }
    this.filePath = filePath;
    this.callback = callback || log;
    this.onLine = onLine;
    this.readFile(filePath);
  }

  readFile(filePath: string) {
    const { callback } = this;
    // console.log("FileLineReader: readFile", filePath);
    fs.open(filePath, "r", (err, descriptor) => {
      if (err) {
        return callback(err);
      }
      this.readLines(descriptor);
    });
  }

  readLines(descriptor: any) {
    const { filePath, callback, onLine } = this;
    // console.log("FileLineReader: readLines", filePath);
    let lineCount = 0;
    const lineStream = fs.createReadStream(filePath, { fd: descriptor });
    readline
      .createInterface({
        input: lineStream
      })
      .on("line", line => {
        onLine(line);
        lineCount++;
        return;
      })
      .on("error", callback)
      .on("close", () => {
        callback(null, lineCount);
      });
  }
}

export const createFileLineReader = (filePath: string, opts: any) =>
  new FileLineReader(filePath, opts);
