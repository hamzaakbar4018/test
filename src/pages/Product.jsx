import { useEffect, useRef, useState } from 'react';
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";
import useSWR from "swr";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from "react-toastify";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getAllCategories,
  uploadFile,
  getAllCities,
  getAlBrands,
  updateProductStatus,
} from "../APIS";
import { useSelector } from "react-redux";
import { checkAuthError } from "../utils";
import { HiDotsVertical } from "react-icons/hi";
import { Loader } from '../components/common/loader';
import { Input } from '../components/common/input';
import { Select } from '../components/common/select';
import { Textarea } from '../components/common/textArea';
import '../CSS/Login.css'
const LIMIT = 10;
const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stock, setStock] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState("");
  const [fileUpload, setFileUpload] = useState(false);
  const [categories, setCategories] = useState({
    isLoaded: false,
    data: [],
  });
  const [brands, setBrands] = useState({
    isLoaded: false,
    data: [],
  });
  const [cities, setCities] = useState({
    isLoaded: false,
    data: [],
  });
  const [packing, setPacking] = useState({
    size: "",
    price: 0,
  });
  const [bulkOrder, setBulkOrder] = useState({
    quantity: "",
    amount: 0,
  });
  const [state, setState] = useState({
    id: "",
    urduTitle: "",
    englishTitle: "",
    urduDescription: "",
    englishDescription: "",
    image: "",
    categoryID: "",
    cityID: "",
    brandID: "",
    packings: [],
    bulkOrders: [],
    discountType: "Percentage",
    discount: 0,
    price: 0,
    stock: 0,
    includeBulkOrder: false,
    isDiscounted: false,
    includePacking: false,
  });
  const { data, mutate, error } = useSWR("/getProducts", () =>
    getProducts(currentPage, LIMIT)
  );
  const token = useSelector((state) => state.admin.token);

  const validations = yup.object().shape({
    brandID: yup.string().required(),
    categoryID: yup.string().required(),
    cityID: yup.string().required(),
    stock: yup.number().min(1).required(),
    price: yup.number().min(1).required(),
    englishDescription: yup.string().required(),
    urduDescription: yup.string().required(),
    urduTitle: yup.string().required(),
    englishTitle: yup.string().required(),
  });

  const clearForm = () => {
    setState({
      id: "",
      urduTitle: "",
      englishTitle: "",
      urduDescription: "",
      englishDescription: "",
      image: "",
      categoryID: "",
      cityID: "",
      brandID: "",
      packings: [],
      bulkOrders: [],
      discountType: "",
      discount: 0,
      price: 0,
      stock: 0,
      includeBulkOrder: false,
      isDiscounted: false,
      includePacking: false,
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
  const packingHandler = () => {
    if (packing.price <= 0 || !packing.size.length) {
      return toast.error("All fields are required");
    }
    const c = [...state.packings];
    c.push(packing);
    setState((p) => ({
      ...p,
      packings: c
    }));
    toast.success("Added");
    setPacking({
      price: 0,
      size: ""
    })
  }
  const bulkOrderHandler = () => {
    if (bulkOrder.amount <= 0 || !bulkOrder.quantity.length) {
      return toast.error("All fields are required");
    }
    const c = [...state.bulkOrders];
    c.push(bulkOrder);
    setState((p) => ({
      ...p,
      bulkOrders: c
    }));
    toast.success("Added");
    setBulkOrder({
      amount: 0,
      quantity: ""
    })
  }

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
      await deleteProduct(id, token);
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
        await updateProduct(
          {
            ...values,
            image: state.image,
            packings: state.packings,
            bulkOrders: state.bulkOrders,
            discount: state.discount,
            discountType: state.discountType,
            isDiscounted: state.isDiscounted,
            includePacking: state.includePacking,
            includeBulkOrder: state.includeBulkOrder,
          },
          token
        );
      } else {
        await createProduct(
          {
            ...values,
            image: state.image,
            packings: state.packings,
            bulkOrders: state.bulkOrders,
            discount: state.discount,
            discountType: state.discountType,
            isDiscounted: state.isDiscounted,
            includePacking: state.includePacking,
            includeBulkOrder: state.includeBulkOrder,
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
  const handleUpdateStock = async (e) => {
    e.preventDefault();
    try {
      if (stock > 0) {
        setLoading(true);
        await updateProduct(
          {
            ...selectedProduct,
            id: selectedProduct._id,
            stock: stock,
            categoryID: selectedProduct.categoryID?._id,
            cityID: selectedProduct.cityID?._id,
            brandID: selectedProduct.brandID?._id,
          },
          token
        );

        setLoading(false);
        mutate();
        setSelectedProduct(null);
      }
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
      await updateProductStatus(
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
    console.log(item);

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
    if (!brands.isLoaded) {
      const res = await getAlBrands();
      setBrands({
        isLoaded: true,
        data: res.data.data,
      });
    }
    setShow(true);
    setState({
      id: item._id,
      englishTitle: item.englishTitle,
      urduTitle: item.urduTitle,
      urduDescription: item.urduDescription,
      englishDescription: item.englishDescription,
      price: item.price,
      stock: item.stock,
      discount: item.discount,
      discountType: item.discountType,
      isDiscounted: item.isDiscounted,
      packings: item.packings,
      includeBulkOrder: item.includeBulkOrder,
      bulkOrders: item.bulkOrders,
      includePacking: item.includePacking,
      image: item.image,
      brandID: item.brandID?._id,
      categoryID: item.categoryID?._id,
      cityID: item.cityID?._id,
    });
  };
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
    if (!brands.isLoaded) {
      const res = await getAlBrands();
      setBrands({
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
        <h1 className='text-xl font-bold'>Products</h1>
        <div className='md:mr-[-110px] md:block hidden w-10'>
          <img src="Search.svg" alt="" />
        </div>
        <div className='flex gap-7 justify-center items-center'>
          <input
            className='p-2 border outline-none  w-28'
            type='search'
            name='search'
            placeholder='Search...'
          />
          <select className='border p-2'>
            <option value=''>City</option>
            <option value='Islamabad'>Islamabad</option>
            <option value='Karachi'>Karachi</option>
            <option value='Lahore'>Lahore</option>
          </select>
          <select className='border p-2'>
            <option value=''>Brand</option>
            <option value='Neon'>Nike</option>
            <option value='xyz'>J.</option>
          </select>
          <select className='border p-2'>
            <option value=''>Status</option>
            <option value='Single'>Single</option>
            <option value='Married'>Married</option>
          </select>
          <select className='border p-2'>
            <option value=''>Category</option>
            <option value='Wheat'>Shirts</option>
            <option value='Flour'>Jackets</option>
          </select>
          <button
            className='bg-[#FFD7CE] text-[#FF5934] text-nowrap p-2 rounded'
            onClick={addHandler}
          >
            + Add Product
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
              <td>Brand</td>
              <td>Category</td>
              <td>Price</td>
              <td>In Stock</td>
              <td>Active</td>
              <td>Admin Verified</td>
            </tr>
          </thead>
          <tbody>
            {data.data?.data.map((product, index) => (
              <tr
                key={index}
                className='border-b cursor-pointer'
              >
                <td className='p-2' onClick={() => setSelectedProduct(product)}>
                  <img src={product.image} alt='Product' className='w-16 h-16 object-cover rounded-full' />
                </td>
                <td className='p-2'>{product.englishTitle}</td>
                <td className='urdu text-sm'>{product.urduTitle}</td>
                <td className='p-2'>{product.brandID?.englishName}</td>
                <td className='p-2'>{product.categoryID?.englishName}</td>
                <td className='p-2'>{product.price}</td>
                <td className='p-2'>
                  <div className='flex flex-col text-sm items-center justify-center '>
                    {product.stock}
                    <button
                      onClick={() => {
                        setStock(product.stock);
                        setSelectedProduct(product);
                      }}
                      className='text-[#FF5934] p-1 rounded'
                    >
                      Update
                    </button>
                  </div>
                </td>
                <td className='p-2 text-2xl' onClick={() => updateDataHandler(!product.isActive, "isActive", product)}>{product.isActive ? <PiToggleRightFill className='text-green-500' /> : <PiToggleLeftFill className='text-gray-400' />}</td>
                <td className='p-2 text-2xl' onClick={() => updateDataHandler(!product.adminVerified, "adminVerified", product)}>{product.adminVerified ? <PiToggleRightFill className='text-green-500' /> : <PiToggleLeftFill className='text-gray-400' />}</td>
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
          <div className='bg-white w-[45%] overflow-auto p-6 mt-5 mb-5 rounded'>
            <h2 className='text-xl font-bold mb-4'>{state.id.length ? 'Edit Product' : 'Add Product'}</h2>
            <Formik
              initialValues={state}
              validationSchema={validations}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form style={{ maxHeight: "550px" }} className='overflow-y-auto'>
                  {state.image && (
                    <img src={state.image} alt='Preview' className='w-56 h-48 rounded-full object-cover mb-4' />
                  )}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={fileUploadHandler}
                    className='border p-2'
                  />
                  <Input
                    name="englishTitle"
                    label="English Title"
                    placeholder="Title in english"
                    value={state.englishTitle}
                    changeHandler={changeHandler}
                  />
                  <Input
                    name="urduTitle"
                    placeholder="اردو میں عنوان"
                    label="Urdu Title"
                    value={state.urduTitle}
                    changeHandler={changeHandler}
                  />

                  <Input
                    name="price"
                    placeholder="Price"
                    label="Price"
                    type="number"
                    value={state.price}
                    changeHandler={changeHandler}
                  />
                  <Input
                    name="stock"
                    placeholder="Stock"
                    label="Stock"
                    type="number"
                    value={state.stock}
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
                    name="brandID"
                    label="Brand"
                    data={brands.data}
                    searchKey="_id"
                    searchValue="englishName"
                    value={state.brandID}
                    changeHandler={changeHandler}
                  />
                  <Textarea
                    name="englishDescription"
                    placeholder="English Description"
                    label="English Description"
                    value={state.englishDescription}
                    changeHandler={changeHandler}
                  />
                  <Textarea
                    name="urduDescription"
                    placeholder="اردو میں تفصیل"
                    label="Urdu Description"
                    value={state.urduDescription}
                    changeHandler={changeHandler}
                  />
                  <div className="flex items-center my-2 space-x-3 product-checkbox">
                    <input
                      className="form-checkbox h-5 w-5"
                      type="checkbox"
                      name="includePacking"
                      onChange={(e) => setState((p) => ({ ...p, includePacking: e.target.checked }))}
                      checked={state.includePacking}
                    />
                    <label className="text-gray-700" htmlFor="includePacking">Include Packings</label>
                  </div>
                  {
                    state.includePacking && (
                      <div className="my-2">
                        <div className="flex flex-wrap">
                          <div className="w-full md:w-1/3 p-2">
                            <input
                              className="form-input w-full"
                              placeholder="Size"
                              value={packing.size}
                              onChange={(e) =>
                                setPacking((p) => ({ ...p, size: e.target.value }))
                              }
                            />
                          </div>
                          <div className="w-full md:w-1/3 p-2">
                            <input
                              className="form-input w-full"
                              type="number"
                              placeholder="Price"
                              value={packing.price}
                              onChange={(e) =>
                                setPacking((p) => ({ ...p, price: e.target.value }))
                              }
                            />
                          </div>
                          <div
                            className="w-full md:w-1/6 p-2 flex items-center justify-center cursor-pointer"
                            onClick={packingHandler}
                          >
                            <CiCirclePlus className="text-2xl" />
                          </div>
                        </div>
                      </div>
                    )
                  }

                  {
                    state.packings.length ? (
                      <div className="flex items-center gap-2 my-2">
                        {state.packings.map((it) => (
                          <div
                            key={it.size}
                            className="max-w-[55px] bg-gray-300 p-2 m-0"
                          >
                            {it.size}
                          </div>
                        ))}
                      </div>
                    ) : <></>
                  }
                  <div className="form-check space-x-3 form-switch my-2 product-checkbox">
                    <input
                      className="form-checkbox h-5 w-5"
                      type="checkbox"
                      name="includeBulkOrder"
                      onChange={(e) => setState((p) => ({ ...p, includeBulkOrder: e.target.checked }))}
                      checked={state.includeBulkOrder}
                    />
                    <label className="form-check-label" htmlFor="includeBulkOrder">Include Bulk Order</label>
                  </div>
                  {
                    state.includeBulkOrder && (
                      <div className="my-2">
                        <div className="flex flex-wrap">
                          <div className="w-full md:w-1/3">
                            <input
                              className="form-input w-full"
                              placeholder="Quantity"
                              value={bulkOrder.quantity}
                              onChange={(e) => setBulkOrder((p) => ({ ...p, quantity: e.target.value }))}
                            />
                          </div>
                          <div className="w-full md:w-1/3">
                            <input
                              className="form-input w-full"
                              placeholder="Amount"
                              type="number"
                              value={bulkOrder.amount}
                              onChange={(e) => setBulkOrder((p) => ({ ...p, amount: e.target.value }))}
                            />
                          </div>
                          <div className="w-full md:w-1/6 flex justify-center items-center" onClick={bulkOrderHandler}>
                            <CiCirclePlus style={{ fontSize: "30px", cursor: "pointer" }} />
                          </div>
                        </div>
                      </div>
                    )
                  }
                  {
                    state.bulkOrders.length ? (
                      <div className="flex items-center gap-2 my-3">
                        {state.bulkOrders.map((it) => (
                          <div
                            key={it.quantity}
                            style={{ maxWidth: '150px', backgroundColor: "rgb(227 223 223)" }}
                            className="card p-2"
                          >
                            <div className="flex flex-col">
                              <span>
                                {"> " + it.quantity}
                              </span>
                              <strong>
                                {it.amount}
                              </strong>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
                  <div className="form-check space-x-3 form-switch my-2 product-checkbox">
                    <input
                      className="form-checkbox h-5 w-5"
                      type="checkbox"
                      name="isDiscounted"
                      onChange={(e) => setState((p) => ({ ...p, isDiscounted: e.target.checked }))}
                      checked={state.isDiscounted}
                    />
                    <label className="form-check-label" htmlFor="isDiscounted">Apply Discount</label>
                  </div>
                  {
                    state.isDiscounted && (
                      <div className="my-2">
                        <div className="flex flex-wrap">
                          <div className="w-full md:w-1/3">
                            <input
                              className="form-input w-full"
                              placeholder="Discount"
                              type="number"
                              value={state.discount}
                              onChange={(e) => setState((p) => ({ ...p, discount: e.target.value }))}
                            />
                          </div>
                          <div className="w-full md:w-1/3">
                            <select
                              className="form-select w-full"
                              value={state.discountType}
                              onChange={(e) => setState((p) => ({ ...p, discountType: e.target.value }))}
                            >
                              {["Percentage", "Price"].map((it) => (
                                <option key={it} value={it}>
                                  {it}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  <div className='flex justify-center gap-4 mt-3'>
                    <div onClick={() => setShow(false)} className='bg-gray-300 w-28 p-2 rounded'>
                      <button>Cancel</button>
                    </div>
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
          <div className=''>
            <div className='flex flex-col justify-center items-center'>
              <h2 className='text-xl font-bold mb-4'>Product Details</h2>
              <img
                src={selectedProduct.image}
                alt='Product'
                className='w-32 h-32 rounded-full mb-4'
              />
            </div>
            <div className='flex justify-between'>
              <div className='mb-2 font-bold flex flex-col'>
                <div>{selectedProduct.titleEn}</div>
                <div>{selectedProduct.titleUr}</div>
              </div>
              <div className='mb-2 ml-32 flex justify-end text-[#FF5934] items-center'>
                {selectedProduct.price} RS
              </div>
            </div>
            <div className='mb-2 flex py-4 justify-start'>
              <strong>Brand:</strong> {selectedProduct.brand}
            </div>
            <div className='mb-2'>
              {selectedProduct.descriptionEn}
            </div>
            <div className='mb-2 border-b-2 w-full '>
              {selectedProduct.descriptionUr}
            </div>
            <div className='mb-2'>
              <strong>Color:</strong> {selectedProduct.color}
            </div>
            <div className='mb-2'>
              <strong>Packing:</strong> {selectedProduct.packing}
            </div>
            <div className='mb-2'>
              <strong>Category:</strong> {selectedProduct.category}
            </div>
            <div className='mb-2'>
              <strong>In Stock:</strong>
              <input
                type='number'
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
                className='border p-1 ml-2'
              />
              <button
                onClick={handleUpdateStock}
                className='bg-blue-500 text-white p-1 ml-2 rounded'
              >
                Update
              </button>
            </div>
            <div className='flex justify-between px-4 items-center'>
              <button
                onClick={() => setSelectedProduct(null)}
                className='bg-gray-300 p-2 rounded mt-4'
              >
                Close
              </button>
              <button
                onClick={() => {
                  editHandler(selectedProduct);
                  setSelectedProduct(null);
                }}
                className='bg-[#FF5934] text-white p-2 ml-[30px] rounded mt-4'
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
