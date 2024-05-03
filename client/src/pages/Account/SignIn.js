import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { login } from "../../apis/authApis"; // Import the login function
// const login = require("../../apis/authApis"); // Import the login function

const SignIn = () => {
  const [username, setUsername] = useState(""); // Change state variable to username
  const [password, setPassword] = useState("");
  const [errUsername, setErrUsername] = useState(""); // Change error variable to errUsername
  const [errPassword, setErrPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setErrUsername("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!username) {
      setErrUsername("Enter your username");
    }

    if (!password) {
      setErrPassword("Enter your password");
    }

    if (username && password) {
      try {
        const response = await login(username, password); // Send login request with username
        setSuccessMsg(response.data.message);
        setUsername("");
        setPassword("");
      } catch (error) {
        // Handle login error
        console.error("Login failed:", error.response.data);
        // Example: Display error message
        setSuccessMsg(error.response.data.error);
      }
    }
  };

  return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full lgl:w-1/2 h-full">
          {successMsg ? (
            <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
              <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
                {successMsg}
              </p>
              <Link to="/signup">
                <button
                  className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
                  tracking-wide hover:bg-black hover:text-white duration-300"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
              <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                  Sign in
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
                      placeholder="Enter your username"
                    />
                    {errUsername && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errUsername}
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
                      placeholder="Enter your password"
                    />
                    {errPassword && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errPassword}
                      </p>
                    )}
                  </div>
    
                  <button
                    onClick={handleSignIn}
                    className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                  >
                    Sign In
                  </button>
                  <p className="text-sm text-center font-titleFont font-medium">
                    Don't have an Account?{" "}
                    <Link to="/signup">
                      <span className="hover:text-blue-600 duration-300">
                        Sign up
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );    
};

export default SignIn;
