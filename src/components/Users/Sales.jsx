import { useEffect, useRef, useState } from 'react';
import User from './User';
import { PiToggleLeftFill } from "react-icons/pi";
import { PiToggleRightFill } from "react-icons/pi";
import { createSaleUser, deleteSaleUser, getAllCities, getSalesPersons, updateSaleUser, updateSaleUserStatus, uploadFile } from '../../APIS';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { Loader } from "../common/loader";
import { useSelector } from "react-redux";
import { HiDotsVertical } from "react-icons/hi";
import { checkAuthError } from '../../utils';
import * as yup from "yup";
import { Form, Formik } from "formik";
import { Input } from '../common/input';
import { Select } from '../common/select';
import { Textarea } from '../common/textArea';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const LIMIT = 10;
const Sales = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [sales, setSales] = useState([]);
  const token = useSelector((state) => state.admin.token);
  const [cities, setCities] = useState({
    isLoaded: false,
    data: [],
  });
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log('Clicked outside');
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log('Outside click detected');
        setShowDropdown(null); // Adjust this if needed to match your state logic
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [isFormVisible, setFormVisible] = useState(false);
  const [newSalesPerson, setNewSalesPerson] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    image: "",
    cnic: "",
    city: ""
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    cnic: yup.string().required(),
    password: yup.string().min(6).required(),
    phone: yup.string().required(),
  });

  useEffect(() => {
    getSalesPersons(currentPage, LIMIT).then((res) => {
      setSales(res.data.data);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      })
  }, [currentPage]);

  const changeHandler = async (key, value) => {
    setNewSalesPerson((p) => ({
      ...p,
      [key]: value,
    }));
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (newSalesPerson.id.length) {
        await updateSaleUser(
          {
            ...values,
            image: newSalesPerson.image,
          },
          token
        );
      } else {
        await createSaleUser(
          {
            ...values,
            image: newSalesPerson.image,
          },
          token
        );
      }
      getSalesPersons(currentPage, LIMIT).then((res) => {
        setSales(res.data.data);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        })
      setLoading(false);
      setFormVisible(false);
      clearForm();
    } catch (error) {
      setLoading(false);
      checkAuthError(error);
      toast.error(error.response?.data?.errors[0]?.msg);
    }
  };

  // Function to handle row click
  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const fileUploadHandler = async (e) => {
    if (!e.target.files[0]) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await uploadFile(formData);
      const url = res.data.data;
      setNewSalesPerson((p) => ({
        ...p,
        image: url,
      }));

      setLoading(false);
    } catch (error) {
      checkAuthError(error);
      toast.error(error.message);
    }
  };
  const updateDataHandler = async (check, name, item) => {
    try {
      setLoading(true);
      await updateSaleUserStatus(
        {
          ...item,
          id: item._id,
          [name]: check
        },
        token
      );
      getSalesPersons(currentPage, LIMIT).then((res) => {
        setSales(res.data.data);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        })
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to prevent row click when clicking on checkbox
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };

  const deleteHandler = async (id) => {
    const c = window.confirm("Are you sure to delete?");
    if (!c) return;
    try {
      setLoading(true);
      await deleteSaleUser(id, token);
      setLoading(false);
    } catch (error) {
      checkAuthError(error);
      toast.error(error.message);
    }
  };
  const clearForm = () => {
    setNewSalesPerson({
      id: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      image: "",
      cnic: "",
      city: ""
    });
  };

  const addHandler = async () => {
    if (!cities.isLoaded) {
      const res = await getAllCities();
      setCities({
        isLoaded: true,
        data: res.data.data,
      });
    }
    clearForm();
    setFormVisible(true);
  };

  const editHandler = async (item) => {
    if (!cities.isLoaded) {
      const res = await getAllCities();
      setCities({
        isLoaded: true,
        data: res.data.data,
      });
    }
    setNewSalesPerson({
      id: item._id,
      name: item.name,
      email: item.email,
      password: item.password,
      phone: item.phone,
      address: item.address,
      image: item.image,
      cnic: item.cnic,
      city: item.city?._id
    });
    setFormVisible(true);
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log('Clicked outside');
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log('Outside click detected');
        setShowDropdown(null); // Adjust this if needed to match your state logic
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) return <Loader />

  return (
    <div className='relative'>
      <User />
      <div className='flex justify-between items-center mt-3'>
        <h1 className='text-xl font-bold'>Sales Person</h1>
        <div className='flex gap-7'>
          <img src="/Search.svg" alt="search" className='' />
          <input className='p-2 outline-none ml-[-30px]' type="search" name="search" id="" placeholder='Search by name, role...' />
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
          <button className='bg-[#FFD7CE] text-[#FF5934] p-2 md:text-base text-nowrap rounded' onClick={addHandler}>+ Add Sales person</button>
        </div>
      </div>
      <div className='mt-3'>
        <table className='w-full'>
          <thead>
            <tr className='text-left text-gray-500 '>
              <td>Name</td>
              <td>Phone no</td>
              <td>CNIC</td>
              <td>Earning</td>
              <td>Active</td>
              <td>Admin Verified</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {sales.map((data, index) => (
              <tr
                key={index}
                className='border-b cursor-pointer'
              >
                <td className='flex items-center gap-2 p-2' onClick={() => handleRowClick(data)}>
                  <input
                    type="checkbox"
                    className='h-5 w-5 rounded-full accent-black'
                    onClick={handleCheckboxClick}
                  />
  

                  <img src={data.image} alt="" className='w-8 h-8 rounded-full' />
                  <div>
                    <h1 className='font-bold'>{data.name}</h1>
                    <h3 className='text-sm text-gray-400'>{data.email}</h3>
                  </div>
                </td>
                <td className='p-2'>{data.phone}</td>
                <td className='p-2'>{data.cnic}</td>
                <td className='p-2'>{0}</td>
                <td
                  className='p-2 text-2xl cursor-pointer'
                  onClick={() => updateDataHandler(!data.isActive, "isActive", data)}
                >
                  {data.isActive ? (
                    <PiToggleRightFill className='text-green-500' />
                  ) : (
                    <PiToggleLeftFill className='text-gray-400' />
                  )}
                </td>

                <td
                  className='p-2 text-2xl'
                  onClick={() => updateDataHandler(!data.isAdminVerified, "isAdminVerified", data)}
                >
                  {data.isAdminVerified ? <PiToggleRightFill className='text-green-500' /> : <PiToggleLeftFill className='text-gray-400' />}
                </td>
                <td>

                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        onClick={() => setShowDropdown(prev => prev === data._id ? "" : data._id)}
                      >
                        <HiDotsVertical />
                      </button>
                    </div>

                    <div
                      ref={dropdownRef}
                      className={`${showDropdown === data._id ? "block" : "hidden"
                        } p-2 z-10 origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-slate-100 ring-1 ring-black ring-opacity-5`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="dropdownButton"
                    >
                      <div className="flex flex-col gap-2 justify-center items-start" role="none">
                        <li className="list-none hover:bg-[#FFD7CE] font-bold rounded w-full p-2">
                          <button
                            className="btn btn-light"
                            onClick={() => {
                              deleteHandler(data._id);
                              setShowDropdown("");
                            }}
                          >
                            Delete
                          </button>
                        </li>
                        <li className="list-none hover:bg-[#FFD7CE] font-bold rounded w-full p-2">
                          <button
                            className="btn btn-light"
                            onClick={() => {
                              editHandler(data);
                              setShowDropdown("");
                            }}
                          >
                            Edit
                          </button>
                        </li>
                      </div>
                    </div>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="pagination-container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          maxWidth: "150px",
          margin: 0,
        }}
      >
        <button
          className="flex items-center bg-[#FF5934] text-white mt-4 p-2 rounded-lg "
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage((p) => p - 1);
          }}
        >
          <GrFormPrevious className='text-white' />
        </button>
        <div
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <span className='mt-4'> {currentPage}</span> <span className='mt-4'>/</span>
          <span className='mt-4'> {totalPages}</span>
        </div>
        <button
          className="flex items-center mt-4 bg-[#FF5934] text-white p-2 rounded-lg "
          onClick={() => {
            setCurrentPage((p) => p + 1);
          }}
          disabled={totalPages <= currentPage}
        >
          <GrFormNext className='text-white' />

        </button>
      </div>


      {isFormVisible && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white w-[35%] p-6 mt-5 mb-5 rounded'>
            <h2 className='text-xl font-bold mb-4'>Add Sales Person</h2>
            <Formik
              initialValues={newSalesPerson}
              validationSchema={validations}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form style={{ maxHeight: "550px" }} className='overflow-x-hidden'>
                  <div className='flex flex-col justify-center items-center'>
                    <img
                      width="150px"
                      style={{ borderRadius: "5px", height: "100px" }}
                      className='mb-2'
                      src={newSalesPerson.image ? newSalesPerson.image : "/Avatar.svg"}
                      alt={newSalesPerson.name}
                    />
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={fileUploadHandler}
                      className='border p-2 mt-4 ml-28'
                    />
                  </div>
                  <Input
                    name="name"
                    label="Name"
                    placeholder="Name"
                    value={newSalesPerson.name}
                    changeHandler={changeHandler}
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    label="Email"
                    value={newSalesPerson.email}
                    changeHandler={changeHandler}
                  />
                  {
                    !newSalesPerson.id && (
                      <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        label="Password"
                        value={newSalesPerson.password}
                        changeHandler={changeHandler}
                      />
                    )
                  }
                  <Textarea
                    name="address"
                    placeholder="Address"
                    label="Address"
                    value={newSalesPerson.address}
                    changeHandler={changeHandler}
                  />
                  <Input
                    name="phone"
                    placeholder="phone"
                    label="Phone"
                    value={newSalesPerson.phone}
                    changeHandler={changeHandler}
                  />
                  <Input
                    name="cnic"
                    placeholder="CNIC"
                    label="CNIC"
                    value={newSalesPerson.cnic}
                    changeHandler={changeHandler}
                  />
                  <Select
                    name="city"
                    label="City"
                    data={cities.data}
                    searchKey="_id"
                    searchValue="name"
                    value={newSalesPerson.city}
                    changeHandler={changeHandler}
                  />
                  <div className='flex justify-center gap-4 mt-3'>
                    <div onClick={() => setFormVisible(false)} className='bg-gray-300 flex justify-center items-center w-28 p-2 rounded'>Cancel</div>
                    <button type="submit" className='bg-[#FF5934] w-28 text-white p-2 rounded'>Save</button>
                  </div>
                </Form>
              )}
            </Formik>
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

export default Sales;
