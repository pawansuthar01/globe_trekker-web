import axios from "axios";
export const basic_url = "http://localhost:5000";
//   "https://globe-trekker-web.onrender.com"

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = basic_url;
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
