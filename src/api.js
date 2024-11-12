import axios from 'axios';

export async function sendMessage(text) {
  try {
    const response = await axios.post('https://muq5yevkgc.execute-api.us-east-1.amazonaws.com/prod/', {
      inputs: text  
    });
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    return { data: 'Error connecting to the server' };
  }
}
