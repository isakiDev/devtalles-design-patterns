import { COLORS } from "../../helpers/colors.ts";
import { type Logger } from "./type.ts";

export class LocalLoggerAdapter implements Logger {
  public file: string;

  constructor(file: string) {
    this.file = file;
  }

  writeLog(msg: string): void {
    console.log(`[${this.file} Log] ${msg}`);
  }

  writeWarning(msg: string): void {
    console.log(`[${this.file} Warning] %c${msg}`, COLORS.yellow);
  }

  writeError(msg: string): void {
    console.log(`[${this.file} Error] %c${msg}`, COLORS.red);
  }
}
