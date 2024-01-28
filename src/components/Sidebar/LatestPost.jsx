/* eslint-disable no-unused-vars */
// import React from "react";

import useLatestBlogs from "../../Hooks/useLatestBlogs";
import "../../scss/Popularpost.scss";
import ErrorComponent from "../Shared/ErrrorComponet";
import LoadingComponet from "../Shared/LoadingComponent";
import PopularpostCard from "./PopularpostCard";
export default function LatestPost() {
  const { Blogs, error, isError, isLoading, isSuccess } = useLatestBlogs(
    1,
    5,
    true
  );
  return (
    <>
      <div className=" bg-[#eff6fb]  pt-10 w-full  feed-back mt-5">
        {/* <!-- this is  header --> */}
        <h4 className="sub-title w-full">Latest Posts</h4>
        {/* <!-- this is line --> */}
        {isLoading ? (
          <LoadingComponet></LoadingComponet>
        ) : isError ? (
          <ErrorComponent></ErrorComponent>
        ) : (
          Blogs.data.Blogs.map((ele) => {
            return <PopularpostCard data={ele} key={ele._id} />;
          })
        )}
      </div>
    </>
  );
}
