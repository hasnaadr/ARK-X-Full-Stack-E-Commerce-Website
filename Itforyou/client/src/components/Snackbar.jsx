// Snackbar.js

import React, { useState, useEffect } from 'react';

const Snackbar = ({ message,bgColor, show, onClose }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);

    // Auto-hide the Snackbar after a certain time (e.g., 3000 milliseconds)
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    // Clear the timeout on component unmount or when show changes
    return () => clearTimeout(timeout);
  }, [show, onClose]);

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white p-4 rounded ${isVisible ? 'block' : 'hidden'}`}>
      {message}
    </div>
  );
};

export default Snackbar;
