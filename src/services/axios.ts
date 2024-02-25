import axios from "axios";

const axiosInstance = axios.create({
    baseURL: String(import.meta.env.VITE_API_URL),
    timeout: 20000,
})

export default axiosInstance;
