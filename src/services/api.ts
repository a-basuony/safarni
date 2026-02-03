import axios from "axios";

export const api = axios.create({
  baseURL:"https://round8-backend-safarni-one.huma-volve.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});