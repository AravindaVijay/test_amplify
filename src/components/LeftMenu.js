import React from 'react';
import logo from '../logo-left.png';

import './LeftMenu.css';

function LeftMenu() {
  return (
    <div className="left-menu">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Senti-Bot</h2>
      {/* <p>Username: John Doe</p> */}
      {/* Additional user info can go here */}
    </div>
  );
}

export default LeftMenu;

