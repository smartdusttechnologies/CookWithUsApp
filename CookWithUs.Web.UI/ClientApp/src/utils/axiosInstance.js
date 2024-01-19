import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
  headers: {
    "content-type": "application/json",
  },
});

export default axiosInstance;
