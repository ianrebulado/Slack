import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import Testpage from "./pages/Test/testpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/test",
    element: <Testpage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
