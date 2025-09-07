    const bcrypt = require("bcrypt");

    async function hash(data, salt) {
        return await bcrypt.hash(data, salt);
    }

    async function compareHash(str, encrypted) {
        return await bcrypt.compare(str, encrypted);
    }

    module.exports = {hash, compareHash};