// import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Shared/FooterLayout'
import DefaultSidebar from '../components/Sidebar/DefultSidebar'
// import placeholder from '/placeholder.png'
import '.././App.scss'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
export default function MainLayout() {
  const {pathname} = useLocation()                  
  const paths = ['/','/filter'];                  
  return (        
   <><div><Toaster/></div>
    <div className='min-h-screen flex flex-col'>
     <Navbar></Navbar> 
     { paths.includes(pathname) || pathname.includes('/post/') ? 
     <div className='container mx-auto'>
     <div className='grid px-5 mx-auto mt-20 grid-cols-12'>
 
      <Outlet></Outlet>   
      <DefaultSidebar></DefaultSidebar>          
      </div></div>
      :<div><Outlet></Outlet></div>
      }
     <Footer></Footer>              
    </div></>
  )
}
