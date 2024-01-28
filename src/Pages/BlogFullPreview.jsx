/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";

import BlogFullPreviewCard from "../components/Blog/BlogFullPreviewCard";
import BlogPreviewPagination from "../components/Blog/BlogPreviewPagination";
import CommentList from "../components/Comment/CommentList";
import Comment_form from "../components/Comment/Comment_form";
import { useParams } from "react-router-dom";
import useSingelBlog from "../Hooks/UseSingelBlog";
import ErrorComponent from "../components/Shared/ErrrorComponet";
import LoadingComponet from "../components/Shared/LoadingComponent";
import useAxios from "../Hooks/DataFeachting/useAxios";
export default function BlogFullPreview() {
  const Axios = useAxios()
  const { id } = useParams();
  const { Blog, isError, error, isLoading, isSuccess } = useSingelBlog(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);



  return (
    <div className="col-span-full lg:pr-10 lg:col-span-8">
      {isLoading ? (
        <div className="w-full max-h-screen flex justify-center items-center">
          <LoadingComponet></LoadingComponet>
        </div>
      ) : isError ? (
        <div className="w-full max-h-screen flex justify-center items-center">
          <ErrorComponent></ErrorComponent>
        </div>
      ) : (
       <> 
       {Blog.data && <BlogFullPreviewCard element={Blog.data} />}
       <BlogPreviewPagination id={id}/>
       <CommentList id={id}/>
       <Comment_form blogId={id}/> 
      </>
      )}
    </div>
  );
}
