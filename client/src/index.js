import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

