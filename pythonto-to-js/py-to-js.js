// import OpenAI from 'openai';
// import { parse } from 'json';

// const client = new OpenAI({
//     baseUrl: "http://localhost:1234/v1",
//     apiKey: "lm-studio"
// });

// const messages = [
//     { role: "system", content: "You are a helpful AI assistant." },
//     { role: "user", content: "Create 1-3 fictional characters" }
// ];

// const characterSchema = {
//     type: "json_schema",
//     json_schema: {
//         name: "characters",
//         schema: {
//             type: "object",
//             properties: {
//                 characters: {
//                     type: "array",
//                     items: {
//                         type: "object",
//                         properties: {
//                             name: { type: "string" },
//                             occupation: { type: "string" },
//                             personality: { type: "string" },
//                             background: { type: "string" }
//                         },
//                         required: ["name", "occupation", "personality", "background"]
//                     },
//                     minItems: 1,
//                 }
//             },
//             required: ["characters"]
//         },
//     }
// };

// async function getResponse() {
//     const response = await client.chat.completions.create({
//         model: "your-model",
//         messages: messages,
//         response_format: characterSchema,
//     });

//     const results = parse(response.choices[0].message.content);
//     console.log(JSON.stringify(results, null, 2));
// }

// getResponse();

// Import Axios or any HTTP client library you prefer
const axios = require('axios');

// Point to the local server
const baseURL = 'http://localhost:1234/v1';
const apiKey = 'lm-studio';

// Creating the payload for the completion request
const payload = {
  model: 'lmstudio-community/mistral-nemo-instruct-2407-gguf',
  messages: [
    { role: 'system', content: 'Always answer in rhymes.' },
    { role: 'user', content: 'Introduce yourself.' }
  ],
  temperature: 0.7
};

// Making the POST request using Axios
axios.post(`${baseURL}/chat/completions`, payload, {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log(response.data.choices[0].message);
})
.catch(error => {
  console.error('Error:', error);
});
