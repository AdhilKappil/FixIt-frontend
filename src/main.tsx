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
import AdminPrivateRoute from './components/admin/AdminPrivateRoute.tsx';
import AdminLogin from './components/admin/AdminLogin.tsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      {/* user public routes */}
      <Route index={true} path="/" element={<HomeScreen/>} />
      <Route path="/services" element={<Services />} />
      
      {/* admin routes */}
      <Route path="/adminLogin" element={<AdminLogin/>} />
      <Route path="" element={<AdminPrivateRoute />}>
         <Route path="admin/*" element={<Navbar/>} />
      </Route>
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
