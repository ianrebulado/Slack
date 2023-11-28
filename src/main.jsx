import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./utils/Routes";
import ChatWindow from "./components/Chat/ChatWindow";
import DMWindow from './components/DM/DMWindow'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/m",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'channel/:channelID',
        element: <ChatWindow />,
        loader: ({params})=> {
          return params.channelID
        }
     }, 
    {
      path: 'chat/:dmID',
      element: <DMWindow />,
      loader: ({params})=> {
        return params.dmID
      }
    }
  ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <RouterProvider router={router} />
  <ToastContainer />
  </>
);
