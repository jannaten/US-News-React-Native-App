/* eslint-disable no-console */
type Meta = Record<string, unknown>;

const fmt = (level: string, msg: string) => `[${new Date().toISOString()}] [${level}] ${msg}`;

export const logger = {
  debug: (msg: string, meta?: Meta) => {
    if (meta !== undefined) {
      console.log(fmt('DEBUG', msg), meta);
    } else {
      console.log(fmt('DEBUG', msg));
    }
  },
  info: (msg: string, meta?: Meta) => {
    if (meta !== undefined) {
      console.log(fmt('INFO', msg), meta);
    } else {
      console.log(fmt('INFO', msg));
    }
  },
  warn: (msg: string, meta?: Meta) => {
    if (meta !== undefined) {
      console.warn(fmt('WARN', msg), meta);
    } else {
      console.warn(fmt('WARN', msg));
    }
  },
  error: (msg: string, meta?: Meta) => {
    if (meta !== undefined) {
      console.error(fmt('ERROR', msg), meta);
    } else {
      console.error(fmt('ERROR', msg));
    }
  },
};
