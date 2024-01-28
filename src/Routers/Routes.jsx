import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { AuthProvider } from "../Context/Authinicetion";
import Blogs from '../Pages/Blogs'
import DashBoardlayout from "../Layouts/DashBoardlayout";
import Profile from "../Pages/DashBoard/Profile";
import UserSignUp from "../Pages/UserSignUp";
import UserLogin from "../Pages/UserLogin"
import Privaterouter from './Privaterouter'

import HandelBlog from "../Pages/DashBoard/handelBlog";
import BlogFullPreview from "../Pages/BlogFullPreview";
import MyBlogs from "../Pages/DashBoard/MyBlogs";
import UpdateBlog from "../Pages/DashBoard/UpdateBlog";
import FilterBlog from "../Pages/FilterBlog";
import Notfound from "../Pages/Notfound";
const Routers = createBrowserRouter([
   {
    path: "/",
    element : <AuthProvider><MainLayout></MainLayout></AuthProvider>,
    errorElement : <Notfound></Notfound>,
    children : [
      {
        path: "/",
        element : <Blogs></Blogs>            
      }
      , {
        path: "/filter",
        element : <FilterBlog></FilterBlog>            
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
   },{
        path: "/login",
        errorElement : <Notfound></Notfound>,
        element : <AuthProvider><><UserLogin></UserLogin></> </AuthProvider>           
      }
      ,{
        path: "/signup",
        errorElement : <Notfound></Notfound>,
        element : <AuthProvider><><UserSignUp></UserSignUp>  </>         </AuthProvider> 
      }
])

export default Routers;