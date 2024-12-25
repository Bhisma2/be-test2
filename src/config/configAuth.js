module.exports = {
    jwtSecret: `${process.env.CONFIG_AUTH}`,
    databaseURL: process.env.MONGODB_CONNECT_URI
};