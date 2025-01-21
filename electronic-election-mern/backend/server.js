const fs = require('fs');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const https = require('https'); // Use HTTPS module

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://192.168.50.199:3000', // Replace with your frontend IP and port
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions)); // Enable CORS

// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/electronic-elections';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Vote model (assuming it's already created in models/Vote.js)
const Vote = require('./models/Vote');

// Endpoint to fetch the public key
app.get('/api/public-key', (req, res) => {
  try {
    const publicKeyPath = './certificates/public_key.pem';
    if (!fs.existsSync(publicKeyPath)) {
      return res.status(404).json({ message: 'Public key file not found' });
    }
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    res.status(200).json({ publicKey });
  } catch (error) {
    console.error('Error reading public key:', error);
    res.status(500).json({ message: 'Error fetching public key' });
  }
});

// Vote tally endpoint
app.get('/api/votes/tally', async (req, res) => {
  try {
    const votes = await Vote.find({});
    if (votes.length === 0) {
      return res.status(200).json({
        message: 'No votes have been cast yet. Please vote first.',
        tally: 0,
        result: 'No votes yet',
      });
    }

    let tally = 0;
    votes.forEach((vote) => {
      if (vote.encryptedVote.includes('+')) {
        tally += 1; // Candidate A
      } else if (vote.encryptedVote.includes('-')) {
        tally -= 1; // Candidate B
      }
    });

    const result = tally > 0 ? 'Candidate A wins' : tally < 0 ? 'Candidate B wins' : 'It\'s a tie';

    // Respond with the tally in JSON format
    res.status(200).json({
      message: 'Vote tally calculated successfully',
      tally,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tally results' });
  }
});

// POST route for casting a vote
app.post('/api/votes/cast', async (req, res) => {
  try {
    const { encryptedVote } = req.body;

    if (!encryptedVote) {
      return res.status(400).json({ message: 'Invalid vote data' });
    }

    const voterId = uuidv4(); // Generate unique voter ID

    // Save the vote to MongoDB
    const vote = new Vote({
      voterId,
      encryptedVote,
    });

    await vote.save();

    res.status(200).json({ message: 'Vote casted successfully!' });
  } catch (error) {
    console.error('Error casting vote:', error);
    res.status(500).json({ message: 'Error casting vote' });
  }
});

// HTTPS setup
let privateKey, certificate;
try {
  privateKey = fs.readFileSync('./certificates/private_key.pem', 'utf8');
  certificate = fs.readFileSync('./certificates/certificate.pem', 'utf8');
} catch (error) {
  console.error('Error reading SSL certificates:', error);
  process.exit(1); // Exit if certificates are missing
}

// Start the HTTPS server
const server = https.createServer({ key: privateKey, cert: certificate }, app);

const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`HTTPS server running on port ${port}`));
