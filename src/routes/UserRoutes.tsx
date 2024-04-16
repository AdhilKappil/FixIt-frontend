// UserRoutes.js
import { Routes, Route, Outlet } from 'react-router-dom';
import HomeScreen from '../pages/user/HomeScreen';
import Services from '../pages/user/Services';


function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/service" element={<Services/>} />
      <Route path="*" element={<Outlet />} /> {/* Render nested routes */}
    </Routes>
  );
}

export default UserRoutes;
