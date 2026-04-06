import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 120000,
  withCredentials: true,
});

export const searchProducts = (query) =>
  api.get(`/compare/search?query=${encodeURIComponent(query)}`);

export const runAgent = (query) =>
  api.get(`/agent/run?query=${encodeURIComponent(query)}`);


export const getHistory = () => api.get("/compare/history");

export default api; 