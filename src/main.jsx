import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Home from './pages/Home/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/m",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <RouterProvider router={router} />
);
