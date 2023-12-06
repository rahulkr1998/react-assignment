import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/Dashboard'; 
import AdminLogin from './pages/AdminLogin';
import SignUp from './pages/SignUp';
import VendorLogin from './pages/VendorLogin';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useState } from 'react';
import VendorDashboard from './pages/VendorDashboard';
import LoginBoard from './pages/LoginBoard';


function App() {

const[isAdminLoggedIn,setAdminLoggedIn]=useState(false);
const[isVendorLoggedIn,setIsVendorLoggedIn]=useState(false);

const handleAdminLogin = (loggedIn) => {
  setAdminLoggedIn(loggedIn);
};

const handleVendorLogin = (loggedIn) => {
  setIsVendorLoggedIn(loggedIn);
};

  return (
  //   <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<Dashboard />} />
  //     <Route path="/adminlogin" element={<AdminLogin onLogin={handleAdminLogin}/>} />
  //     <Route path="/vendorlogin" element={<VendorLogin />} />
  //     <Route path="/signup" element={<SignUp />} />
  //     <Route path="/admindashboard" element={<AdminDashboard />} />
  //     <Route
  //         path="/adminlogin"
  //         element={isAdminLoggedIn ? <Navigate to="/admindashboard" /> : <AdminLogin />}
  //       />
  //       {/* <Route
  //         path="/login"
  //         element={<Login onLogin={handleLogin} />}
  //       /> */}
  //       <Route
  //         path="/vendorlogin"
  //         element={isVendorLoggedIn ? <Navigate to="/admindashboard" /> :  <VendorLogin /> }
  //       />
  //   </Routes>
  // </BrowserRouter>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<LoginBoard />} />
    <Route
      path="/adminlogin"
      element={
        isAdminLoggedIn ? (
          <Navigate to="/admindashboard" />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} />
        )
      }
    />
    <Route
      path="/vendorlogin"
      element={
        isVendorLoggedIn ? (
          <Navigate to="/vendordashboard" />
        ) : (
          <VendorLogin onLogin={handleVendorLogin} />
        )
      }
    />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/admindashboard" element={<AdminDashboard />} />
    <Route path="/vendordashboard/:vendorId" element={<VendorDashboard/>} />
  </Routes>
</BrowserRouter>
 

  );
}


export default App;


 {/* <Dashboard/> */}
 {/* <AdminLogin/> */}
 {/* <SignUp/> */}
 {/* <VendorLogin/> */}
 {/* <AdminDashboard/> */}
 