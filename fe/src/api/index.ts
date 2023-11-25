import axios, { AxiosResponse } from "axios";
import { read } from "../utils/localStorage";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${read("token")}`,
  },
});
// Add a request interceptor
api.interceptors.request.use(
  (config: any) => {
    if (
      config.headers &&
      config.headers.Authorization &&
      config.headers.Authorization !== "Bearer null"
    ) {
      return config;
    }

    const token = read("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async (url: string, options: any = null): Promise<any> => {
  const response: AxiosResponse = await api.get(url, options);
  return response;
};

export const post = async (url: string, data: any): Promise<any> => {
  const response: AxiosResponse = await api.post(url, data);
  return response;
};

export const put = async (url: string, data: any): Promise<any> => {
  const response: AxiosResponse = await api.put(url, data);
  return response;
};

export const remove = async (url: string): Promise<any> => {
  const response: AxiosResponse = await api.delete(url);
  return response;
};

export const patch = async (url: string, data: any): Promise<any> => {
  const response: AxiosResponse = await api.patch(url, data);
  return response;
};

export default {
  get,
  post,
  put,
  remove,
  patch,
};
