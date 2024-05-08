import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../apis/authApis"; // Import the login function from your authApis file
import { setAuthUser } from "../../helper/Storage";

const SignIn = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // State to hold error message from login API
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading state

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

    if (isLoading) return; // Prevent multiple requests while waiting for response

    setIsLoading(true); // Set loading state to true

    if (!email) {
      setErrEmail("Enter your username");
      setIsLoading(false); // Reset loading state
      return;
    }

    if (!password) {
      setErrPassword("Enter your password");
      setIsLoading(false); // Reset loading state
      return;
    }

    try {
      const response = await login(email, password); // Call login API
      if (response.status === 200) {
        setAuthUser(response.data);
        if (response.data.user.role === "admin") {
          navigate("/admin/home"); // Navigate to admin page
        } else {
          navigate("/"); // Navigate to home page
        }
      }
    } catch (error) {
      // If login fails, display error message
      if (error.response) {
        if (error.response.status === 401) {
          const { data } = error.response;
          if (data.error === "User not found") {
            setErrorMsg("User not found. Please check your username.");
          } else {
            setErrorMsg("Invalid username or password. Please try again.");
          }
        } else if (
          error.response.status === 400 &&
          error.response.data.errors
        ) {
          // Handle validation errors
          const errors = error.response.data.errors;
          errors.forEach((err) => {
            if (err.param === "username") {
              setErrEmail(err.msg);
            } else if (err.param === "password") {
              setErrPassword(err.msg);
            }
          });
        } else {
          setErrorMsg("You entered a wrong password, Please try again");
        }
      } else {
        setErrorMsg(
          "Service is currently unavailable. Please try again later."
        );
      }
    } finally {
      setIsLoading(false); // Reset loading state
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
                  placeholder="username"
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
                  placeholder="password"
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
                <p className="text-red-500 text-sm text-center mb-4">
                  {errorMsg}
                </p>
              )}

              <button
                onClick={handleSignIn}
                disabled={isLoading} // Disable the button when loading
                className={`bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
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
      </div>
    </div>
  );
};

export default SignIn;
