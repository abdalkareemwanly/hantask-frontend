import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://api.hantask.at/api`,
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
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      window.location.reload();
    } else if (response.status === 404) {
      // Show not found
    }

    throw error;
  }
);

export default axiosClient;
