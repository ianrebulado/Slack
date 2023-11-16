import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage/LoginPage";
import Testpage from "./pages/Test/testpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup/Signup";

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
    path: "/test",
    element: <Testpage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <RouterProvider router={router} />
);
