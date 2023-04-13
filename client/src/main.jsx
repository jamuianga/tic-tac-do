import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './pages/auth/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'reset-password',
    element: <div><h1>Redefinir senha</h1></div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
