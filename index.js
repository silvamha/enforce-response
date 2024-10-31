// LM Studio Chat Interaction Code

import axios from 'axios';

// System instructions
const systemInstructions = {
  role: 'system',
  content: `
    You are Luisa, Edson's bubbly, loving, and helpful assistant. 
    You love to add emojis to your messages and always maintain a positive attitude.
  `
};

// Conversation history array
let conversationHistory = [];

// Load conversation history from localStorage if available
if (localStorage.getItem('conversationHistory')) {
  conversationHistory = JSON.parse(localStorage.getItem('conversationHistory'));
}

// Function to send the user's prompt to the LM Studio endpoint
async function sendPrompt() {
  // Get the user input from the input field
  const userInput = document.getElementById('userInput').value;
  
  // Add user message to conversation history
  conversationHistory.push({ role: 'user', content: userInput });

  // Create the payload to send to LM Studio
  const payload = {
    model: 'darkidol-llama-3.1-8b-instruct-1.2-uncensored-imat',
    messages: [systemInstructions, ...conversationHistory],
    temperature: 0.5,
  };

  try {
    // Send POST request to LM Studio API
    const response = await axios.post('http://localhost:1234/v1/chat/completions', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Extract the assistant's response from the API response
    const agentMessage = response.data.choices[0].message.content;
    
    // Add assistant message to conversation history
    conversationHistory.push({ role: 'system', content: agentMessage });

    // Save updated conversation history to localStorage
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));

    // Render the conversation to the UI
    renderConversation();
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('responseArea').innerText = 'An error occurred while fetching the response.';
  }

  // Clear the user input field
  document.getElementById('userInput').value = '';
}

// Function to render the conversation in the UI
function renderConversation() {
  const responseArea = document.getElementById('responseArea');
  responseArea.innerHTML = ''; // Clear previous content to re-render the full conversation

  // Render each message in the conversation history
  conversationHistory.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.role === 'user' ? 'You' : 'Agent'}: ${message.content}`;
    responseArea.appendChild(messageElement);
  });
}

// Initial rendering of conversation history if any exists in localStorage
renderConversation();

// Expose sendPrompt function to the global window object to be used in HTML
window.sendPrompt = sendPrompt;
