import axios from "axios";

const backendURL =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:5000"
    : "https://ear-disease-detection-backend.onrender.com";

const api = axios.create({
  baseURL: backendURL,
  timeout: 30000,
});

export default api;
