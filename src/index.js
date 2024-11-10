// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css'; // Optional: Import global styles if you have any

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
