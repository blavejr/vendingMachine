import React, { createContext, useContext, useEffect, useState } from "react";
import * as localStorage from "../utils/localStorage";
import userAPI from "../api/user";
import { decodeToken } from "react-jwt";

interface User {
  id: string;
  name: string;
  username: string;
  deposit: number;
  role: string;
  created_at: string;
  updated_at: string;
  token: string;
}

interface DecodedToken {
  userId: string;
  sessionId: string;
  iat: number;
  exp: number;
}

const initialUser = {
  id: "",
  name: "",
  username: "Default",
  deposit: 0,
  role: "",
  created_at: "",
  updated_at: "",
  token: "",
};

interface UserContextProps {
  user: User | null;
  setUserData: (userData: any) => void;
  login: (userData: any) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps>({
  user: initialUser,
  setUserData: () => {},
  login: () => {},
  logout: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: any) => {
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    const decodedToken = decodeToken(localStorage.read("token")) as DecodedToken;
    console.log("user context: ", user);
    console.log("user context: ", decodeToken(localStorage.read("token")));
    if (!decodedToken || !decodedToken.userId) {
      return;
    }
    userAPI
      .getUser(decodedToken.userId)
      .then((res) => {
        console.log("user context22: ", res);
        setUserData(res);
      })
      .catch((err) => {
        console.log("user context24: ", err);
        console.log(err);
      });
  }, []);

  const setUserData = (userData: User) => {
    setUser({ ...userData, token: localStorage.read("token") });
  };

  const login = (userData: User) => {
    // Lazy but works for now :) need to submit
    setUser(userData);
    localStorage.write("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
