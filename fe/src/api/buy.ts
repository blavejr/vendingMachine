import api from "./index";

// I want to keep it explicit that the productId is required
const create = async (productId: string, amount: number) => {
  const response = await api.post(`/buy`, {product_id: productId, amount});
  return response.data;
};

const getAll = async () => {
  const response = await api.get(`/buy`);
  return response.data;
}

const buyAPI = {
    create,
    getAll,
};

export default buyAPI;
