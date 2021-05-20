import winston from 'winston';
import path from 'path';

const { LOGGING_MODE, NODE_ENV } = process.env;
const fileName = path.basename(__filename);
const pwd = process.env.PWD || process.cwd();
const colorizer = winston.format.colorize();

type TLEVEL = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
const LEVELS = Object.freeze({
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    silly: 5,
    verbose: 6,
    useraction: 7,
});

const COLORS = Object.freeze({
    fatal: 'magenta',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'cyan',
    silly: 'grey',
    verbose: 'grey',
    useraction: 'grey',
});

// eslint-disable-next-line new-cap
const winstonLogger = new (winston as any).createLogger({
    levels: LEVELS,
    level: LOGGING_MODE,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.printf((msg) => colorizer.colorize(
            msg.level,
            `${msg.timestamp} ${msg.level.toUpperCase()}\t${
                NODE_ENV !== 'local' && msg.message && typeof msg.message === 'string'
                    ? msg.message.replace(/(\r\n|\n|\r)/gm, '')
                    : msg.message
            }`,
        )),
    ),
    transports: [
        new winston.transports.Console({ level: LOGGING_MODE }),
    ],
});

winston.addColors(COLORS);

const logger = {
    // The order is important to determine witch logs we will see from the top-bottom level
    getLineTrace(error: Error | any) {
        const lineTraces = error.stack.split('\n');
        let lineTrace = lineTraces[1];
        // eslint-disable-next-line no-restricted-syntax
        for (const line of lineTraces) {
            const isLoggerFile = line.includes(`${fileName}:`);
            if (isLoggerFile && !line.includes('Object.logger') && !line.includes('errorHandler')) {
                lineTrace = line;
                break;
            } else if (line.includes(pwd) && !isLoggerFile) {
                lineTrace = line;
                break;
            }
        }
        return lineTrace;
    },

    writeLog(logLevel: TLEVEL, message: string, options = {}) {
        try {
            const infoObject = { message: `${message}`, ...(LEVELS.useraction !== logLevel && options) };

            switch (logLevel) {
                case LEVELS.fatal:
                    winstonLogger.fatal(infoObject);
                    break;
                case LEVELS.error:
                    winstonLogger.error(infoObject);
                    break;
                case LEVELS.warn:
                    winstonLogger.warn(infoObject);
                    break;
                case LEVELS.info:
                    winstonLogger.info(infoObject);
                    break;
                case LEVELS.debug:
                    winstonLogger.debug(infoObject);
                    break;
                case LEVELS.silly:
                    winstonLogger.silly(infoObject);
                    break;
                case LEVELS.verbose:
                    winstonLogger.verbose(infoObject);
                    break;
                case LEVELS.useraction:
                    winstonLogger.useraction({ message });
                    break;
                default:
                    break;
            }
        } catch (e) {
            const lineTrace = (this.getLineTrace(e) || '').replace(pwd, '');
            const errMsg = `${e.message} failed handle error in ${lineTrace}`;
            // eslint-disable-next-line no-console
            console.error(errMsg);
        }
    },

    fatal(message: string, options = {}) {
        this.writeLog(LEVELS.fatal as TLEVEL, message, options);
    },
    error(message: string, options = {}) {
        this.writeLog(LEVELS.error as TLEVEL, message, options);
    },
    warn(message: string, options = {}) { this.writeLog(LEVELS.warn as TLEVEL, message, options); },
    warning(message: string, options = {}) { this.writeLog(LEVELS.warn as TLEVEL, message, options); },
    info(message: string, options = {}) { this.writeLog(LEVELS.info as TLEVEL, message, options); },
    debug(message: string, options = {}) { this.writeLog(LEVELS.debug as TLEVEL, message, options); },
    silly(message: string, options = {}) { this.writeLog(LEVELS.silly as TLEVEL, message, options); },
    verbose(message: string, options = {}) { this.writeLog(LEVELS.verbose as TLEVEL, message, options); },
    userAction(message: string) {
        // eslint-disable-next-line no-undef,prefer-rest-params
        this.writeLog(LEVELS.useraction as TLEVEL, message, ...[...arguments].slice(1));
    },
};

logger.info(`Logger run with '${LOGGING_MODE}' logging mode`);

export default logger;
