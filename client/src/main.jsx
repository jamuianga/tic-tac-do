import axiosHttp from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

export const axios = axiosHttp.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
