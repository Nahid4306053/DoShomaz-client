// import { useState } from "react";
import { Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/Authinicetion";
import user from "../../assets/user.png";
export default function Account() {
  const { currentUser, Logout } = useAuth();
  return (
    <li>
      <a className=" relative  text-[#002347] font-bold flex items-center mr-3 cursor-pointer">
        <div className="avatar dropdown group pl-5 py-4">
          <div className="h-10 rounded-full ring ring-blue-950 ring-offset-base-100 ring-offset-2">
            <img src={currentUser?.photoURL.trim() || user} />
          </div>
          {/* User popup deatils */}
          <ul
            className={`absolute account group-hover:block  hidden p-5  items-center -ml-52 w-64 mt-3 border bg-base-200  shadow-lg shadow-gray-400 `}
          >
            <div className="flex flex-col items-center">
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-blue-950 ring-offset-base-100 ring-offset-2">
                  <img src={currentUser?.photoURL.trim() || user} />
                </div>
              </div>
              <h1 className="userName mt-3 capitalize text-xl font-bold text-[#002347]">
                {currentUser && currentUser.displayName.slice(0, 15)}
              </h1>

              <Divider />

              <div className="flex  flex-col w-full mt-5 space-y-3 text-[#002347]">
                <NavLink
                  className="flex items-center gap-3 text-lg"
                  to="/dashboard/profile"
                >
                  <i className="fa-sharp fa-solid fa-address-card"></i>
                  Dashboard
                </NavLink>
                <a className="flex items-center gap-3 text-lg">
                  <i className="fa-regular fa-book-bookmark"></i> Bookmarks
                </a>
                <a className="flex items-center gap-3 text-lg">
                  <i className="fa-solid fa-messages-question"></i> Help &
                  Support
                </a>
                <a
                  className="text-lg text-[#002347] font-bold"
                  onClick={Logout}
                >
                  <i className="fa-solid fa-right-from-bracket mr-3"></i> Log
                  out
                </a>
              </div>
            </div>
          </ul>
        </div>
      </a>
    </li>
  );
}
