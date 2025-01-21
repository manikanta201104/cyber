const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
  voterId: { type: String, required: true, unique: true },
  hasVoted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Voter", VoterSchema);
