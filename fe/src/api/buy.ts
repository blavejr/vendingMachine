import api from "./index";

// I want to keep it explicit that the productId is required
const create = async (productId: string, amount: number) => {
  const response = await api.post(`/buy`, {product_id: productId, amount});
  return response.data;
};

const buyAPI = {
    create,
};

export default buyAPI;
