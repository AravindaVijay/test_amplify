import React, { useState } from 'react';
import './ChatInterface.css';
import logo from './logo.png'; // Ensure this points to your actual logo file path
import { sendMessage } from './api'; // Import the API function

function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: "Hello! Give me the input to analyse the sentiment", sender: "bot" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      // Add user's message to the chat
      const userMessage = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput(''); // Clear input after sending

      try {
        const response = await sendMessage(input);
        console.log("API Response:", response.data);

        // Parse the label and score from the response data
        if (response.data && response.data.body && Array.isArray(response.data.body) && response.data.body.length > 0) {
          const { label, score } = response.data.body[0];
          const botMessage = { text: `Sentiment: ${label}, Confidence: ${score.toFixed(2)}`, sender: "bot" };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSend();
    }
  };

  return (
    <div className="chat-interface">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="user-info">
          <h3>Senti-Bot</h3>
          <p>Active Now</p>
        </div>
      </div>
      <div className="chat-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="input-area">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} 
          placeholder="Type your message here..."
          rows="2" 
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
