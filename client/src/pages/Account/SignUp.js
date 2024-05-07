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

  const [errors, setErrors] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setErrorMsg("");
  };

  const handleName = (e) => {
    setName(e.target.value);
    setErrorMsg("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorMsg("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrorMsg("");
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrorMsg("");
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrorMsg("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await register({
        username,
        name,
        email,
        password,
        address,
        phone,
      });

      if (response.status === 200) {
        setAuthUser(response.data);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors); // Set validation errors
      } else {
        setErrorMsg("Service is currently unavailable. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
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
            </div>
            {/* Error Messages */}
            {errorMsg && (
              <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
            )}
            {!errorMsg && errors.map((error, index) => (
              <p key={index} className="text-red-500 text-sm text-center mb-2">
                {error.msg}
              </p>
            ))}
            <button
              onClick={handleSignUp}
              className={`bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300 ${
                isLoading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Create Account"}
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
    </div>
  );
};

export default SignUp;
