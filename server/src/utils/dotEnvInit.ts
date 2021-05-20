import path from 'path';

const dotenv = require('dotenv');
dotenv.config({
    path: path.resolve(__dirname, '../../', `.env.${process.env.NODE_ENV || 'local'}`),
    silent: true
});
