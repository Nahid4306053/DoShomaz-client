/* eslint-disable no-unused-vars */

import usePopularBlog from "../../Hooks/usePopularBlog";
// import "../scss/Popularpost.scss";
import ErrorComponent from "../Shared/ErrrorComponet";
import LoadingComponet from "../Shared/LoadingComponent";
import PopularpostCard from "./PopularpostCard";
export default function PopularPost() {
  const { PopularBlog, error, isError, isLoading, isSuccess } =
    usePopularBlog();

  return (
    <>
      <div className=" bg-[#eff6fb] mt-10  w-full  feed-back ">
        {/* <!-- this is  header --> */}
        <h4 className="sub-title w-full">Popular Posts</h4>
        {/* <!-- this is line --> */}
        {isLoading ? (
          <LoadingComponet></LoadingComponet>
        ) : isError ? (
          <ErrorComponent></ErrorComponent>
        ) : (
          PopularBlog.data.Blogs.map((ele) => {
            return <PopularpostCard data={ele} key={ele._id} />;
          })
        )}
      </div>
    </>
  );
}
