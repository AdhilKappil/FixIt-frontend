import { Routes, Route, Outlet } from "react-router-dom";
import AdminLogin from "../components/admin/AdminLogin";
import AdminPrivateRoute from "../components/admin/AdminPrivateRoute";
import Navbar from "../pages/admin/Navbar";

function AdminRoutes() {
  return (
    <Routes>
    <Route path="/adminLogin" element={<AdminLogin />} />
    <Route path="*" element={<AdminPrivateRoute />}>
      <Route path="*" element={<Navbar/>} />
    </Route>
  </Routes>
  );
}


export default AdminRoutes;