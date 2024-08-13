import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../../CSS/Login.css';

const User = () => {
  return (
    <div className='bg-[#FFFFFF]'>
      <div className="users">
        <ul className='flex gap-4 mr-3'>
          <li className='inner'>
            <NavLink
              to="/Users/Sales"
              className={({ isActive }) =>
                `hover:text-white hover:bg-[#FF5934] p-2 rounded ${isActive ? 'bg-[#FF5934] text-white' : ''}`
              }
            >
              Sales Person
            </NavLink>
          </li>
          <li className='inner'>
            <NavLink
              to="/Users/WarehouseManagers"
              className={({ isActive }) =>
                `hover:text-white hover:bg-[#FF5934] p-2 rounded ${isActive ? 'bg-[#FF5934] text-white' : ''}`
              }
            >
              Warehouse Managers
            </NavLink>
          </li>
          <li className='inner'>
            <NavLink
              to="/Users/Retailers"
              className={({ isActive }) =>
                `hover:text-white hover:bg-[#FF5934] p-2 rounded ${isActive ? 'bg-[#FF5934] text-white' : ''}`
              }
            >
              Retailers
            </NavLink>
          </li>
          <li className='inner'>
            <NavLink
              to="/Users/Coordinators"
              className={({ isActive }) =>
                `hover:text-white hover:bg-[#FF5934] p-2 rounded ${isActive ? 'bg-[#FF5934] text-white' : ''}`
              }
            >
              Coordinators
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User;
