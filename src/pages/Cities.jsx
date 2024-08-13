import { useEffect, useRef, useState } from 'react';
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";
import useSWR from "swr";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { toast } from "react-toastify";
import {
  createCity,
  deleteCity,
  getCities,
  updateCity,
  updateCityStatus
} from "../APIS";
import { useSelector } from "react-redux";
import { FcPrevious, FcNext } from "react-icons/fc";
import { checkAuthError } from "../utils";
import { HiDotsVertical } from "react-icons/hi";
import { Loader } from '../components/common/loader';
import { Input } from '../components/common/input';

const LIMIT = 10;
const Cities = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    id: "",
    name: ""
  });

  const { data, mutate, error } = useSWR("/getCities", () =>
    getCities(currentPage, LIMIT)
  );
  const token = useSelector((state) => state.admin.token);

  const validations = yup.object().shape({
    name: yup.string().required(),
  });

  const clearForm = () => {
    setState({
      id: "",
      name: ""
    });
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changeHandler = async (key, value) => {
    setState((p) => ({
      ...p,
      [key]: value,
    }));
  };
  
  const deleteHandler = async (id) => {
    const c = window.confirm("Are you sure to delete?");
    if (!c) return;
    try {
      setLoading(true);
      await deleteCity(id, token);
      setLoading(false);
      mutate();
      setShow(false);
    } catch (error) {
      checkAuthError(error);
      toast.error(error.message);
    }
  };
  
  const updateDataHandler = async (checked, name, item) => {
    try {
      setLoading(true);
      await updateCityStatus(
        {
          ...item,
          id: item._id,
          [name]: checked
        },
        token
      );
      setLoading(false);
      mutate();
      setShow(false);
      clearForm();
    } catch (error) {
      checkAuthError(error);
      toast.error(error.message);
    }
  };
  
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (state.id.length) {
        await updateCity(
          {
            ...values
          },
          token
        );
      } else {
        await createCity(
          {
            ...values
          },
          token
        );
      }
      setLoading(false);
      mutate();
      setShow(false);
      clearForm();
    } catch (error) {
      checkAuthError(error);
      toast.error(error.message);
    }
  };

  const editHandler = async (item) => {
    setShow(true);
    setState({
      id: item._id,
      name: item.name
    });
  };
  
  const addHandler = async () => {
    clearForm();
    setShow(true);
  };
  
  if (error) {
    alert(error.message);
    return <></>;
  }
  
  if (!data || loading) return <Loader />;
  
  return (
    <div className='relative'>
      <div className='flex justify-between items-center mt-3'>
        <h1 className='text-xl font-bold'>Cities</h1>
        <div className='flex gap-7'>
          <img src="Search.svg" className='mr-[-20px]' alt="" />
          <input className='p-2 border outline-none' type='search' name='search' placeholder='Search by title, id...' />
          <button className='bg-[#FFD7CE] text-[#FF5934] p-2 rounded' onClick={addHandler}>
            + Add City
          </button>
        </div>
      </div>
      <div className='mt-3'>
        <table className='w-full'>
          <thead>
            <tr className='text-left  text-gray-500'>
              <td>ID</td>
              <td>Name</td>
              <td>Created Date</td>
              <td>Active</td>
              <td>Admin Verified</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {data?.data?.data?.map((product, index) => (
              <tr key={index} className='border-b cursor-pointer'>
                <td className='p-2'>#{product._id.substr(0, 5)}</td>
                <td className='p-2' onClick={() => setSelectedProduct(product)}>{product.name}</td>
                <td className='p-2'>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td className='p-2 text-2xl' onClick={() => updateDataHandler(!product.isActive, "isActive", product)}>{product.isActive ? <PiToggleRightFill className='text-green-500'/> : <PiToggleLeftFill className='text-gray-400' />}</td>
                <td className='p-2 text-2xl' onClick={() => updateDataHandler(!product.adminVerified, "adminVerified", product)}>{product.adminVerified ? <PiToggleRightFill className='text-green-500'/> : <PiToggleLeftFill className='text-gray-400' />}</td>
                <td>

                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        onClick={() => setShowDropdown(prev => prev === product._id ? "" : product._id)}
                      >
                        <HiDotsVertical />
                      </button>
                    </div>

                    <div
                      ref={dropdownRef}
                      className={`${showDropdown === product._id ? "block" : "hidden"
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
                              deleteHandler(product._id);
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
                              editHandler(product);
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
          className="flex items-center  bg-[#FF5934] text-white p-2 rounded-lg "
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
          <span> {currentPage}</span> <span>/</span>
          <span> {data.data.totalPages}</span>
        </div>
        <button
          className="flex items-center  bg-[#FF5934] text-white p-2 rounded-lg "
          onClick={() => {
            setCurrentPage((p) => p + 1);
          }}
          disabled={data.data.totalPages <= currentPage}
        >
          <GrFormNext className='text-white' />
        </button>
      </div>

      {show && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white w-[35%] max-h-[80vh] overflow-auto p-6 mt-5 mb-5 rounded'>
            <div className='flex justify-between'>
              <h1 className='font-bold text-3xl'>{state?.id.length ? "Edit City" : "Add City"}</h1>
              <button
                onClick={() => setShow(false)}
                className='text-xl p-2 bg-gray-100'
              >
                X
              </button>
            </div>
            <Formik
              enableReinitialize={true}
              initialValues={state}
              validationSchema={validations}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form className='flex flex-col gap-5'>
                  <Input
                    value={props.values.name}
                    onChange={(e) => {
                      props.handleChange(e);
                      changeHandler(e.target.name, e.target.value);
                    }}
                    name='name'
                    id='name'
                    placeholder='City Name'
                  />
                  <div className='flex justify-end gap-5'>
                    <button
                      onClick={() => setShow(false)}
                      type='button'
                      className='p-2 bg-gray-100 rounded-lg'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='p-2 bg-[#FF5934] rounded-lg text-white'
                    >
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cities;
