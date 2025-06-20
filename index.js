const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const { createChatRouter } = require('./routes/chatRoutes');
// Import the GoogleGenerativeAI constructor from the OLD SDK
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

console.log("Attempting to import @google/genai...");
const port = 3000;

// Define generation configuration
const generationConfig = {
  temperature: 0.7, // Example: Lower temperature for less random output
  maxOutputTokens: 200, // Example: Limit response length
  // Add other config options like topP, topK if needed
};

// Instantiate the client using the constructor from the OLD SDK
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Get the model instance using the method directly on the instance (OLD SDK)
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig }); // Set model to 1.5-flash

const chatRouter = createChatRouter(model, generationConfig); // Pass generationConfig
app.use('/api', chatRouter);

app.listen(port, () => {
  console.log(`Gemini API server running on http://localhost:${port}`);
});