import React from 'react';

function FileUpload() {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Handle file upload here
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default FileUpload;
