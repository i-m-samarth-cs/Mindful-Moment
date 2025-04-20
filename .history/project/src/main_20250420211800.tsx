import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Import App component
import './index.css';  // Ensure Tailwind is imported or your custom styles

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
