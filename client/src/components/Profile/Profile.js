import React, { useEffect, useState } from "react";
import userApis from "../../apis/userApis";
import { getAuthenticatedUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";

function formatDate(dateString) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(dateString);
  const formattedDate =
    date.getDate() +
    " " +
    monthNames[date.getMonth()] +
    " " +
    date.getFullYear();
  const daysAgo = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
  return `${formattedDate} (${daysAgo} days ago)`;
}

const Profile = () => {
  const navigate = useNavigate();
  
  const auth = getAuthenticatedUser();
  const [data, setData] = useState({
    result: [],
    loading: true,
    error: null,
    reload: 0,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      setData({ ...data, loading: true });
      await userApis
        .getUser(auth.user.token)
        .then((response) => {
          setData({
            ...data,
            result: response.data.user,
            loading: false,
            error: null,
          });
        })
        .catch((error) => {
          console.error("error:", error);
          setData({
            result: [],
            loading: false,
            error:
              error?.response?.data?.error ||
              "The User service is under maintenance",
          });
        });
    };

    fetchData();
  }, []);
  console.log("data: ", data.result);
  const user = data.result;

  return (
    <div>
      {data.loading && (
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
      {data.error && (
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div
            className="flex justify-center items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 md:w-5/6"
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
              <span className="font-medium"></span> {data.error}
            </div>
          </div>
          <button
            type="button"
            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 w-1/6"
          >
            <svg
              className="h-5 w-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Add User
          </button>
        </div>
      )}
      {!data.error && !data.loading && (
        <div className="my-4 ">
          <div className="w-full >">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <div className="flex items-center justify-between bg-white rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-900 font-bold">
                  Personal Info
                </h4>
                <button
                  type="button"
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  onClick={() => {
                    // window.location.href = "/profile/edit";
                    navigate('/profile/edit', { state: { data: user } });
                  }}
                >
                  <svg
                    className="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>

                  <p className="">edit</p>
                </button>
              </div>

              {/* <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4> */}
              <ul className="mt-2 text-gray-700">
                <li className="flex border-y py-2">
                  <span className="font-bold w-24">Username:</span>
                  <span className="text-gray-700">{user.username}</span>
                </li>
                <li className="flex border-y py-2">
                  <span className="font-bold w-24">Full name:</span>
                  <span className="text-gray-700">{user.name}</span>
                </li>
                {/* <li className="flex border-b py-2">
                <span className="font-bold w-24">Birthday:</span>
                <span className="text-gray-700">24 Jul, 1991</span>
              </li> */}
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Joined:</span>
                  <span className="text-gray-700">
                    {formatDate(user.createdAt)}
                  </span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Mobile:</span>
                  <span className="text-gray-700">{user.phone}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Email:</span>
                  <span className="text-gray-700">{user.email}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Address:</span>
                  <span className="text-gray-700">{user.address}</span>
                </li>
                {/* <li className="flex border-b py-2">
                <span className="font-bold w-24">Number of orders:</span>
                <span className="text-gray-700 text-center">5</span>
              </li> */}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
