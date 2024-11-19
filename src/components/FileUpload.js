import React from 'react';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import mammoth from 'mammoth';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function FileUpload({ onFileUpload }) {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    let text = '';

    if (file.type === 'application/pdf') {
      text = await handlePDFFile(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      text = await handleDocxFile(file);
    } else if (file.type === 'text/plain') {
      text = await handleTxtFile(file);
    } else {
      alert('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    onFileUpload(text, file.name);  
  };

  const handlePDFFile = async (file) => {
    const loadingTask = pdfjs.getDocument(URL.createObjectURL(file));
    const pdf = await loadingTask.promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      text += textContent.items.map(item => item.str).join(' ');
    }
    return text;
  };

  const handleDocxFile = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const handleTxtFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  return (
    <div className="file-upload">
      <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} />
    </div>
  );
}

export default FileUpload;
