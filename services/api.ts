import axios from "axios";

const api = axios.create({
  baseURL: (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/public"
  ).replace(/([^:]\/)\/+/g, "$1"),
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
  },
});

export default api;
