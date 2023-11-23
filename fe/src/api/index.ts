import axios, { AxiosResponse } from "axios";
import { read } from "../utils/localStorage";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const basicAuthCredentials = read('token');
    config.headers['Authorization'] = `Basic ${basicAuthCredentials}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async (url: string): Promise<any> => {
  const response: AxiosResponse = await api.get(url);
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
