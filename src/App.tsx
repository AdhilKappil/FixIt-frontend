import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import HomeScreen from "./pages/user/HomeScreen";
import Services from "./pages/user/Services";
import Navbar from "./pages/admin/Navbar";
// import UsersManagement from "./pages/admin/user_Mgmt/User";
// import Services_Mgmt from "./pages/admin/services/Services_Mgmt";
// import Transaction from "./pages/admin/transaction/Transaction";
// import JoinRequests from "./pages/admin/joinRequests/JoinRequests";
// import Worker from "./pages/admin/workers_Mgmt/Worker";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="admin/*" element={<Navbar/>}/>
         </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
