import axios from "axios";

let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}
const api = axios.create({
  baseURL: "https://localhost:7071",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const endTime = localStorage.getItem("tokenExpiration");
    if (endTime && Date.parse(endTime) < Date.now()) {
      // Xử lý khi token hết hạn (ví dụ: đăng xuất)

      return Promise.reject("Token expired");
    }

    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
