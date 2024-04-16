// UserRoutes.js
import { Routes, Route,} from 'react-router-dom';
import HomeScreen from '../pages/user/HomeScreen';
import Services from '../pages/user/Services';


function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="services" element={<Services/>} />
    </Routes>
  );
}

export default UserRoutes;
