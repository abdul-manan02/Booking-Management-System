import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from "../src/MainMenu/Home";
import About from "../src/MainMenu/About";
import Contact from "../src/MainMenu/Contact";
import Login from '../src/MainMenu/Login';
import Signup from "../src/MainMenu/Signup";
import Booking from './User/Booking';
import UserMenu from "../src/User/UserMenu";
import PredefinedRoutes from './User/PredefinedRoutes';
import BookingStatus from './User/BookingStatus';
import AdminLogin from '../src/MainMenu/AdminLogin';
import AdminMenu from './Admin/AdminMenu';
import ManageVehicle from './Admin/ManageVehicle/ManageVehicle';
import AddVehicle from './Admin/ManageVehicle/AddVehicle';
import DeleteVehicle from './Admin/ManageVehicle/DeleteVehicle';
import UpdateVehicle from './Admin/ManageVehicle/UpdateVehicle';
import ViewVehicle from './Admin/ManageVehicle/ViewVehicle';
import AddDriver from './Admin/ManageDriver/AddDriver';
import ManageDriver from './Admin/ManageDriver/ManageDriver';
import UpdateDriver from './Admin/ManageDriver/UpdateDriver';
import DeleteDriver from './Admin/ManageDriver/DeleteDriver';
import ViewDriver from './Admin/ManageDriver/ViewDriver';
import ManageBooking from './Admin/ManageBooking/ManageBooking';
import ViewBooking from './Admin/ManageBooking/ViewBooking';
import SelectPredefined from './Admin/DriverSelection/SelectPredefined';
import SelectCustom from './Admin/DriverSelection/SelectCustom';
import TrackLocation from './User/TrackLocation';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/admin-login' element={<AdminLogin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/booking' element={<Booking/>}></Route>
        <Route path='/booking_status' element={<BookingStatus/>}></Route>
        <Route path='/user-dashboard' element={<UserMenu/>}></Route>
        <Route path='/admin-dashboard' element={<AdminMenu/>}></Route>
        <Route path='/manage-vehicles' element={<ManageVehicle/>}></Route>
        <Route path='/predefined_routes' element={<PredefinedRoutes/>}></Route>
        <Route path='/add-vehicle' element={<AddVehicle/>}></Route>
        <Route path='/delete-vehicle' element={<DeleteVehicle/>}></Route>
        <Route path='/update-vehicle' element={<UpdateVehicle/>}></Route>
        <Route path='/view-vehicle' element={<ViewVehicle/>}></Route>
        <Route path='/manage-drivers' element={<ManageDriver/>}></Route>
        <Route path='/add-driver' element={<AddDriver/>}></Route>
        <Route path='/update-driver' element={<UpdateDriver/>}></Route>
        <Route path='/delete-driver' element={<DeleteDriver/>}></Route>
        <Route path='/view-driver' element={<ViewDriver/>}></Route>
        <Route path='/manage-bookings' element={<ManageBooking/>}></Route>
        <Route path='/view-booking' element={<ViewBooking/>}></Route>
        <Route path='/select-predefined-driver' element={<SelectPredefined/>}></Route>
        <Route path='/select-custom-driver' element={<SelectCustom/>}></Route>
        <Route path='/track-location' element={<TrackLocation/>}></Route>
      </Routes>
    </>
  );
}

export default App;

