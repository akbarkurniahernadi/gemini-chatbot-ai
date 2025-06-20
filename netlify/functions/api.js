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

// Instantiate the client
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });

const chatRouter = createChatRouter(model, generationConfig);

// Mount chatRouter di root dari aplikasi Express yang dibungkus oleh serverless-http.
// Jika fungsi ini diakses via /.netlify/functions/api/*,
// maka rute '/chat' di chatRouter akan menjadi /.netlify/functions/api/chat
app.use('/', chatRouter);

module.exports.handler = serverless(app);