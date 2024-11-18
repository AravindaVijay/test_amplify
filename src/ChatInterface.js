import React, { useState } from "react";
import "./ChatInterface.css";
import logo from "./logo.png"; // Ensure this points to your actual logo file path
import { sendMessage } from "./api"; // Import the API function

function sentiment_label(label) {
  if (label === "POS") {
    return "Positive";
  } else if (label === "NEG") {
    return "Negative";
  } else if (label === "NEU") {
    return "Neutral";
  }
}

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! Give me the input to analyse the sentiment",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      // Add user's message to the chat
      const userMessage = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput(""); // Clear input after sending

      try {
        const response = await sendMessage(input);
        console.log("API Response:", response.data);

        const { sentiment_analysis, emotion_detection } = response.data;

        if (sentiment_analysis?.length > 0 && emotion_detection?.length > 0) {
          const sentimentLabel = sentiment_label(sentiment_analysis[0].label);
          const sentimentScore = sentiment_analysis[0].score.toFixed(2);
          const emotionLabel = emotion_detection[0].label;
          const emotionScore = emotion_detection[0].score.toFixed(2);

          // Create the bot's response
          const botMessage = {
            text: `The sentiment of the sentence is ${sentimentLabel} with a confidence of ${sentimentScore} and the emotion is ${emotionLabel} with a confidence of ${emotionScore}`,
            sender: "bot",
          };

          // const botMessage = {
          //   text: `Sentiment: ${sentimentLabel} (Confidence: ${sentimentScore}) \n Emotion: ${emotionLabel} (Confidence: ${emotionScore})`,
          //   sender: "bot",
          // };
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
    if (e.key === "Enter" && !e.shiftKey) {
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
