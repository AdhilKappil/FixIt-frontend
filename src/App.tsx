
import { Outlet } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <ToastContainer autoClose={2000}/>
      <Outlet/>
    </>
  )
}

export default App


// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import UserRoutes from './routes/UserRoutes';
// import WorkerRoutes from './routes/WorkerRoutes';
// import AdminRoutes from './routes/AdminRoutes';



// function App() {

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/*" element={<UserRoutes />} />
//         <Route path="/worker/*" element={<WorkerRoutes/>} />
//         <Route path="/admin/*" element={<AdminRoutes />} />
//       </Routes>    
//     </BrowserRouter>
//   );
// }

// export default App;