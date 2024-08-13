import { useEffect, useRef, useState } from 'react';
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";
import useSWR from "swr";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { toast } from "react-toastify";
import {
  createBrand,
  deleteBrand,
  getBrands,
  updateBrand,
  getAllCategories,
  uploadFile,
  getAllCities,
  updateBrandStatus,
} from "../APIS";
import { useSelector } from "react-redux";
import { FcPrevious, FcNext } from "react-icons/fc";
import { checkAuthError } from "../utils";
import { HiDotsVertical } from "react-icons/hi";
import { Loader } from '../components/common/loader';
import { Input } from '../components/common/input';
import { Select } from '../components/common/select';

const LIMIT = 10;
const Brands = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [categories, setCategories] = useState({
    isLoaded: false,
    data: [],
  });
  const [cities, setCities] = useState({
    isLoaded: false,
    data: [],
  });
  const [state, setState] = useState({
    id: "",
    englishName: "",
    urduName: "",
    image: "",
    categoryID: "",
    cityID: "",
    comission: 0,
  });
  const { data, mutate, error } = useSWR("/getBrands", () =>
    getBrands(currentPage, LIMIT)
  );
  const token = useSelector((state) => state.admin.token);

  const validations = yup.object().shape({
    englishName: yup.string().required(),
    urduName: yup.string().required(),
    categoryID: yup.string().required(),
    cityID: yup.string().required(),
    comission: yup.number().min(1).required(),
  });

  const clearForm = () => {
    setState({
      id: "",
      englishName: "",
      urduName: "",
      image: "",
      comission: 0,
      categoryID: "",
      cityID: "",
    });
  };

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
      await deleteBrand(id, token);
      setLoading(false);
      mutate();
      setShow(false);
    } catch (error) {
      checkAuthError(error);
      toast.error(error.message);
    }
  };
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (state.id.length) {
        await updateBrand(
          {
            ...values,
            image: state.image,
          },
          token
        );
      } else {
        await createBrand(
          {
            ...values,
            image: state.image,
          },
          token
        );
      }
      setLoading(false);
      mutate();
      setShow(false);
      clearForm();
    } catch (error) {
      setLoading(false);
      checkAuthError(error);
      toast.error(error.response?.data?.errors[0]?.msg);
    }
  };
  const fileUploadHandler = async (e) => {
    if (!e.target.files[0]) return;
    try {
      setFileUpload(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await uploadFile(formData);
      const url = res.data.data;
      setState((p) => ({
        ...p,
        image: url,
      }));

      setFileUpload(false);
    } catch (error) {
      checkAuthError(error);
      toast.error(error.message);
    }
  };
  const updateDataHandler = async (checked, name, item) => {
    try {
      setLoading(true);
      await updateBrandStatus(
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
  const editHandler = async (item) => {
    if (!categories.isLoaded) {
      const res = await getAllCategories();
      setCategories({
        isLoaded: true,
        data: res.data.data,
      });
    }
    if (!cities.isLoaded) {
      const res = await getAllCities();
      setCities({
        isLoaded: true,
        data: res.data.data,
      });
    }
    setShow(true);
    setState({
      id: item._id,
      urduName: item.urduName,
      englishName: item.englishName,
      image: item.image,
      comission: item.comission,
      categoryID: item.categoryID?._id,
      cityID: item.cityID?._id,
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const addHandler = async () => {
    if (!categories.isLoaded) {
      const res = await getAllCategories();
      setCategories({
        isLoaded: true,
        data: res.data.data,
      });
    }
    if (!cities.isLoaded) {
      const res = await getAllCities();
      setCities({
        isLoaded: true,
        data: res.data.data,
      });
    }
    clearForm();
    setShow(true);
  };

  if (error) {
    checkAuthError(error);
    alert(error.message);
    return <></>;
  }
  if (!data || loading || fileUpload) return <Loader />;
  return (
    <div className='relative'>
      <div className='flex justify-between items-center mt-3'>
        <h1 className='text-xl font-bold'>Brands</h1>
        <div className='flex gap-7'>
          <img src="Search.svg" className='mr-[-20px]' alt="" />
          <input className='p-2 border outline-none' type='search' name='search' placeholder='Search by name, id...' />
          <button className='bg-[#FFD7CE] text-[#FF5934] p-2 rounded' onClick={addHandler}>
            + Add Brand
          </button>
        </div>
      </div>
      <div className='mt-3'>
        <table className='w-full'>
          <thead>
            <tr className='text-left  text-gray-500 '>
              <td>Image</td>
              <td>Title (EN)</td>
              <td>Title (UR)</td>
              <td>ID</td>
              <td>Commision (%)</td>
              <td>Created On</td>
              <td>Active</td>
              <td>Admin Verified</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {data.data?.data.map((product, index) => (
              <tr key={index} className='border-b cursor-pointer'>
                <td className='p-2' onClick={() => setSelectedProduct(product)}>
                  <img src={product.image} alt='Product' className='w-16 h-16 object-cover rounded-full' />
                </td>
                <td className='p-2'>{product.englishName}</td>
                <td className='text-sm urdu'>{product.urduName}</td>
                <td className='p-2'>#{product._id.substr(0, 5)}</td>
                <td className='p-2'>{product.comission} %</td>
                <td className='p-2'>{new Date(product.createdAt).toLocaleDateString()} | <span>{new Date(product.createdAt).toLocaleTimeString()}</span></td>
                <td className='p-2 text-2xl' onClick={() => updateDataHandler(!product.isActive, "isActive", product)}>{product.isActive ? <PiToggleRightFill className='text-green-500' /> : <PiToggleLeftFill className='text-gray-400'  />}</td>
                <td className='p-2 text-2xl' onClick={() => updateDataHandler(!product.adminVerified, "adminVerified", product)}>{product.adminVerified ? <PiToggleRightFill className='text-green-500'/> : <PiToggleLeftFill className='text-gray-400' />}</td>
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
          className="flex items-center bg-[#FF5934] text-white p-2 rounded-lg "
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage((p) => p - 1);
          }}
        >
          <GrFormPrevious />

        </button>
        <div
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <span> {currentPage}</span> <span>/</span>
          <span> {data.data.totalPages}</span>
        </div>
        <button
          className="flex items-center bg-[#FF5934] text-white p-2 rounded-lg"
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
            <h2 className='text-xl font-bold mb-4'>Add Brand</h2>
            <Formik
              initialValues={state}
              validationSchema={validations}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form style={{ maxHeight: "550px" }} className='overflow-y-auto'>
                  {state.image && (
                    <img src={state.image} alt='Preview' className='w-20 h-20 rounded-full object-cover mb-4' />
                  )}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={fileUploadHandler}
                    className='border p-2'
                  />

                  <Input
                    name="englishName"
                    label="English Name"
                    placeholder="Name in english"
                    value={state.englishName}
                    changeHandler={changeHandler}
                  />
                  <Input
                    name="urduName"
                    placeholder="Name in urdu"
                    label="Urdu Name"
                    value={state.urduName}
                    changeHandler={changeHandler}
                  />
                  <Input
                    name="comission"
                    placeholder="Comission"
                    type="number"
                    label="Comission"
                    value={state.comission}
                    changeHandler={changeHandler}
                  />
                  <Select
                    name="categoryID"
                    label="Category"
                    data={categories.data}
                    searchKey="_id"
                    searchValue="englishName"
                    value={state.categoryID}
                    changeHandler={changeHandler}
                  />
                  <Select
                    name="cityID"
                    label="City"
                    data={cities.data}
                    searchKey="_id"
                    searchValue="name"
                    value={state.cityID}
                    changeHandler={changeHandler}
                  />
                  <div className='flex justify-center gap-4 mt-3'>
                    <div onClick={() => setShow(false)} className='bg-gray-300 w-28 p-2 rounded'>Cancel</div>
                    <button type="submit" className='bg-[#FF5934] w-28 text-white p-2 rounded'>Add</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[35%] bg-white p-4 shadow-lg transition-transform ${selectedProduct ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {selectedProduct && (
          <div className='flex flex-col justify-center items-center'>
            <h2 className='text-xl font-bold mb-4'>Brand Details</h2>
            <img src={selectedProduct.image} alt='Product' className='w-20 h-20 rounded-full mb-4' />
            <div className='mb-2'>
              <strong>Title (EN):</strong> {selectedProduct.titleEn}
            </div>
            <div className='mb-2'>
              <strong>Title (UR):</strong> {selectedProduct.titleUr}
            </div>
            <div className='mb-2'>
              <strong>ID:</strong> {selectedProduct.id}
            </div>
            <div className='mb-2'>
              <strong>Commission (%):</strong> {selectedProduct.comission}
            </div>
            <div className='mb-2'>
              <strong>Created on:</strong> {selectedProduct.createdOn}
            </div>
            <div className='mb-2'>
              <strong>Active:</strong> {selectedProduct.active ? 'Yes' : 'No'}
            </div>
            <div className='mb-2'>
              <strong>Admin Verified:</strong> {selectedProduct.adminVerify ? 'Yes' : 'No'}
            </div>
            <button onClick={() => setSelectedProduct(null)} className='bg-gray-300 p-2 rounded mt-4'>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
