import axios from "axios";

const service = axios.create({
  withCredentials: true,
  timeout: 90000, // request timeout
});

// request interceptors
service.interceptors.request.use(
  async (config) => {
    // TODO token 暫時用:去取 "007會員" api
    let token = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlhsWnllRmtrcXg0MkRrZG5CMlRvUHciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2NjIzODQ3MzcsImV4cCI6MTY2MjM4ODMzNywiaXNzIjoiaHR0cHM6Ly9vcGlkLXQuZXZlcnRydXN0LmNvbS50dyIsImF1ZCI6ImhwX21lbWJlcl90b2tlbl9hcGkiLCJjbGllbnRfaWQiOiJocF9tZW1iZXJfdG9rZW4iLCJzdWIiOiIzZmRjM2QyNS05ZjMyLTRkNGUtYmU1MS0xYzI0NjgzNjE1MGUiLCJqdGkiOiIzZWI2NDFkMS02YWNkLTRkZTMtODhhYy1mZjRhOWJhYzk4OGQiLCJOYW1lIjoi5aSn5bir5ris6KmmIiwiUGhvbmUiOiIwOTAwMDAwMDAwIiwiVXNlcklkIjoiM2ZkYzNkMjUtOWYzMi00ZDRlLWJlNTEtMWMyNDY4MzYxNTBlIiwiR3JvdXAiOiJJbGxlZ2FsLExlZ2FsIiwicm9sZXMiOiLns7vntbHpm7vlgrMs5bqr5a2YL-WIiueZuyzosrfmlrnntpPnh58s6ZaL55m8L-mbu-WCsyzmnIPlk6HkuK3lv4Ms6Zu75YKz57SA6YyELExlZ2FsLFByZW1pdW0iLCJWZXJpZnlDb2RlIjoiWWt5eExyRW5CNGs4OXZXcjM3Q3lpQXVjWkRwNXUxOVciLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwic2NvcGUiOlsiaHBfbWVtYmVyX3Rva2VuX2FwaSJdfQ.Xq9sq33gXYCdWL-VK-i0yUaMgnGJamV98SLRx00DY0GnvtI2GL2VYOZCVrngFzlB9v3bjLK5tGjmQpVwAKqLcYrQiotDKYkjBXJOt9cXSuDBZd-bYqBso7kz7SE04HMfY0M1k_oZG07LEmdwqPmYJarzFNTRCGkDM2sBggteLJvATgzs0ZtZfuNdVpSnQTypZWG73WrQZXuwfSgKY6GWG2eI6apL66SwFP5qYeWqSdTNpMVSxaUtM1jZ0oPJfCFJhIe_jpT-xAOh279SHwKkp3z9CbEddA3QoO9-7e9dBW5LPKxUxyPwoXD8h5qTNF00Ztue2upai0y8MAvnx17Ebg`;

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default service;
