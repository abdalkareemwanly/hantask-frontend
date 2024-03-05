import axios from "axios";

const axiosClient = axios.create({
  // baseURL: `http://localhost:8000/api`,
  baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // Handle responses as needed
    return response;
  },
  (error) => {
    const { response } = error;
    // Handle errors as needed
    throw error;
  }
);

export default axiosClient;
