/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authinicetion";
import FormForSignUpandLogin from "../components/FormForSignUpandLogin";
import InputField from "../components/Shared/InputField";
import "../scss/SignUp.scss";
import logo from '../assets/footerlogo.png'
import toast, { Toaster } from "react-hot-toast";
export default function UserSignUp() {
  const [password, setPassword] = useState("");
  const [userName, setUseName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [erroMsg, setErrorMsg] = useState();
  const { signup ,Logout } = useAuth();
  const [currentloading, setcurrentloading] = useState(false);
  const naving = useNavigate();
  const getPassword = (e) => {
    // const validpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const value = e.target.value;
    setPassword(value.trim());
  };

  const getUseName = (e) => {
    const value = e.target.value;
    if (value.length > 16 || value.length < 3) {
      setErrorMsg("User Name length Must 3 to 16 cherecter");
    } else {
      setUseName(value.trim());
      setErrorMsg("");
    }
  };

  const getConfirmPassword = (e) => {
    const value = e.target.value;
    if (password !== value) {
      setErrorMsg("Password and Confirm password not match");
    } else {
      setconfirmPassword(value.trim());
      setErrorMsg("");
    }
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

    if (
      userName.trim() === "" ||
      confirmPassword.trim() === "" ||
      password.trim() === "" ||
      email.trim() === ""
    ) {
      setErrorMsg(
        "User Name,  Email , Password is requred. Please make sure You done that's"
      );
    } else {
      console.log(email, userName, password.length);
      try {
        await signup(userName, email, password);
        setErrorMsg("");
        setcurrentloading(true);
        toast.success("Signup Successfully")
        Logout()
        setTimeout(() => {
          naving("/login");
         }, 200);
      } catch (error) {
        console.log(error);
        setErrorMsg(error?.message);
        setcurrentloading(false);
      }
    }
  }

  return (
    <>
      <div className="w-full flex justify-center bg-blue-100 min-h-screen items-center">
      <div><Toaster/></div>
        <div className="signup froms shadow-lg">
        <img className="h-24" src={logo} alt="" />
        <h1 className="text-white mb-5 text-xl font-semibold">Sign Up to your account </h1>
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
          <li><i className="fa-solid fa-check"></i>Account Created SuccessFully</li>
        </ul>
       </div> */}
            <InputField
              onChange={getUseName}
              required
              type="text"
              placeholder="Username"
              iconName="fa-solid fa-user"
            />
            <InputField
              onChange={getEmail}
              required
              type="email"
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
            <InputField
              onChange={getConfirmPassword}
              required
              type="text"
              placeholder="Confirm Password"
              iconName="fa-solid fa-lock-hashtag"
            />
            <button className="btn mt-4 font-bold w-full text-[#002347] bg-[#fdc632] hover:bg-[#fdc632]  border-none">
              Submit Now
            </button>
            <span className="mt-11 block text-center text-white">
              Already have an account?
              <Link to="/login" className="text-[#fdc632] mx-1">
                Login
              </Link>
              instead
            </span>
          </FormForSignUpandLogin>
        </div>
      </div>
    </>
  );
}
