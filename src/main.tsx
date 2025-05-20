import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppKitProvider } from './wagmi';
import App from './App';
import './App.css';
import './i18n';
import { HeroUIProvider } from '@heroui/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <AppKitProvider >
        <App />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick theme="dark" />
      </AppKitProvider>
    </HeroUIProvider>
  </React.StrictMode>)