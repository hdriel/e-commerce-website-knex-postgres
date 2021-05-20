import './utils/dotEnvInit';
import http from 'http';
import app from './app.js';
import logger from './utils/logger';

const server = http.createServer(app);

const PORT = 1000;
server.listen(PORT, async () => {
    logger.info(`Listening to http://localhost:${PORT}/`);
});

server.on('uncaughtException', (_req, res, _next, err) => {
    logger.info(`UncaughtException : ${err.stack || err}`);
    return res.status(500).send(err.message);
});

server.on('error', (err) => {
    logger.error(`server.on Error : ${err.stack || err}'`);
    process.exit(1);
});

// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (reason, p) => {
    logger.error(`=== UNHANDLED REJECTION === \nUnhandled Rejection at: Promise '${JSON.stringify(p, null, 4)}' \nreason: '${reason}'`);
    throw reason;
});

// Stop process killing on exceptions
process.on('uncaughtException', (error) => {
    logger.error(`=== UNCAUGHT EXCEPTION === \nError: '${error}'`);
});
