/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from "react";
import GoogleIcons from "../GoogleIcons";

import { Link } from "react-router-dom";
import useBlogCountByCatgorey from "../../Hooks/useBlogCountByCatgorey";

export default function CategoreyDropdown() {
  const { Blog, error, isError, isLoading, isSuccess } =
    useBlogCountByCatgorey();

  return (
    <li className="dropdown dropdown-hover">
      <a tabIndex="0" className="text-[#002347] font-bold flex items-center mr-5 cursor-pointer" >
        Categories
        <GoogleIcons classess="font-bold text-[#002347]" name={"expand_more"} />
      </a>

      <ul
        tabIndex="0"
        className="dropdown-content z-[1] rounded-lg overflow-hidden  shadow-lg shadow-gray-400 bg-base-200   w-52"
      >
        {isSuccess &&
          Blog.data.map((element, ind) => {
            return (
              <Link key={ind} to={`/filter?categorey=${element.category}`}>
                <li className="py-3 px-3 cursor-pointer hover:bg-[#0023479b]">
                  <a className="capitalize text-[#002347] font-bold mr-3 cursor-pointer">
                    {element.category}
                  </a>
                </li>
              </Link>
            );
          })}
      </ul>
    </li>
  );
}
