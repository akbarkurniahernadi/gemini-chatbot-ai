// c:/Users/Abay/Documents/gemini-chatbot-api/controllers/chatController.js

const { generateGeminiResponse } = require('../services/geminiService');

/**
 * Handles the chat request.
 * @param {object} model - The initialized Gemini model instance.
 * @param {object} generationConfig - The generation configuration.
 * @returns {function} - Express request handler.
 */
function createChatController(model, generationConfig) { // Accept configuration
    return async (req, res) => {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        try {
            const reply = await generateGeminiResponse(model, message);
            res.status(200).json({ reply });
        } catch (error) {
            console.error('Error generating Gemini response:', error);
            res.status(500).json({ error: error.message || 'An internal server error occurred.' });
        }
    };
}

module.exports = { createChatController };