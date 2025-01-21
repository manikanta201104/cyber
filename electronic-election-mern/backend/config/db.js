const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Directly use the correct MongoDB URI here
    await mongoose.connect("mongodb://127.0.0.1:27017/electronic-elections", { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
