import bcrypt from "bcrypt";

async function hash(data, salt) {
    return await bcrypt.hash(data, salt);
}

async function compareHash(str, encrypted) {
    return await bcrypt.compare(str, encrypted);
}

export default {hash, compareHash}