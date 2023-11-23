import api from "./index";

// I want to keep it explicit that the productId is required
const deposit = async (deposit: number) => {
  const response = await api.patch(`/deposit`, {deposit});
  return response.data;
};

const depositAPI = {
    deposit,
};

export default depositAPI;
