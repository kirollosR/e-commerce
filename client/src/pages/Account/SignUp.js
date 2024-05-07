import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../apis/authApis"; // Import the register function from your authApis file
import { setAuthUser } from "../../helper/Storage";


const SignUp = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [errUsername, setErrUsername] = useState("");
  const [errName, setErrName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setErrUsername("");
    setErrorMsg(""); // Reset error message on input change
  };

  const handleName = (e) => {
    setName(e.target.value);
    setErrName("");
    setErrorMsg(""); // Reset error message on input change
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setErrorMsg(""); // Reset error message on input change
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
    setErrorMsg(""); // Reset error message on input change
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
    setErrorMsg(""); // Reset error message on input change
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
    setErrorMsg(""); // Reset error message on input change
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        username,
        name,
        email,
        password,
        address,
        phone,
      }); // Call register API

      // If registration successful, navigate to home page
      if (response.status === 200) {
        setAuthUser(response.data)
        navigate("/"); // Navigate to home page
      }
    } catch (error) {
      // If registration fails, display error message
      if (error.response) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-full lgl:w-1/2 h-full">
        {/* Your JSX code */}
        <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
              Create your account
            </h1>
            <div className="flex flex-col gap-3">
              {/* Username */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Username
                </p>
                <input
                  onChange={handleUsername}
                  value={username}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="Your username"
                />
                {errUsername && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errUsername}
                  </p>
                )}
              </div>
              {/* Name */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Full Name
                </p>
                <input
                  onChange={handleName}
                  value={name}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="eg. John Doe"
                />
                {errName && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errName}
                  </p>
                )}
              </div>
              {/* Email */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Work Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="email"
                  placeholder="john@workemail.com"
                />
                {errEmail && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errEmail}
                  </p>
                )}
              </div>
              {/* Password */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Password
                </p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Create password"
                />
                {errPassword && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errPassword}
                  </p>
                )}
              </div>
              {/* Address */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Address
                </p>
                <input
                  onChange={handleAddress}
                  value={address}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="Your address"
                />
                {errAddress && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errAddress}
                  </p>
                )}
              </div>
              {/* Phone Number */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Phone Number
                </p>
                <input
                  onChange={handlePhone}
                  value={phone}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="Your phone number"
                />
                {errPhone && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errPhone}
                  </p>
                )}
              </div>
              {/* Error Message */}
              {errorMsg && (
                <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
              )}
              <button
                onClick={handleSignUp}
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
              >
                Create Account
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Already have an account?{" "}
                <Link to="/signin">
                  <span className="hover:text-blue-600 duration-300">Sign in</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
        {/* Your JSX code */}
        {/* ... */}
      </div>
    </div>
  );
  
};

export default SignUp;