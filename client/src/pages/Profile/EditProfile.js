import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userApis from "../../apis/userApis";
import { getAuthenticatedUser } from "../../helper/Storage";

const EditProfile = () => {
  const navigate = useNavigate();

  const auth = getAuthenticatedUser();

  const location = useLocation();
  const data = location.state.data;

  const [user, setUser] = useState({
    data: {},
    error: [],
    loading: false,
  });

  const handleName = (e) => {
    if (e.target.value === "") {
      const { name, ...newData } = user.data;
      setUser({ ...user, data: newData });
    } else {
      setUser({ ...user, data: { ...user.data, name: e.target.value } });
    }
  };

  const handlePhone = (e) => {
    if (e.target.value === "") {
      const { phone, ...newData } = user.data;
      setUser({ ...user, data: newData });
    } else {
      setUser({ ...user, data: { ...user.data, phone: e.target.value } });
    }
  };

  const handleEmail = (e) => {
    if (e.target.value === "") {
      const { email, ...newData } = user.data;
      setUser({ ...user, data: newData });
    } else {
      setUser({ ...user, data: { ...user.data, email: e.target.value } });
    }
  };

  const handleAddress = (e) => {
    if (e.target.value === "") {
      const { address, ...newData } = user.data;
      setUser({ ...user, data: newData });
    } else {
      setUser({ ...user, data: { ...user.data, address: e.target.value } });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setUser({ ...user, loading: true });

    await userApis
      .editUser(user.data, auth.user.token)
      .then((response) => {
        setUser({
          ...user,
          data: response.data.user,
          loading: false,
          error: [],
        });
        navigate("/profile");
      })
      .catch((error) => {
        // console.error("error catch:", error.response.data.errors);
        setUser({
          data: [],
          loading: false,
          error:
            error?.response?.data?.errors ||
            error?.response?.data?.error ||
            "The User service is under maintenance",
        });
      });
  };
  //   console.log("error: ", user.error);
  //   console.log("user final: ", user);

  return (
    <div className="w-full bg-white shadow rounded">
      {user.loading && (
        <div className="flex justify-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {user.error.length !== 0 && (
        <div className=" md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          {user.error.map((error, index) => (
            <div
              key={index}
              className="flex justify-center items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 md:w-full"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="text-lg">
                <span className="font-medium">Error: </span> {error.msg}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto py-8">
        <div className="w-96 mx-auto bg-white rounded shadow">
          <div className="py-4 px-8 text-center text-black text-xl font-bold border-b border-gray-500">
            Edit User Profile
          </div>
          <p class="text-center text-gray-500 dark:text-gray-400">
            Fill only the data you need to update
          </p>
          

          <form name="student_application" id="student_application" action="">
            <div className="py-4 px-8">
              <div className="mb-4">
                <label className="block text-gray-darker text-sm font-bold mb-2">
                  Username:
                </label>
                <input
                  aria-label="disabled input "
                  className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="student_id"
                  id="student_id"
                  value={data.username}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-darker text-sm font-bold mb-2">
                  Full name:
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-darker"
                  type="text"
                  //   value={user.name}
                  placeholder={data.name}
                  onChange={handleName}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-darker text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-darker"
                  type="text"
                  placeholder={data.phone}
                  onChange={handlePhone}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-darker text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-darker"
                  type="email"
                  //   value={email}
                  placeholder={data.email}
                  onChange={handleEmail}
                />
                <p id="error_creater_id"></p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-darker text-sm font-bold mb-2">
                  Address
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-darker"
                  type="text"
                  placeholder={data.address}
                  onChange={handleAddress}
                />
              </div>

              <div className="mb-4">
                <button
                  className="mb-2 mx-16 rounded-full py-1 px-24 bg-black text-white"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
