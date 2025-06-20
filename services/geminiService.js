// c:/Users/Abay/Documents/gemini-chatbot-api/services/geminiService.js

/**
 * Service function to interact with the Gemini model.
 * @param {object} model - The initialized Gemini model instance.
 * @param {string} message - The user's message.
 * @param {object} generationConfig - The generation configuration.
 * @returns {Promise<string>} - The AI's response text.
 */
async function generateGeminiResponse(model, message, generationConfig) { // Accept configuration
    const result = await model.generateContent(message, { generationConfig }); // Pass configuration object
    return result.response.text();
}

module.exports = { generateGeminiResponse };