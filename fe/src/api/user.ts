import api from "./index";

const login = async (username: string, password: string) => {
  const response = await api.get("/user", {
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });
  return response.data;
};

// TODO: Needs to be implemented in the backend
const logout = async (data: any) => {
  const response = await api.post("/user/logout", data);
  return response.data;
};

const register = async (data: any) => {
  const response = await api.post("/user", data);
  return response.data;
};

const delete_ = async (id: string) => {
  const response = await api.remove(`/user/${id}`);
  return response.data;
};

const resetdeposit = async (id: string) => {
  const response = await api.get(`/user/reset`);
  return response.data;
};

const getUser = async (id: string) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

const userAPI = {
  login,
  logout,
  register,
  delete_,
  resetdeposit,
  getUser,
};

export default userAPI;
