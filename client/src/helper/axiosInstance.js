// axiosInstance.ts
import axios from "axios";

// export const basic_url = "http://localhost:5000";
export const basic_url = "https://globe-trekker-web.onrender.com";

const axiosInstance = axios.create({
  baseURL: basic_url,
  withCredentials: true, // only needed if using cookies
});

//  add token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Authenticator");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
