import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WebsiteEntrance from './WebsiteEntrance'; // Nieuwe import
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebsiteEntrance /> {/* Gebruik het nieuwe component */}
  </React.StrictMode>
);

reportWebVitals();