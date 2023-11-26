import api from "./index";

const create = async (productId: string, amount: number) => {
  const response = await api.post(`/buy`, {product_id: productId, amount});
  return response.data;
};

const getAll = async (page: number) => {
  const response = await api.get(`/buy?page=${page}`);
  return response.data;
}

const buyAPI = {
    create,
    getAll,
};

export default buyAPI;
