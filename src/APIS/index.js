import axios from "axios";
import { SERVER_URL } from "../utils";

export const uploadFile = async (data) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/image/upload",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };
  return await axios.request(config);
};
export const loginAdmin = async (data) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/admin/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
};
export const getAllCities = async () => {
  let config = {
    method: "get",
    url: SERVER_URL + `/city`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const getCities = async (currentPage, limit) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/city/pagination?page=${currentPage}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};

export const createCity = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/city/add",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
};
export const updateCityStatus = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/city/update/status/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};
export const updateCity = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/city/update/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};
export const deleteCity = async (id, token) => {
  let config = {
    method: "delete",
    url: SERVER_URL + "/city/delete/" + id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const getAllCategories = async () => {
  let config = {
    method: "get",
    url: SERVER_URL + `/category`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const getDeletedCategories = async (currentPage, limit) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/category/deleted?page=${currentPage}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const getCategories = async (currentPage, limit) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/category/pagination?page=${currentPage}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const createCategory = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/category/add",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
};
export const updateCategory = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/category/update/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};
export const updateCategoryStatus = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/category/update/status/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};
export const deleteCategory = async (id, token) => {
  let config = {
    method: "delete",
    url: SERVER_URL + "/category/delete/" + id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const getDashboardData = async () => {
  let config = {
    method: "get",
    url: SERVER_URL + `/admin/dashboard`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const getAlBrands = async () => {
  let config = {
    method: "get",
    url: SERVER_URL + `/brand`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const getBrands = async (currentPage, limit) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/brand/pagination?page=${currentPage}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const getCategoryBrands = async (category) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/brand/category/` + category,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const updateBrandStatus = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/brand/update/status/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};
export const createBrand = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/brand/add",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
};
export const updateBrand = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/brand/update/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};
export const deleteBrand = async (id, token) => {
  let config = {
    method: "delete",
    url: SERVER_URL + "/brand/delete/" + id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};

export const getSetting = async (token) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/setting`,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};

export const addSetting = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + `/setting/add`,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
};
export const getPlansRequests = async () => {
  let config = {
    method: "get",
    url: SERVER_URL + `/planrequest`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const getVendorPlansRequests = async (id) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/planrequest/` + id,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const updateReadNotificationStatus = async (id, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + `/notification/update/read/` + id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const getAdminNotifications = async () => {
  let config = {
    method: "get",
    url: SERVER_URL + `/notification/admin`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};

export const processRequest = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + `/planrequest/process/` + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ vendorId: data.vendorId }),
  };
  return await axios.request(config);
};


export const getBanners = async (currentPage, limit) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/banner/pagination?page=${currentPage}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};

export const updateBanner = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + `/banner/update/` + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
};
export const addBanner = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + `/banner/add`,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
};
export const deleteBanner = async (id, token) => {
  let config = {
    method: "delete",
    url: SERVER_URL + `/banner/delete/` + id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};



export const getSalesPersons = async (currentPage, limit) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/sale-user/pagination?page=${currentPage}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const createSaleUser = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/sale-user/register",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
};
export const updateSaleUser = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/sale-user/update/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};
export const deleteSaleUser = async (id, token) => {
  let config = {
    method: "delete",
    url: SERVER_URL + "/sale-user/delete/" + id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};

export const updateSaleUserStatus = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/sale-user/update/status/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};


export const getWarehouseManagers = async (currentPage, limit) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/warehouse-manager/pagination?page=${currentPage}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const createWarehouseManager = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/warehouse-manager/register",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
};
export const updateWarehouseManager = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/warehouse-manager/update/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};
export const deleteWarehouseManagers = async (id, token) => {
  let config = {
    method: "delete",
    url: SERVER_URL + "/warehouse-manager/delete/" + id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};

export const updateWarehouseManagerStatus = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/warehouse-manager/update/status/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};

export const getRetailers = async (currentPage, limit) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/retailer/pagination?page=${currentPage}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const createRetialer = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/retailer/add",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
};
export const updateRetialer = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/retailer/update/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};
export const deleteRetialer = async (id, token) => {
  let config = {
    method: "delete",
    url: SERVER_URL + "/retailer/delete/" + id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};

export const updateRetialerStatus = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/retailer/update/status/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};

export const getSettings = async () => {
  let config = {
    method: "get",
    url: SERVER_URL + `/setting`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};

export const updateSettings = async (data) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/setting/add",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
}
export const updateBannerStatus = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/banner/update/status/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
}


export const getProducts = async (currentPage, limit) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/product/pagination?page=${currentPage}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};
export const updateProductStatus = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/product/update/status/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};
export const createProduct = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/product/add",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return await axios.request(config);
};
export const updateProduct = async (data, token) => {
  let config = {
    method: "post",
    url: SERVER_URL + "/product/update/" + data.id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  return await axios.request(config);
};
export const deleteProduct = async (id, token) => {
  let config = {
    method: "delete",
    url: SERVER_URL + "/product/delete/" + id,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};

export const getOrders = async (currentPage, limit) => {
  let config = {
    method: "get",
    url: SERVER_URL + `/order/pagination?page=${currentPage}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.request(config);
};