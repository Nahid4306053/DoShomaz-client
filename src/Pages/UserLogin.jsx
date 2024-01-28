/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authinicetion";
import logo from '../assets/footerlogo.png'
import FormForSignUpandLogin from "../components/FormForSignUpandLogin";
import InputField from "../components/Shared/InputField";
import "../scss/SignUp.scss";
import toast, { Toaster } from "react-hot-toast";
export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroMsg, setErrorMsg] = useState("");
  const naving = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [currentloading, setcurrentloading] = useState(false);
  const { Login , currentUser} = useAuth();
 
  const getPassword = (e) => {
    // const validpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const value = e.target.value;
    setPassword(value.trim());
  };
  const getEmail = (e) => {
    const value = e.target.value;
    const validEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!validEmail.test(value)) {
      setErrorMsg("Please Provide A valid Email Address");
    } else {
      setErrorMsg("");
      setEmail(value.trim());
    }
  };

  async function getUserdata(e) {
    e.preventDefault();

    if (password.trim() === "" || email.trim() === "") {
      setErrorMsg(
        "Email , Password is requred. Please make sure You done that's"
      );
    } else {
      try {
        await Login(email, password);
        setErrorMsg("");
        toast.success("Log in  Successfully")
        setTimeout(() => {
         naving("/");
        }, 300);
      } catch (error) {
        setErrorMsg(error?.message);
        setcurrentloading(false);
      }
    }
  }
  return (
    <div className="w-full flex justify-center bg-blue-100 min-h-screen items-center">
      <div><Toaster/></div>
      <div className="signup froms shadow-lg">
        <img className="h-24" src={logo} alt="" />
        <h1 className="text-white mb-5 text-xl font-semibold">Log in to your account </h1>
        <FormForSignUpandLogin onSubmit={getUserdata}>
          {erroMsg && (
            <div className="error ">
              <ul>
                <li>
                  <i className="fa-solid fa-xmark"></i>
                  {erroMsg}
                </li>
              </ul>
            </div>
          )}
          {/* <div className="success mt-4">
        <ul>
          <li><i className="fa-solid fa-check"></i>{}</li>
        </ul>
      </div> */}

          <InputField
            onChange={getEmail}
            required
            type="text"
            placeholder="Email"
            iconName="fa-solid fa-envelope"
          />
          <InputField
            onChange={getPassword}
            required
            type="text"
            placeholder="Password"
            iconName="fa-solid fa-lock"
          />
          <button
            type="submit"
            className="btn mt-4  font-bold w-full text-[#002347] bg-[#fdc632] hover:bg-[#fdc632]  border-none"
          >
            Log In
          </button>
          <span className="mt-11 block text-center text-white">
            Don't have an account?
            <Link to="/signup" className="text-[#fdc632] mx-1">
              Sign Up
            </Link>
            instead
          </span>
        </FormForSignUpandLogin>
      </div>
    </div>
  );
}
