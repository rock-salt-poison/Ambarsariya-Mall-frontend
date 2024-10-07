import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './styles/style.scss';
import './styles/swal.scss';
import Home from './Pages/Home';
import ClockPage from './Pages/ClockPage';
import SellRoutes from './Routes/SellRoutes';
import ServeRoutes from './Routes/ServeRoutes';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('access_token'));

  useEffect(() => {
    // Check if access_token exists in localStorage initially
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
   
    // Define the function that updates state when localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === 'access_token') {
        if (e.newValue === null) {
          setIsLoggedIn(false); // Token was removed, user is logged out
        } else {
          setIsLoggedIn(true); // Token exists, user is logged in
        }
      }
    };

    // Listen to the storage event
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isLoggedIn]); // Empty dependency array ensures this runs only once

  return (
    <>
      <Routes>
        <Route path="/AmbarsariyaMall" element={<Home />} />
        <Route path="/AmbarsariyaMall/clock" element={<ClockPage />} />
        <Route path="/AmbarsariyaMall/sell/*" element={<SellRoutes />} />
        <Route
          path="/AmbarsariyaMall/serve/*"
          element={isLoggedIn ? <ServeRoutes /> : <Navigate to="../AmbarsariyaMall/sell/login" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
