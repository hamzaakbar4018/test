import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Sidebar from './pages/Sidebar';
import Terms from './pages/Terms';
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';
import Login from './pages/Login';
import Cities from './pages/Cities';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Brands from './pages/Brands';
import Banner from './pages/Banner';
import { GoBell } from "react-icons/go";
import Users from './components/Users/User';
import Sales from './components/Users/Sales';
import Coordinators from './components/Users/Coordinators';
import Retailers from './components/Users/Retailers';
import WarehouseManagers from './components/Users/WarehouseManagers';
import Category from './pages/Category';
import Logs from './pages/Logs';
import Order from './pages/Order';
import './CSS/Login.css'

const App = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const admin = useSelector((state) => state.admin);
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return !admin?.isAuthenticated ? (
    <Router> <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </Router>
  ) : (
    <div className='overall bg-[#FFFFFF]'>
      <Router>
        <div className='flex'>
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <div className='nav flex justify-between items-center h-[60px] w-full p-4 shadow'>
              <div className="left">
                <h1 className='font-bold text-sm md:text-xl'>Welcome Admin!</h1>
                <p className='text-gray-500'>
                  {new Date().toLocaleDateString('en-US', { weekday:'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="right flex items-center space-x-4 relative">
                <GoBell size={25} onClick={toggleNotifications} className="cursor-pointer border border-gray-400 rounded-lg p-1 " />
                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 md:w-64 w-48 bg-white shadow-lg rounded p-4 z-50">
                    <p>No new notifications</p>
                  </div>
                )}
                <h2 className='font-bold'>Admin</h2>
              </div>
            </div>
            <div className="main-content flex-1 p-4">
              <Routes>
                <Route path="/" element={<Navigate to="/Dashboard" />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Users/*" element={<Users />} />
                <Route path="/Users/Sales" element={<Sales />} />
                <Route path="/Users/Warehousemanagers" element={<WarehouseManagers />} />
                <Route path="/Users/Coordinators" element={<Coordinators />} />
                <Route path="/Users/Retailers" element={<Retailers />} />
                <Route path="/Product" element={<Product />} />
                <Route path="/Categories" element={<Category />} />
                <Route path="/Brands" element={<Brands />} />
                <Route path="/Cities" element={<Cities />} />
                <Route path="/Banner" element={<Banner />} />
                <Route path="/Logs" element={<Logs />} />
                <Route path="/Order" element={<Order />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/Terms" element={<Terms />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router >
    </div >
  );
};

export default App;
