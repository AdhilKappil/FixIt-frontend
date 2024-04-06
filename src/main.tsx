import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from './pages/user/HomeScreen.tsx';
import Services from './pages/user/Services.tsx';
import Navbar from './pages/admin/Navbar.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      {/* user public routes */}
      <Route index={true} path="/" element={<HomeScreen/>} />
      <Route path="/services" element={<Services />} />
      
      {/* admin routes */}
      <Route path="admin/*" element={<Navbar/>} />

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
</Provider>
)
