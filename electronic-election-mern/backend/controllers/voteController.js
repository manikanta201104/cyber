// controllers/voteController.js
const { elgamalEncrypt, tallyVotes } = require('../services/voteService');

// Route handler to encrypt a vote
function encryptVote(req, res) {
  const { candidate } = req.body; // Expecting 'candidate' in the request body
  const encryptedVote = elgamalEncrypt(candidate, g, p);
  res.json({ encryptedVote });
}

// Route handler to tally encrypted votes
function tallyVoteResults(req, res) {
  const votes = req.body.votes; // Expecting an array of encrypted votes
  const tally = tallyVotes(votes);
  res.json({ tally });
}

module.exports = { encryptVote, tallyVoteResults };
