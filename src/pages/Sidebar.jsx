import React from 'react';
import { NavLink } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { SlDiamond } from "react-icons/sl";
import { FaCodePullRequest } from 'react-icons/fa6';
import Dashboardimg from '/dashboard.svg';
import productimg from '/products.svg';
import categoryimg from '/category.svg';
import brandimg from '/brands.svg';
import orderimg from '/order.svg';
import cityimg from '/city.svg';
import bannerimg from '/banner.svg';
import logimg from '/logs.svg';
import { FaRegUser } from "react-icons/fa";
import privacyimg from '/privacy.svg';

import '../CSS/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="side h-screen md:w-[18%] w-[50%] border-r rounded-r-lg flex flex-col items-center p-4">
      <h1 className='text-[#FF5934] md:text-2xl text-sm font-bold mb-4 karyana'>Karyana</h1>
      <ul className="w-full mr-[24px] ">
        <li>
          <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 w-full ${isActive ? 'border-l-2 bg-gradient-to-r from-slate-200 to-slate-50 bg-slate-200 border-[#FF5934] text-[#FF5934] font-bold' : 'hover:bg-gradient-to-r from-slate-200 to-slate-50 hover:text-[#FF5934]'}`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={Dashboardimg}
                  alt="Dashboard"
                  className="w-5 h-5"
                  style={{ filter: isActive ? 'brightness(0) saturate(100%) invert(44%) sepia(87%) saturate(3332%) hue-rotate(351deg) brightness(97%) contrast(101%)' : 'none' }}
                />
                <span className='md:text-base p-2 text-gray-700'>Dashboard</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Users/Sales"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 w-full ${isActive ? 'border-l-2 border-[#FF5934] bg-gradient-to-r from-slate-200 to-slate-50 text-[#FF5934] font-bold' :  'hover:bg-gradient-to-r from-slate-200 to-slate-50 hover:text-[#FF5934]'}`
            }
          >
            {({ isActive }) => (
              <>
                <FaRegUser
                  size={20}
                  style={{ color: isActive ? '#FF5934' : 'inherit' }}
                />
                <span className='text-base text-gray-700 p-2'>Users</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Product"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 w-full ${isActive ? 'border-l-2 border-[#FF5934] bg-gradient-to-r from-slate-200 to-slate-50 text-[#FF5934] font-bold' : 'hover:bg-gradient-to-r from-slate-200 to-slate-50 hover:text-[#FF5934]'}`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={productimg}
                  alt="Product"
                  className="w-5 h-5"
                  style={{ filter: isActive ? 'brightness(0) saturate(100%) invert(44%) sepia(87%) saturate(3332%) hue-rotate(351deg) brightness(97%) contrast(101%)' : 'none' }}
                />
                <span className='text-base text-gray-700 p-2'>Product</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Categories"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 w-full ${isActive ? 'border-l-2 border-[#FF5934] bg-gradient-to-r from-slate-200 to-slate-50 text-[#FF5934] font-bold' :  'hover:bg-gradient-to-r from-slate-200 to-slate-50 hover:text-[#FF5934]'}`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={categoryimg}
                  alt="Categories"
                  className="w-5 h-5"
                  style={{ filter: isActive ? 'brightness(0) saturate(100%) invert(44%) sepia(87%) saturate(3332%) hue-rotate(351deg) brightness(97%) contrast(101%)' : 'none' }}
                />
                <span className='md:text-base text-gray-700 p-2'>Categories</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Brands"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 w-full ${isActive ? 'border-l-2 border-[#FF5934] bg-gradient-to-r from-slate-200 to-slate-50 text-[#FF5934] font-bold' : 'hover:bg-gradient-to-r from-slate-200 to-slate-50 hover:text-[#FF5934]'}`
            }
          >
            {({ isActive }) => (
              <>
                <SlDiamond
                  size={20}
                  style={{ color: isActive ? '#FF5934' : 'inherit' }}
                />
                <span className='text-base text-gray-700 p-2'>Brands</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Order"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 w-full ${isActive ? 'border-l-2 border-[#FF5934] bg-gradient-to-r from-slate-200 to-slate-50 text-[#FF5934] font-bold' :  'hover:bg-gradient-to-r from-slate-200 to-slate-50 hover:text-[#FF5934]'}`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={orderimg}
                  alt="Orders"
                  className="w-5 h-5"
                  style={{ filter: isActive ? 'brightness(0) saturate(100%) invert(44%) sepia(87%) saturate(3332%) hue-rotate(351deg) brightness(97%) contrast(101%)' : 'none' }}
                />
                <span className='text-base text-gray-700 p-2'>Orders</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Cities"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 w-full ${isActive ? 'border-l-2 border-[#FF5934] bg-gradient-to-r from-slate-200 to-slate-50 text-[#FF5934] font-bold' :  'hover:bg-gradient-to-r from-slate-200 to-slate-50 hover:text-[#FF5934]'}`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={cityimg}
                  alt="Cities"
                  className="w-5 h-5"
                  style={{ filter: isActive ? 'brightness(0) saturate(100%) invert(44%) sepia(87%) saturate(3332%) hue-rotate(351deg) brightness(97%) contrast(101%)' : 'none' }}
                />
                <span className='text-base text-gray-700 p-2'>Cities</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Banner"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 w-full ${isActive ? 'border-l-2 border-[#FF5934] bg-gradient-to-r from-slate-200 to-slate-50 text-[#FF5934] font-bold' :  'hover:bg-gradient-to-r from-slate-200 to-slate-50 hover:text-[#FF5934]'}`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={bannerimg}
                  alt="Banner"
                  className="w-5 h-5"
                  style={{ filter: isActive ? 'brightness(0) saturate(100%) invert(44%) sepia(87%) saturate(3332%) hue-rotate(351deg) brightness(97%) contrast(101%)' : 'none' }}
                />
                <span className='text-base text-gray-700 p-2'>Banner</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/PrivacyPolicy"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 w-full ${isActive ? 'border-l-2 border-[#FF5934] bg-gradient-to-r from-slate-200 to-slate-50 text-[#FF5934] font-bold' : 'hover:bg-gray-200 hover:text-[#FF5934]'}`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={privacyimg}
                  alt="Privacy Policy"
                  className="w-5 h-5"
                  style={{ filter: isActive ? 'brightness(0) saturate(100%) invert(44%) sepia(87%) saturate(3332%) hue-rotate(351deg) brightness(97%) contrast(101%)' : 'none' }}
                />
                <span className='text-base text-gray-700 p-2'>Privacy Policy</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Terms"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 w-full ${isActive ? 'border-l-2 border-[#FF5934] bg-gradient-to-r from-slate-200 to-slate-50 text-[#FF5934] font-bold' : 'hover:bg-gray-200 hover:text-[#FF5934]'}`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={privacyimg}
                  alt="Terms & Conditions"
                  className="w-5 h-5"
                  style={{ filter: isActive ? 'brightness(0) saturate(100%) invert(44%) sepia(87%) saturate(3332%) hue-rotate(351deg) brightness(97%) contrast(101%)' : 'none' }}
                />
                <span className='text-base text-gray-700 p-2'>Terms & Conditions</span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
      <div className="btn flex mt-28 gap-2 md:mr-[55%] justify-end items-start">
        <CiLogout className='text-[#FF5934] mb-4 font-bold text-2xl' />
        <button className='text-[#FF5934] font-bold'>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
