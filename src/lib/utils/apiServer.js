import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL de tu API
  withCredentials: true, // Para enviar cookies como el refreshToken
});

export default api;