// export const SERVER_URL = "http://localhost:5000/api";
export const SERVER_URL = "http://54.153.208.108/api";

export const calculateRating = (reviews = [], key = "rating") => {
  const res =
    reviews.reduce((acc, current) => {
      return acc + current[key];
    }, 0) / reviews.length;
  return !Number.isNaN(res) ? res.toFixed(2) : "0";
};

export const orderStatuses = ["Processing", "Cancelled", "Delivered"];
export const ORDER_STATUSES = [
  { name: "Processing" },
  { name: "Cancelled" },
  { name: "Delivered" },
];

export const getDifferenceBWinDates = (date) => {
  const AD = new Date(date);
  const CD = new Date();
  const diff = Math.abs(AD.getTime() - CD.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays;
};
export const checkAuthError = (error) => {
  // eslint-disable-next-line eqeqeq
  if (error?.request?.status == 401) {
    sessionStorage.removeItem("karyana-admin");
    window.location.replace("/login");
  }
};

export const pricingPlans = ["Free", "Premium"];

export const formatDate = (date) => {
  const d = new Date(date);
  var year = d.getFullYear();
  var month = ('0' + (d.getMonth() + 1)).slice(-2); // Add leading zero if month is single digit
  var day = ('0' + d.getDate()).slice(-2); // Add leading zero if day is single digit
  return year + "-" + month + "-" + day;
}