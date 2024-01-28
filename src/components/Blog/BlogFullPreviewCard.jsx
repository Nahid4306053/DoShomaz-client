/* eslint-disable react/prop-types */

import moment from "moment";
import user from "../../assets/user.png";
import GoogleIcons from "../GoogleIcons";
import "../../scss/BlogCard.scss";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Context/Authinicetion";

export default function BlogFullPreviewCard({ element }) {
  const {currentUser} = useAuth()

  return (
    <div className="grid grid-cols-12 mt-10">
      <div className="col-span-12">
        <h3>
          <a className="text-3xl text-[#002347] font-bold">
            {element.title}
          </a>
        </h3>
        <div className="mt-3 flex justify-between gap-5  py-2 cata_gorey">
          <ul>
            <li className="text-start">
              <p>
                <a >
                  <i className="fa-solid fa-folder"></i> Food,
                </a>
                <a className="active" >
                  <i className="fa-solid fa-folder"></i> {element?.categorey},
                </a>
                <a >
                  <i className="fa-solid fa-folder"></i> Politics,
                </a>
                <a >
                  <i className="fa-solid fa-folder"></i> Lifestyle,
                </a>
              </p>
            </li>
          </ul>
          
          {currentUser  && currentUser.uid ===  element?.author.uid &&
           <div className="icon">
            <NavLink to={`/dashboard/update-blog/${element._id}`}><i className="fa-solid text-blue-950 text-xl p-1 rounded-lg px-2 bg-base-300 fa-pen-to-square"></i></NavLink>
          </div>}
        </div>
        <img src={element.banner} className=" w-full " alt="" />
      </div>

      {/* <!-- this is content part --> */}
      <div className="col-span-12  content-part-2 w-full  ">
        <div className="col-span-12 md:col-span-3">
          <div className="flex blog_details bg-gray-200 px-3">
            <ul className="flex flex-wrap gap-2  justify-between w-full my-3 ">
              <li className="infos cursor-pointer flex justify-end items-center ">
                <img className="h-7 w-7 object-cover mr-1 rounded-full" src={element?.author?.photoURL.trim() || user} alt="" />
                <Link to={`/filter?user=${element?.author?._id}`} state={element?.author} className="font-semibold  hover:text-[#d2ad62]" >
                  {element?.author?.displayName}
                </Link>
              </li>
              <li className="infos flex justify-end items-end ">
                <GoogleIcons
                  classess="font-bold mr-1 text-[#002347]"
                  name="calendar_month"
                />
                <a className="font-semibold" >
                {moment(element?.updatedAt).format("Do MMM YYYY")}
                </a>
              </li>
              <li className="infos flex justify-end items-end ">
                <GoogleIcons
                  classess="font-bold mr-1 text-[#002347]"
                  name="visibility"
                />
                <a className="font-semibold" >
                {element?.views.length  < 10 ? "0"+element?.views.length : element?.views.length } 
                </a>
              </li>
              <li className="infos flex justify-end items-end ">
                <GoogleIcons
                  classess="font-bold mr-1 text-[#002347]"
                  name="comment"
                />
                <a className="font-semibold hover:text-[#3a3835]" >
                {element?.comments  < 10 ? "0"+element?.comments : element?.comments }  Comments
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- this is  header --> */}
        {/* <!-- this is line --> */}
        {/*style="margin-top: 10px;line-height: 26px;"*/}
        <p className="mt-5 leading-9 text-lg" >
          {element.description}
        </p>
        {/* <!-- this is  header --> */}

        {/* </div> <!-- this is content part --> */}
      </div>
    </div>
  );
}
