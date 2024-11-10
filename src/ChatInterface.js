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
        // Send the message to the API and use the response directly
        const response = await sendMessage(input);
        const botMessage = { text: response.data, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("API call failed:", error);
      }
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
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
