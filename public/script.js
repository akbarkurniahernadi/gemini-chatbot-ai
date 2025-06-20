const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const apiUrl = '/api/chat'; // Or 'http://localhost:3000/api/chat' if running on a different origin during development

chatForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const message = userInput.value.trim();
    if (!message) {
        return; // Don't send empty messages
    }

    // Display user's message in the chatbox
    appendMessage('User', message);
    userInput.value = ''; // Clear the input field

    // Show thinking indicator
    const thinkingMessageElement = appendMessage('Gemini', 'Gemini is thinking...', true);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        // Remove thinking indicator
        thinkingMessageElement.remove();

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Display AI's reply in the chatbox
        appendMessage('Gemini', data.reply);

    } catch (error) {
        console.error('Error sending message to API:', error);
        // Remove thinking indicator even if there's an error
        if (thinkingMessageElement) thinkingMessageElement.remove();
        appendMessage('Error', `Sorry, something went wrong: ${error.message}`);
    }
});

function appendMessage(sender, text, isThinking = false) {
    const messageElement = document.createElement('div');
    const senderClass = sender.toLowerCase() + '-message';
    messageElement.classList.add('message', senderClass); 

    if (isThinking) {
        messageElement.classList.add('thinking-message');
    }

    const senderElement = document.createElement('strong');
    senderElement.textContent = sender + ': ';

    const textElement = document.createElement('span');
    textElement.textContent = text;

    messageElement.appendChild(senderElement);
    messageElement.appendChild(textElement);

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

    return messageElement; // Return the element so it can be removed if needed
}
