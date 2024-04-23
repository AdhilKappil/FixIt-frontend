import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
// import HomeScreen from './pages/user/HomeScreen.tsx';
// import Services from './pages/user/Services.tsx';
// import Navbar from './pages/admin/Navbar.tsx';
// import AdminPrivateRoute from './components/admin/AdminPrivateRoute.tsx';
// import AdminLogin from './components/admin/AdminLogin.tsx';
// import JoinTeam from './components/worker/JoinTeam.tsx';
// import WorkerLogin from './components/worker/WorkerLogin.tsx';
// Aos animation
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
import { GoogleOAuthProvider } from '@react-oauth/google'
// import AddNewServices from './pages/admin/services/AddNewServices.tsx';


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>

//       {/* user public routes */}
//       <Route index={true} path="/" element={<HomeScreen/>} />
//       <Route path="/services" element={<Services />} />

      
//       {/* admin routes */}
//       <Route path="/adminLogin" element={<AdminLogin/>} />
//       <Route path="" element={<AdminPrivateRoute />}>
//          <Route path="admin/*" element={<Navbar/>} />
//          {/* <Route path="/addService" element={<AddNewServices />}/> */}
//       </Route>

//       {/* worker routes */}
//       <Route path="worker/*" element={<JoinTeam/>} />
//       <Route path="/workerLogin" element={<WorkerLogin/>} />

//     </Route>
//   )
// );

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <Provider store={store}>
//   <React.StrictMode>
//       <RouterProvider router={router} />
//   </React.StrictMode>
// </Provider>
// )

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEAUTH_CLIENTID}>
          <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

