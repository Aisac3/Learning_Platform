import { createBrowserRouter } from "react-router";
import Userlayout from "../layout/Userlayout";
import Register from "../components/Register";
import Login from "../components/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Userlayout/>,
    errorElement:<h1>Error page</h1>,
    children: [
      {
        path: "about",
        element: <h1>This is about page</h1>,
      },
      {
        path: "profile",
        element: <h1>This is profile page</h1>,
      },
    ],
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  }
]);
