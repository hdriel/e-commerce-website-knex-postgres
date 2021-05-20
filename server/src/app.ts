import './utils/dotEnvInit';
import express from 'express';
import bodyParser from 'body-parser';
import logger from './utils/logger';
import './database';

import mainRoute from './routes/index';
import userRoute from './routes/user';

const app = express();

// Use middleware as required
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, Authorization, account',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
}); // for third parties
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', mainRoute);
app.use('/user', userRoute);

// catch 404
app.use((req, res) => {
    logger.warn(`404 ERROR CODE: ${req.method}:${req.originalUrl}`);
    return res.sendStatus(404);
});


export default app;
