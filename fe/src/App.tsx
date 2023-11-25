import React from "react";
import styles from "./App.module.scss";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import cx from "classnames";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Orders from "./pages/Orders/Orders";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import { UserProvider } from "./context/UserContext";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    ),
  },
  {
    path: "/orders",
    element: (
      <AuthGuard>
        <Orders />
      </AuthGuard>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  return (
    <div className={cx(styles.App)}>
      <UserProvider>
        <RouterProvider router={BrowserRouter} />
      </UserProvider>
    </div>
  );
}

export default App;
