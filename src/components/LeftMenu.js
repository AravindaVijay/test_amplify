import React from 'react';
import logo from '../logo-left.png';

import './LeftMenu.css';

function LeftMenu() {
  return (
    <div className="left-menu">
      <img src={logo} alt="Logo" className="logo" />
      <h1 style={{ fontFamily: 'Arial, sans-serif' }}>Senti-Bot</h1>
      <p className="description">
      <strong>Senti-Bot</strong> is an interactive chatbot designed to analyze sentiment and emotion from user-provided text or document files. Users can interact with Senti-Bot by typing messages or uploading files (PDF, DOCX, or TXT) to receive insights on the sentiment (positive, negative, neutral) and dominant emotion (e.g., joy, sadness, anger) within the content.
      </p>
    </div>
  );
}

export default LeftMenu;

