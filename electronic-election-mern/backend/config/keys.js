const { generateKeys } = require("../utils/elgamal.js");

const { publicKey, privateKey, ec } = generateKeys();

module.exports = { publicKey, privateKey, ec };
