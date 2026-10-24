import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import App from './pages/App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
