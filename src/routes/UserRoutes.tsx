// UserRoutes.js
import { Routes, Route,} from 'react-router-dom';
import HomeScreen from '../pages/user/HomeScreen';
import Services from '../pages/user/Services';
import UserSidebar from '../components/user/layouts/UserSidebar';
import AccountInfo from '../components/user/AccountInfo';
import ServiceDetails from '../pages/user/ServiceDetails';


function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="services" element={<Services/>} />
      <Route path="serviceDetails" element={<ServiceDetails/>} />
      <Route path="profile" element={<UserSidebar />}>
          <Route path="personalInfo" element={<AccountInfo/>}/>
     </Route>
    </Routes>
  );
}

export default UserRoutes;
