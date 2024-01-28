/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'

import BlogCard from '../components/Blog/BlogCard'
import BlogPagination from '../components/Blog/BlogPagination'  
import useBlogs from '../Hooks/useBlogs'
import LoadinComponet from '../components/Shared/LoadingComponent';
import ErrorComponet from '../components/Shared/ErrrorComponet';
import useFavoriteBlog from '../Hooks/useFavoriteBlog';
export default function FavoriteBlog() { 
   const [page,setpage] = useState(1)
   const {Blogs,error,isError,isLoading,isSuccess} = useFavoriteBlog(page,5);
   useEffect(()=>{
    window.scrollTo(0,0)
   },[page])

   return (
        <div className="col-span-full  lg:pr-10 lg:col-span-8">   
        { isLoading ? <div className='w-full max-h-screen flex justify-center items-center'><LoadinComponet></LoadinComponet></div>
         : isError ? <div className='w-full max-h-screen flex justify-center items-center'><ErrorComponet></ErrorComponet></div>
         : Blogs.data.Blogs.length > 0 ? Blogs.data?.Blogs.map((ele)=>{
          return (
            <BlogCard key={ele._id} element={ele}></BlogCard>
          )
         }) : 
         <div className='w-full py-10 p-5 bg text-white mt-10'>
            <h3 className='text-white text-center'>No Data Found In your Favorite list</h3>
         </div>
        } 
        <br />
        <br />
        <br />
         {isSuccess &&  Blogs.data.Blogs.length > 0 && <BlogPagination page={page} setPage={setpage} totaldata={Blogs.data?.totalData}/>  }
        </div>   

    
             
  )
}
