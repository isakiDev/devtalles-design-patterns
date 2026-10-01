import { Logger as DenoLogger } from "@deno-library/logger";
import { type Logger } from "./type.ts";

export class DenoLoggerAdapter implements Logger {
  public file: string;
  private logger = new DenoLogger();

  constructor(file: string) {
    this.file = file;
  }

  writeLog(msg: string): void {
    this.logger.log(`[${this.file} Log] ${msg}`);
  }

  writeWarning(msg: string): void {
    this.logger.warn(`[${this.file} Warning] ${msg}`);
  }

  writeError(msg: string): void {
    this.logger.error(`[${this.file} Error] ${msg}`);
  }
}
