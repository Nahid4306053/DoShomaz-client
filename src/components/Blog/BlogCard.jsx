/* eslint-disable react/prop-types */
// import React from 'react'
// import blogimg from '../assets/blog.webp'
import { Link } from "react-router-dom";
import "../../scss/BlogCard.scss";
import BlogCardDetails from "./BlogCardDetails";
// import _ from 'lodash'
export default function BlogCard({ element }) {
  return (
    <>
      <div className="grid grid-cols-12 mt-10">
        <BlogCardDetails data={element} />
        {/* <!-- this is content part --> */}
        <div
          key={element.postId}
          className="col-span-12 md:col-span-9 content-part-2 px-2 "
        >
          <img
            src={element.banner}
            className="h-[300px] object-cover w-full mb-8"
            alt=""
          />{" "}
          {/* <!-- this is  header --> */}
          <h3 className="">
            <Link to={`/post/${element._id}`}>{element.title}</Link>
          </h3>
          {/* <!-- this is line --> */}
          {/*style="margin-top: 10px;line-height: 26px;"*/}
          <p style={{ margin: "15px auto", lineHeight: "26px" }}>
            {element.description.slice(0, 284) + "...."}
          </p>
          <Link to={`/post/${element._id}`}>
            <button className="mt-2">
              <a>Read More</a>
            </button>
          </Link>
          {/* <!-- this is  header --> */}
          {/* </div> <!-- this is content part --> */}
        </div>
      </div>
    </>
  );
}
