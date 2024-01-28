import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { AuthProvider } from "../Context/Authinicetion";
import Blogs from '../Pages/Blogs'
import DashBoardlayout from "../Layouts/DashBoardlayout";
import Profile from "../Pages/DashBoard/Profile";


import Privaterouter from './Privaterouter'

import HandelBlog from "../Pages/DashBoard/handelBlog";
import BlogFullPreview from "../Pages/BlogFullPreview";
import MyBlogs from "../Pages/DashBoard/MyBlogs";
import UpdateBlog from "../Pages/DashBoard/UpdateBlog";
import Notfound from "../Pages/Notfound";
import FavoriteBlog from "../Pages/FavoriteBlog";
const Routers = createBrowserRouter([
   {
    path: "/",
    element : <AuthProvider><MainLayout></MainLayout></AuthProvider>,
    errorElement : <Notfound></Notfound>,
    children : [
      {
        path: "/",
        element : <Blogs></Blogs>            
      },    
        {
        path: "/favorite",
        element : <FavoriteBlog></FavoriteBlog>            
      }
      ,  {
        path: "/post/:id",
        element : <Privaterouter><BlogFullPreview></BlogFullPreview></Privaterouter>            
      }
      
      ,{
        path : "/dashboard",
        element: <Privaterouter><DashBoardlayout></DashBoardlayout></Privaterouter>,
        children : [
          {
            path:"profile",
            element : <Profile></Profile>
          },  {
            path:"add-blog",
            element : <HandelBlog></HandelBlog>
          }, {
            path:"update-blog/:id",
            element : <UpdateBlog></UpdateBlog>
          }, {
            path:"my-blogs",
            element : <MyBlogs></MyBlogs>
          }
        ]
      }
    ]
   }
])

export default Routers;