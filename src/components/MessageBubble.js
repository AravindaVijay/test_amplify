import React from 'react';

function MessageBubble({ message }) {
  return (
    <div className={`message-bubble ${message.sender}`}>
      {message.text}
    </div>
  );
}

export default MessageBubble;
