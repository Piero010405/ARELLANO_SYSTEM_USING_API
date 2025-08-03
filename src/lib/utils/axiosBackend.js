// src/utils/axiosBackend.js
import axios from "axios";

const axiosBackend = axios.create({
  baseURL: process.env.BACKEND_URL, // Usa directamente tu API externa
  withCredentials: true,
});

export default axiosBackend;
