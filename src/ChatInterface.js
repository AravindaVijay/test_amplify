import React, { useState } from "react";
import "./ChatInterface.css";
import logo from "./logo.png"; // Ensure this points to your actual logo file path
import { sendMessage } from "./api"; // Import the API function
import FileUpload from './components/FileUpload';
import { FaPaperclip, FaPaperPlane, FaFilePdf, FaFileWord, FaFileAlt } from 'react-icons/fa';
import Modal from './components/modal';

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
      text: "Hello! Give me the input to analyse the sentiment and emotion",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [fileContent, setFileContent] = useState("");

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

  const handleFileUpload = async (fileContent, fileName) => {
    let icon;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    
    // Set icon based on file extension
    if (fileExtension === "pdf") icon = <FaFilePdf className="file-icon pdf" />;
    else if (["doc", "docx"].includes(fileExtension)) icon = <FaFileWord className="file-icon word" />;
    else icon = <FaFileAlt className="file-icon default" />;
    const userMessage = { 
      text: "Click to view uploaded file content", 
      sender: "user", 
      isFile: true, 
      fileContent: fileContent, 
      icon 
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add file content as user message
    setFileContent(fileContent);
    try {
      const response = await sendMessage(fileContent);
  
      // Extract label and score from the first item in each array
      const sentiment = response.data.sentiment_analysis[0];
      const emotion = response.data.emotion_detection[0];
  
      // Format the response as a sentence
      const sentimentText = `The sentiment of the sentence is ${sentiment.label} with a confidence of ${sentiment.score.toFixed(2)}`;
      const emotionText = `and the emotion is ${emotion.label} with a confidence of ${emotion.score.toFixed(2)}.`;
  
      // Combine both sentences
      const botMessage = {
        text: `${sentimentText} ${emotionText}`,
        sender: "bot"
      };
  
      // Update the messages state with the new bot message
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error in file upload or API call:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error processing the file. Please try again.", sender: "bot" }
      ]);
    }
  };
  
  const openModalWithContent = (content) => {
    setFileContent(content);
    setModalOpen(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    //  <div className="chat-interface">
    //   <div className="header">
    //     <img src={logo} alt="Logo" className="logo" />
    //     <div className="user-info">
    //       <h3>Senti-Bot</h3>
    //       <p>Active Now</p>
    //     </div>
    //   </div>
    //   <div className="chat-area">
    //     {messages.map((msg, index) => (
    //       <div key={index} className={`message ${msg.sender}`}>
    //         <p>{msg.text}</p>
    //       </div>
    //     ))}
    //   </div>
    //   <div className="input-area">
    //     <div className="file-upload-wrapper">
    //       <FileUpload onFileUpload={handleFileUpload}>
    //         <FaPaperclip className="file-upload-icon" />
    //         <span className="file-upload-label">Upload</span>
    //       </FileUpload>
    //     </div>
    //     <div className="textarea-wrapper">
    //       <textarea
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         onKeyPress={handleKeyPress}
    //         placeholder="Type your message here..."
    //         rows="3"
    //       />
    //       <button onClick={handleSend}>Send</button>
    //     </div>
    //   </div>
    // </div>
    <div className="chat-interface">
      <div className="chat-area">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-wrapper ${msg.sender}`}
            onClick={() => msg.isFile && openModalWithContent(msg.fileContent)}
          >
            {msg.sender === "bot" && <img src={logo} alt="Bot Logo" className="bot-logo" />}
            <div className={`message ${msg.sender}`}>
              {msg.isFile && msg.icon} {/* Display the file icon */}
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <div className="file-upload-wrapper">
          <FileUpload onFileUpload={handleFileUpload}>
            <FaPaperclip className="file-upload-icon" />
          </FileUpload>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          rows="2"
        />
        <button onClick={handleSend}>
          <FaPaperPlane className="send-icon" />
        </button>
      </div>
      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        content={fileContent}
      />
    </div>
  );
}

export default ChatInterface;
