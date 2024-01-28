/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useMemo, useState } from "react";

import BlogCard from "../components/Blog/BlogCard";
import BlogPagination from "../components/Blog/BlogPagination";
import LoadinComponet from "../components/Shared/LoadingComponent";
import ErrorComponet from "../components/Shared/ErrrorComponet";
import useFilter from "../Hooks/useFilter";
import { useLocation, useSearchParams } from "react-router-dom";
export default function FilterBlog() {
  const [page, setpage] = useState(1);
  const [query,setQuery] = useState();
  const { Blogs, error, isError, isLoading, isSuccess } = useFilter(page, 5 , true , query );
  const {search,state} = useLocation();
  const [searchQuery,setSearchQuery] = useSearchParams()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(()=>{
   if(searchQuery.get('categorey')){
     setQuery(`&categorey=${searchQuery.get('categorey')}`)               
   }
   else if(searchQuery.get('user')){
     setQuery(`&user=${searchQuery.get('user')}`)               
   }
   else if(searchQuery.get('search')){
     setQuery(`&search=${searchQuery.get('search')}`)               
   }
   window.scrollTo(0, 0);
  },[search]);

  return (
    <div className="col-span-full  lg:pr-10 lg:col-span-8">
      <div  className="p-5 bg mt-10 text-xl text-white">
      {searchQuery.get('categorey') && <><strong className="text-white">Category : </strong> {searchQuery.get('categorey')}  Results</>}
      {searchQuery.get('user') && <strong className="text-white">Result of {state?.displayName} Blog Posts</strong>}
      {searchQuery.get('search') && <><strong className="text-white">Search result of : </strong> {searchQuery.get('search')}</>}
      </div>
      {isLoading ? (
        <div className="w-full max-h-screen flex justify-center items-center">
          <LoadinComponet></LoadinComponet>
        </div>
      ) : isError ? (
        <div className="w-full max-h-screen flex justify-center items-center">
          <ErrorComponet></ErrorComponet>
        </div>
      ) : (
        Blogs.data?.Blogs.length > 0 ?  Blogs.data?.Blogs.map((ele) => {
          return <BlogCard key={ele._id} element={ele}></BlogCard>;
        })
        :<h1 className="text-2xl text-center mt-10">No data Found</h1>
      )}
      <br />
      <br />
      <br />
      {isSuccess && Blogs.data?.Blogs.length > 0 && (
        <BlogPagination
          page={page}
          setPage={setpage}
          totaldata={Blogs.data?.totalData}
        />
      )}
    </div>
  );
}
