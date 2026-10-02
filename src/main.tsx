import React from 'react';
import ReactDOM from 'react-dom/client';
import { EconestProvider } from './context/EconestContext';
import { AppContent } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EconestProvider>
      <AppContent />
    </EconestProvider>
  </React.StrictMode>
);
