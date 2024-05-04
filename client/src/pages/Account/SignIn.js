import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { login } from "../../apis/authApis"; // Import the login function from your authApis file

const SignIn = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // State to hold error message from login API

  const handleUsername = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setErrorMsg(""); // Reset error message on input change
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
    setErrorMsg(""); // Reset error message on input change
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
      return;
    }

    if (!password) {
      setErrPassword("Create a password");
      return;
    }

    try {
      const response = await login(email, password); // Call login API
      // If login successful, navigate to home page
      if (response.status === 200) {
        navigate("/"); // Navigate to home page
      }
    } catch (error) {
      // If login fails, display error message
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMsg("Invalid username or password. Please try again."); // Handle 401 Unauthorized error
        } else {
          setErrorMsg(error.response.data.error); // Handle other errors
        }
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full lgl:w-1/2 h-full">
        <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Sign in
            </h1>
            <div className="flex flex-col gap-3">
              {/* USERNAME */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  username
                </p>
                <input
                  onChange={handleUsername}
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

              {/* Error Message */}
              {errorMsg && (
                <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
              )}

              <button
                onClick={handleSignIn}
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
              >
                Sign In
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Don't have an Account?{" "}
                <Link to="/signup">
                  <span className="hover:text-blue-600 duration-300">Sign up</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
