import axios from "axios";
export const basic_url = "https://globe-trekker-web.onrender.com";
// "http://localhost:5000";

//

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = basic_url;
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
