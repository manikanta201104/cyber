// utils/elgamal.js
const forge = require('node-forge');

const p = forge.util.hexToBytes("F4F86A00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"); // Prime p
const g = forge.util.hexToBytes("2"); // Generator g

// Function to generate public and private keys
function generateKeys() {
  // Your key generation logic here
  return { publicKey: g }; // Simplified for demonstration
}

// ElGamal encryption function
function encrypt(plaintext, publicKey) {
  const message = parseInt(plaintext, 16); // Convert plaintext to integer
  const r = Math.floor(Math.random() * 1000); // Random number for encryption
  const c1 = Math.pow(publicKey, r) % p; // c1 = g^r mod p
  const c2 = (message * Math.pow(1, r)) % p; // c2 = m * (h^r mod p)
  return { c1, c2 };
}

// Function to tally votes (simplified)
function tallyVotes(votes) {
  let candidateATally = 0;
  let candidateBTally = 0;

  votes.forEach((vote) => {
    if (vote.voteFor === 'A') {
      candidateATally++;
    } else if (vote.voteFor === 'B') {
      candidateBTally--;
    }
  });

  return {
    candidateATally,
    candidateBTally,
  };
}

module.exports = { generateKeys, encrypt, tallyVotes };
