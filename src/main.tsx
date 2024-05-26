import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
import { GoogleOAuthProvider } from '@react-oauth/google'


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEAUTH_CLIENTID}>
          <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

