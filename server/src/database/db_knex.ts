require('ts-node/register');
require('../utils/dotEnvInit');
const path = require('path');
const env = process.env.NODE_ENV || 'local';

export default {
    local: {
        client: 'pg',
        connection: {
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            password: process.env.POSTGRES_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: path.resolve(__dirname, '../../', 'migrations'),
        },
        seeds: {
            directory: path.resolve(__dirname, '../../', 'seeds'),
        },
    },
}[env] as any;
