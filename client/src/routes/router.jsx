import { createBrowserRouter } from "react-router";
import Userlayout from "../layout/Userlayout";
import Register from "../pages/user/Register";
import Login from "../pages/shared/Login";
import AboutPage from "../pages/user/AboutPage";
import Courses from "../pages/user/Courses";
import Homepage from "../pages/user/Homepage"
import CartPage from "../pages/user/CartPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Userlayout/>,
    errorElement:<h1>Error page</h1>,
    children: [
      {
        path: "",
        element: <Homepage/>,
      },
      {
        path: "about",
        element: <AboutPage/>,
      },
      {
        path: "courses",
        element: <Courses/>,
      },
      {
        path: "cart",
        element: <CartPage/>,
      },
      {
        path:'/login',
        element:<Login/>
      },  
      {
        path:'/register',
        element:<Register/>
      },
    ],
  },


]);
