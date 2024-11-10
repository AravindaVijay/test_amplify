import React from 'react';
import LeftMenu from './components/LeftMenu';
import ChatBox from './components/ChatBox';
import ChatInterface from './ChatInterface';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <LeftMenu />
      
      <ChatInterface />
    </div>
  );
}

export default App;

