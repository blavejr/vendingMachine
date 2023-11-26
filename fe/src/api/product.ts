import api from "./index";

const getAll = async (page: number = 1, pageSize: number = 10) => {
  const response = await api.get(`/product?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

const get = async (id: string) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

const create = async (data: any) => {
  const response = await api.post("/product", data);
  return response.data;
};

const update = async (id: string, data: any) => {
  const response = await api.put(`/product`, { id, ...data });
  return response.data;
};

const remove = async (id: string) => {
  const response = await api.remove(`/product/${id}`);
  return response.data;
};

const productsAPI = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default productsAPI;
