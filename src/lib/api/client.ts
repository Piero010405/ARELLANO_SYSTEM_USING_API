// src/lib/api/client.ts
import axios from "axios";

const axiosBackend = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
});

export default axiosBackend;
