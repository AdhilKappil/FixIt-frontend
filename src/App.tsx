
import { Outlet } from 'react-router-dom'
import './App.css'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    {/* <ToastContainer autoClose={2000}/> */}
      <Outlet/>
    </>
  )
}

export default App