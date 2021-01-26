const getTimeStamp = (): string => {
  return new Date().toISOString();
};

export interface LoggerInterface {
  namespace: string;
  message: string;
  object?: any;
}

export type Logger = LoggerInterface;

const INFO = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
  } else {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
  }
};

const WARN = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
  } else {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
  }
};

const ERROR = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
  } else {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
  }
};

export default { INFO, WARN, ERROR, getTimeStamp };
