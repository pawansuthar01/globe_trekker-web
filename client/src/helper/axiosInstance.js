import axios from "axios";
const basic_url = "http://localhost:5000";
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = basic_url;
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
