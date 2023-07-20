import axios from "axios";

export const axiosIns = axios.create({
  baseURL: "https://moa7.shop",
});

axiosIns.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers["Access_Token"] = accessToken;
  }
  return config;
});
