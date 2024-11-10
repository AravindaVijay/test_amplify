import React, { useState } from 'react';
import FileUpload from './FileUpload';
import MessageBubble from './MessageBubble';
import { sendMessage } from '../api';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    const response = await sendMessage(input);
    const botMessage = { text: response.data, sender: 'bot' };
    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      <FileUpload />
    </div>
  );
}

export default ChatBox;
