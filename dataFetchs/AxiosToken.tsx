import axios from "axios";

export const axiosUser = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
});

axiosUser.interceptors.request.use((config) => {
  const token = `${process.env.NEXT_PUBLIC_APP_TOKEN}`;
  config.headers.Authorization = token && `Bearer ${token}`;
  return config;
});
