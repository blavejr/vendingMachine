import React from "react";
import styles from "./App.module.scss";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import cx from "classnames";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import AuthGuard from "./components/AuthGuard";

const BrowserRouter = createBrowserRouter([
  {
    path: "/home",
    element: (
      <AuthGuard>
        <Home />
      </AuthGuard>
    ),
  },
  {
    path: "/",
    element: <Landing />,
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
      <RouterProvider router={BrowserRouter} />
    </div>
  );
}

export default App;
