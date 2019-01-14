module.exports = {
    database: 'dbtest',
    username: 'postgres',
    password: '@root',
    host: '127.0.0.1',
    params: {
        dialect: 'postgres'
    },
    jwtSecret: 'T0P-S3CR3T',
    jwtSession: { session: false },
};