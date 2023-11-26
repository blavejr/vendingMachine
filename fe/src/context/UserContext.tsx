import React, { createContext, useContext, useEffect, useState } from "react";
import * as localStorage from "../utils/localStorage";
import userAPI from "../api/user";
import { decodeToken } from "react-jwt";

export interface User {
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

const initialUser: User = {
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
  setUserData: (userData: User) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: any) => {
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    const token = localStorage.read("token");
    if (token) {
      const decodedToken = decodeToken(token) as DecodedToken;
      if (decodedToken.userId) {
        userAPI
          .getUser(decodedToken.userId)
          .then((res) => {
            setUserData(res);
          })
          .catch((err) => {
            console.error("Error fetching user data:", err);
          });
      }
    }
  }, []);

  const setUserData = (userData: User) => {
    setUser({ ...userData, token: localStorage.read("token") });
  };

  const login = (userData: User) => {
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
