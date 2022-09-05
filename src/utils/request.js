import axios from "axios";

const service = axios.create({
  withCredentials: true,
  timeout: 90000, // request timeout
});

// request interceptors
service.interceptors.request.use(
  async (config) => {
    // TODO token 去取 "007會員" api
    let token = `Bearer `;

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default service;
