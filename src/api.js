import axios from 'axios';

export async function sendMessage(text) {
  try {
    const response = await axios.post('<AMPLIFY_API_ENDPOINT>/chat', { text });
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    return { data: 'Error connecting to the server' };  // Corrected line
  }
}
