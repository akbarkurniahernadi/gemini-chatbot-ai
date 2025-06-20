const serverless = require('serverless-http');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { createChatRouter } = require('../../routes/chatRoutes'); // Path relatif dari netlify/functions/api.js ke routes/
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Gunakan SDK yang sesuai

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Define generation configuration
const generationConfig = {
  temperature: 0.7,
  maxOutputTokens: 200,
};

let model;
let initializationError = null; // Variable to store any initialization error

try {
  if (!process.env.GEMINI_API_KEY) {
    initializationError = new Error("GEMINI_API_KEY environment variable is not set.");
    console.error(initializationError.message);
  } else {
    // Instantiate the client
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = ai.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });
    console.log("Gemini AI model initialized successfully for Netlify Function.");
  }
} catch (e) {
  initializationError = e; // Store the error
  console.error("Failed to initialize Gemini AI for Netlify Function:", e);
}

if (initializationError) {
  // If initialization failed, set up a catch-all route to return a JSON error.
  app.use('/*', (req, res) => {
    res.status(500).json({
      error: "API initialization failed.",
      details: initializationError.message
    });
  });
} else {
  // Only set up the chatRouter if initialization was successful
  const chatRouter = createChatRouter(model, generationConfig);
  // Mount chatRouter di root dari aplikasi Express yang dibungkus oleh serverless-http.
  // Jika fungsi ini diakses via /.netlify/functions/api/*,
  // maka rute '/chat' di chatRouter akan menjadi /.netlify/functions/api/chat
  app.use('/', chatRouter);
}


module.exports.handler = serverless(app);