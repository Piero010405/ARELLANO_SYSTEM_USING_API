// src/lib/apiClient.ts
import axios from "axios";
import { getAccessToken, setAccessToken } from "@/utils/cookies";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // <-- Tu backend Express
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken(); // Desde cookie (client o server)
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await axios.get("/api/auth/refresh"); // Next.js route
        const newToken = refreshRes.data.accessToken;
        setAccessToken(newToken); // Guardamos en cookie

        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient.request(error.config);
      } catch (err) {
        console.error("Refresh token falló. Redirigiendo.");
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
