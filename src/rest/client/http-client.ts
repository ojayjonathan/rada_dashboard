import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../../utils/constants";
import { getAuthToken, logout } from "../../utils/services/user";

const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: getAuthToken(),
  };
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401 || error.status == 403) {
      logout();
    }
    error.message =
      error.response?.msg ?? error.response?.message ?? "An error occured";
    return Promise.reject(error);
  }
);

class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const res = await Axios.get<T>(url, { params });
    return res.data;
  }
  static async post<T>(
    url: string,
    data: unknown,
    options?: AxiosRequestConfig
  ) {
    const res = await Axios.post<T>(url, data, options);
    return res.data;
  }
  static async delete<T>(url: string) {
    const res = await Axios.delete<T>(url);
    return res.data;
  }
  static async put<T>(
    url: string,
    data: unknown,
    options?: AxiosRequestConfig
  ) {
    const res = await Axios.put<T>(url, data, options);
    return res.data;
  }
}

export default HttpClient;
