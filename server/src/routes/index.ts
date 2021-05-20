import express from 'express';
import logger from '../utils/logger.js';
import { User } from '../db-abstract-layer/user';

const router = express.Router();

router.use((req, _res, next) => {
    logger.debug(`${req.method}:${req.originalUrl}`);
    next();
});

router.get('/health', (_req, res) => res.json({ message: 'OK' }));

router.get('/', (_req, res) => {
    res.send('Hello World');
});

router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await User.getUserById(+userId);
    res.json(user);
});

export default router;
