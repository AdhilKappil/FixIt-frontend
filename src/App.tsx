import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import HomeScreen from "./pages/user/HomeScreen";
import Services from "./pages/user/Services";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="admin/*" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
