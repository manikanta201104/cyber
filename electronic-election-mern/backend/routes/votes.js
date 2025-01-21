// routes/voteRoutes.js
const express = require('express');
const { generateKeys, encrypt, tallyVotes } = require('../utils/elgamal.js'); // Update import path to elgamal.js

const router = express.Router();

// Route: Get public key
router.get('/public-key', (req, res) => {
  try {
    const { publicKey } = generateKeys();
    res.json({ publicKey });
  } catch (error) {
    console.error('Error generating public key:', error);
    res.status(500).json({ error: 'An error occurred while generating the public key' });
  }
});

// Route: Encrypt a vote
router.post('/encrypt', (req, res) => {
  try {
    const { vote, publicKey } = req.body;

    if (typeof vote !== 'number' || !publicKey) {
      return res.status(400).json({ error: 'Invalid input: vote and publicKey are required' });
    }

    const encryptedVote = encrypt(vote, publicKey);
    res.json(encryptedVote);
  } catch (error) {
    console.error('Error encrypting vote:', error);
    res.status(500).json({ error: 'An error occurred while encrypting the vote' });
  }
});

// Route: Tally votes
router.post('/tally', (req, res) => {
  try {
    const { votes } = req.body;

    if (!votes || !Array.isArray(votes) || votes.length === 0) {
      return res.status(400).json({ error: 'Invalid input: votes array is required' });
    }

    const result = tallyVotes(votes);
    res.json(result);
  } catch (error) {
    console.error('Error tallying votes:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
