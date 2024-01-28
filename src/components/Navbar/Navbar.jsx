import webLogo from "../../assets/Web_logo.png";
import "../../scss/Navbar.scss";
import Acount from "./Acount";
// import CategoreyDropdown from '../components/CategoreyDropdown';
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/Authinicetion";


export default function Navbar() {
  const { currentUser } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/" className="text-[#002347] font-bold mr-5  cursor-pointer" >
          Blogs
        </NavLink>
      </li>
   
      <li>
        <a className="text-[#002347] font-bold mr-5 cursor-pointer">About us</a>
      </li>
      <li>
        <a className="text-[#002347] font-bold mr-5 cursor-pointer">Docs</a>
      </li>
      <li>
        <a className="text-[#002347] font-bold mr-5 cursor-pointer">API</a>
      </li>
    </>
  );
  return (
    <header className="fixed w-full top-0  shadow-lg bg-white z-50">
      <div className="drawer container mx-auto">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar py-0">
            <div className="flex-1 px-2 mx-2">
              <NavLink to="/">
                <img className="h-14" src={webLogo} alt="" />
              </NavLink>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="flex items-center ">{links}</ul>
            </div>
            {currentUser ? (
              <Acount />
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="text-[#002347] font-bold mr-3 cursor-pointer flex items-center"
                  >
                    {" "}
                    Log in{" "}
                  </NavLink>
                </li>
              </>
            )}
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200">
            {/* Sidebar content here */}
            {links}
          </ul>
        </div>
      </div>
    </header>
  );
}
