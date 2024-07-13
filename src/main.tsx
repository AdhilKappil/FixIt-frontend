import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { GoogleOAuthProvider } from '@react-oauth/google'
import Loader from './components/common/Loader.tsx'

AOS.init();

// Lazy load the App component
const App = lazy(() => import('./App.tsx'));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEAUTH_CLIENTID}>
        <Suspense fallback={<Loader/>}>
          <App />
        </Suspense>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
