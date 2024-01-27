// LoadingOverlay.js
import React from 'react';
import './LoadingOverlay.css'; // Import CSS for styling

function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default LoadingOverlay;
