// c:/Users/Abay/Documents/gemini-chatbot-api/routes/chatRoutes.js

const express = require('express');
const { createChatController } = require('../controllers/chatController');

/**
 * Creates the chat router.
 * @param {object} model - The initialized Gemini model instance.
 * @param {object} generationConfig - The generation configuration.
 * @returns {object} - Express router instance.
 */
function createChatRouter(model, generationConfig) { // Accept configuration
    const router = express.Router();
    const chatController = createChatController(model, generationConfig); // Pass configuration to controller factory

    router.post('/chat', chatController); // Changed from '/' to '/chat'

    return router;
}

module.exports = { createChatRouter };