import { useState } from 'react';
import useSWR from "swr";
import {
  getOrders
} from "../APIS";
import { FcPrevious, FcNext } from "react-icons/fc";
import { HiDotsVertical } from "react-icons/hi";
import { Loader } from '../components/common/loader';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
const LIMIT = 10;
const Order = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState("");
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { data, error } = useSWR("/getOrders", () =>
    getOrders(currentPage, LIMIT)
  );


  if (error) {
    alert(error.message);
    return <></>;
  }
  if (!data) return <Loader />;
  return (
    <div className='relative'>
      <div className='flex justify-between mt-3'>
        <h1 className='text-xl font-bold'>Orders</h1>
        <div className='flex gap-7'>
          <input
            className='p-2 border'
            type='search'
            name='search'
            placeholder='Search by name, id...'
          />
        </div>
      </div>
      <div className='my-4'>
        <table className='w-full'>
          <thead>
            <tr className='text-left  text-gray-500 '>
              <td>ID</td>
              <td>Retailer Name</td>
              <td>Date & Time</td>
              <td>Total Amount</td>
              <td>Status</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {data.data?.data.map((item, index) => (
              <tr
                key={index}
                className='border-b cursor-pointer'
              >
                <td className='p-2'>#{item._id.substr(0, 5)}</td>
                <td className='p-2'>{item.userId?.name}</td>
                <td className='p-2'>{new Date(item.createdAt).toLocaleDateString()} | <span style={{ color: "gray" }}>{new Date(item.createdAt).toLocaleTimeString()}</span></td>
                <td className='p-2'>{item.total} Rs</td>
                <td className='p-2'>Processing</td>
                <td className=''>
                  <div className="relative inline-block items-end text-left">
                    <div>
                      <button
                        onClick={() => setShowDropdown(showDropdown.length ? "" : item._id)}
                      >
                        <HiDotsVertical />
                      </button>
                    </div>

                    <div className={`${showDropdown === item._id ? "" : "hidden"} p-2 z-10 origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`} role="menu" aria-orientation="vertical" aria-labelledby="dropdownButton">
                      <div className="py-1" role="none">
                        <li className='list-none'>
                          <button
                            className="btn btn-light hover:bg-[#FFD7CE] w-full p-2 rounded font-bold"
                            onClick={() => {
                              setSelectedItem(item);
                              setShowDropdown("");
                              setShow(true);
                            }}
                          >
                            Details
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

      <div
        className={`fixed top-0 right-0 h-full md:w-[35%] bg-white p-4 shadow-lg transition-transform ${show ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {show && (
          <div className='flex flex-col justify-center'>
            <h2 className='text-xl font-bold mb-4'>Orders Details</h2>
            <div className='mb-2'>
              <h6>Order ID</h6>
              <div className='text-gray-400'>#{selectedItem?._id.substr(0, 5)}</div>
            </div>
            <div className='mb-2'>
              <h6>Number Of Items</h6>
              <div className='text-gray-400'>{selectedItem?.items.length}</div>
            </div>
            <div className='mb-2'>
              <h6>Phone Number</h6>
              <div className='text-gray-400'>{selectedItem?.phoneNumber}</div>
            </div>
            <div className='mb-2'>
              <h6>Delivery Address</h6>
              <div className='text-gray-400'>{selectedItem?.shippingAddress}</div>
            </div>
            <div className='mb-2'>
              <h6>Expected Delivery</h6>
              <div className='text-gray-400'>{new Date(selectedItem?.expectedDelivery).toLocaleString()}</div>
            </div>
            <h5>Items</h5>
            <ul className="list-none p-0">
              {selectedItem?.items?.map((item) => (
                <li
                  key={item.productId?._id}
                  className="flex items-center justify-between p-4 border-b border-gray-200"
                >
                  <div className="md:flex gap-4">
                    <div className='w-1/2'>
                      <img
                        src={item.productId?.image}
                        alt=""
                        width={50}
                        height={50}
                        className="rounded"
                      />
                    </div>
                    <div className='w-1/2'>
                      <h6 className="font-semibold">{item.productId?.englishTitle}</h6>
                      <p className="text-red-600">{item.price} Rs</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Quantity</p>
                    <p className="font-medium">{item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
            <hr />
            <div className="flex justify-between">
              <h6>Total</h6>
              <h6>{selectedItem?.total}</h6>
            </div>

            <button className='bg-[#FFD7CE] p-2 mt-3 rounded' onClick={() => setShow(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
