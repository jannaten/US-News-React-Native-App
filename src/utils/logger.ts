const isDev = __DEV__;

type Meta = Record<string, unknown>;

const fmt = (level: string, msg: string, meta?: Meta) =>
  meta ? `[${level}] ${msg} ${JSON.stringify(meta)}` : `[${level}] ${msg}`;

export const logger = {
  debug: (msg: string, meta?: Meta) => {
    if (isDev) console.warn(fmt('DEBUG', msg, meta));
  },
  info: (msg: string, meta?: Meta) => {
    if (isDev) console.warn(fmt('INFO', msg, meta));
  },
  warn: (msg: string, meta?: Meta) => {
    console.warn(fmt('WARN', msg, meta));
  },
  error: (msg: string, meta?: Meta) => {
    console.error(fmt('ERROR', msg, meta));
  },
};
