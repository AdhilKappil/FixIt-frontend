// UserRoutes.js
import { Routes, Route,} from 'react-router-dom';
import HomeScreen from '../pages/user/HomeScreen';
import Services from '../pages/user/Services';
import UserSidebar from '../components/user/layouts/UserSidebar';
import AccountInfo from '../components/user/AccountInfo';
import ServiceDetails from '../pages/user/ServiceDetails';
import AddLocation from '../components/user/Booking/AddLocation';
import AddBookingDetails from '../components/user/Booking/AddBookingDetails';
import UserPrivateRoute from './privateRoutes/UserPrivateRoute';
import MyBooking from '../components/user/MyBooking';


function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="services" element={<Services/>} />
      <Route path="serviceDetails" element={<ServiceDetails/>} />
      <Route path='*' element={<UserPrivateRoute/>}>
      <Route path="addLocation" element={<AddLocation/>} />
      <Route path="addBookingDetails" element={<AddBookingDetails/>} />
      </Route>
      <Route path="profile" element={<UserSidebar />}>
          <Route path="personalInfo" element={<AccountInfo/>}/>
          <Route path="myBookings" element={<MyBooking/>}/>
     </Route>
    </Routes>
  );
}

export default UserRoutes;
