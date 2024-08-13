import { useState } from 'react';
import User from './User';
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { PiToggleLeftFill } from "react-icons/pi";
import { PiToggleRightFill } from "react-icons/pi";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const Retailers = () => {
  const [sales, setSales] = useState([{
    name: "ABC",
    email: "abc@gmail.com",
    password: "123",
    phone: "03175516322",
    cnic: "1234567891011",
    earning: "14k",
    active: false,
    adminVerify: true,
    imageUrl: '/img.png' // Default image
  }, {
    name: "XYZ",
    email: "yxz@gmail.com",
    password: "123",
    phone: "03175516322",
    cnic: "1234567891011",
    earning: "14k",
    active: false,
    adminVerify: false,
    imageUrl: '/img.png' // Default image
  }, {
    name: "Hamza",
    email: "ali@gmail.com",
    password: "123",
    phone: "03175516322",
    cnic: "1234567891011",
    earning: "14k",
    active: true,
    adminVerify: true,
    imageUrl: '/img.png' // Default image
  }]);
  

  const [isFormVisible, setFormVisible] = useState(false);
  const [newSalesPerson, setNewSalesPerson] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    address: '',
    imageUrl: null,
    active: false,
    adminVerify: false
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setNewSalesPerson({
      ...newSalesPerson,
      [name]: type === 'checkbox' ? checked : type === 'file' ? URL.createObjectURL(files[0]) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSales([...sales, newSalesPerson]);
    setFormVisible(false);
    setNewSalesPerson({
      name: '',
      email: '',
      password: '',
      phone: '',
      city: '',
      address: '',
      imageUrl: null,
      active: false,
      adminVerify: false
    });
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='relative'>
      <User />
      <div className='flex justify-between items-center mt-3'>
        <h1 className='text-xl font-bold'>Retailers</h1>
        <div className='flex gap-7'>
          <img src="/Search.svg" alt="search" className='ml-[30px]' />
          <input className='p-2 outline-none ml-[-30px]' type="search" name="search" placeholder='Search by name, role...' />
          <select name="" id="" placeholder="City">
            <option value="">City</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
          </select>
          <select name="" id="" placeholder="Status">
            <option value="">Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          <button className='bg-[#FFD7CE] text-[#FF5934] text-nowrap p-2 rounded' onClick={() => setFormVisible(true)}>+ Add Retailer</button>
        </div>
      </div>
      <div className='mt-3'>
        <table className='w-full'>
          <thead>
            <tr className='text-left'>
              <th>Name</th>
              <th>Password</th>
              <th>Phone no</th>
              <th>CNIC</th>
              <th>Earning</th>
              <th>Active</th>
              <th>Admin Verified</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((data, index) => (
              <tr key={index} className='border-b cursor-pointer' onClick={() => setSelectedUser(data)}>
                <td className='flex items-center gap-2 p-2'>
                  <input
                    type="checkbox"
                    onClick={handleCheckboxClick}
                    className='h-5 w-5 accent-black'
                  />
                  <img src={data.imageUrl} alt="" className='w-6 h-6 rounded-full' />
                  <div>
                    <h1>{data.name}</h1>
                    <h3 className='text-sm'>{data.email}</h3>
                  </div>
                </td>
                <td className='p-2'>{data.password}</td>
                <td className='p-2'>{data.phone}</td>
                <td className='p-2'>{data.cnic}</td>
                <td className='p-2'>{data.earning}</td>
                <td className='p-2'
                  onClick={() => updateDataHandler(!data.isActive, "isActive", data)}
                >{data.isActive ? <PiToggleRightFill size={25} className='text-green-500'/> : <PiToggleLeftFill size={25} className='text-gray-400'/>}</td>
                <td className='p-2'
                  onClick={() => updateDataHandler(!data.isAdminVerified, "isAdminVerified", data)}
                >{data.isAdminVerified ? <PiToggleRightFill size={25} className='text-green-500'/> : <PiToggleLeftFill size={25} className='text-gray-400'/>}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormVisible && (
        <div className='fixed inset-0 flex border border-[#FF5934] items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white w-[35%] p-6 mt-5 mb-5 rounded'>
            <h2 className='text-xl font-bold mb-4'>Add Retailer</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col justify-center items-center'>
                  <img
                    width="150px"
                    style={{ borderRadius: "5px", height: "100px" }}
                    className='mb-2'
                    src={"/Avatar.svg"}
                  />
                  
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                required
                className=' p-2 ml-28'
              />
                  </div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newSalesPerson.name}
                onChange={handleInputChange}
                required
                className='border p-2 rounded border-[#FF5934]'
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newSalesPerson.email}
                onChange={handleInputChange}
                required
                className='border p-2'
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newSalesPerson.password}
                onChange={handleInputChange}
                required
                className='border p-2'
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone No"
                value={newSalesPerson.phone}
                onChange={handleInputChange}
                required
                className='border p-2 rounded border-[#FF5934]'
              />
              <select
                name="city"
                value={newSalesPerson.city}
                onChange={handleInputChange}
                required
                className='border p-2 rounded border-[#FF5934]'
              >
                <option value="">Choose City</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
              </select>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={newSalesPerson.address}
                onChange={handleInputChange}
                required
                className='border p-2 rounded border-[#FF5934]'
              />
              {/* <label className='flex items-center'>
                <input
                  type="checkbox"
                  name="active"
                  checked={newSalesPerson.active}
                  onChange={handleInputChange}
                  className='mr-2'
                />
                Active
              </label>
              <label className='flex items-center'>
                <input
                  type="checkbox"
                  name="adminVerify"
                  checked={newSalesPerson.adminVerify}
                  onChange={handleInputChange}
                  className='mr-2'
                />
                Admin Verified
              </label> */}
              <div className='flex justify-center gap-4'>
                <button type="button" onClick={() => setFormVisible(false)} className='bg-gray-300 w-28 p-2 rounded'>Cancel</button>
                <button type="submit" className='bg-[#FF5934] w-28 text-white p-2 rounded'>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={`fixed top-0 right-0 h-full w-[35%] bg-white p-4 shadow-lg transition-transform ${selectedUser ? 'translate-x-0' : 'translate-x-full'}`}>
      {selectedUser && (
          <div className='flex flex-col justify-center items-start'>
            <h2 className='text-xl font-bold mb-4'>User Details</h2>
            <img src={selectedUser.image} alt="" className='w-20 h-20 rounded-full mb-4' />
            <div className='mb-2 border-b-2 -bold  w-full '><span className='font-bold'>{selectedUser.name}</span> <br />
              <span className='text-gray-600'>{selectedUser.email}</span></div>
            <div className='mb-2 border-b-2 w-full'><strong>Phone No:</strong> <br />{selectedUser.phone}</div>
            <div className='mb-2 border-b-2 w-full'><strong>CNIC:</strong><br /> {selectedUser.cnic}</div>
            <div className='mb-2 border-b-2 w-full'><strong>Address:</strong> <br />{selectedUser.address}</div>
            <button onClick={() => setSelectedUser(null)} className='bg-gray-300 p-2 rounded mt-4'>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Retailers;
