import React, { useEffect, useState } from "react";
import userApis from "../../apis/userApis";
import { getAuthenticatedUser } from "../../helper/Storage";
// import moment from 'moment';

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
  const auth = getAuthenticatedUser();
  const [data, setData] = useState({
    result: [],
    loading: true,
    error: null,
    reload: 0,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setData({ ...data, loading: true });
    await userApis
      .getUser(auth.token)
      .then((response) => {
        console.log(response.data.user);
        console.log("response: ", response);
        setData({
          ...data,
          result: response.data.user,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        setData({
          result: [],
          loading: false,
          error:
            error?.response?.data?.error ||
            "The User service is under maintenance",
        });
      });
  }, []);
  console.log("data: ", data.result);
  const user = data.result;

  return (
    <div>
      <div class="my-4 ">
        <div class="w-full >">
          <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
            <div class="flex items-center justify-between bg-white rounded-lg shadow-xl p-8">
              <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4>
              <button
                type="button"
                class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  class="w-6 h-6 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>

                <p class="">edit</p>
              </button>
            </div>

            {/* <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4> */}
            <ul class="mt-2 text-gray-700">
              <li class="flex border-y py-2">
                <span class="font-bold w-24">Username:</span>
                <span class="text-gray-700">{user.username}</span>
              </li>
              <li class="flex border-y py-2">
                <span class="font-bold w-24">Full name:</span>
                <span class="text-gray-700">{user.name}</span>
              </li>
              {/* <li class="flex border-b py-2">
                <span class="font-bold w-24">Birthday:</span>
                <span class="text-gray-700">24 Jul, 1991</span>
              </li> */}
              <li class="flex border-b py-2">
                <span class="font-bold w-24">Joined:</span>
                <span class="text-gray-700">{formatDate(user.createdAt)}</span>
              </li>
              <li class="flex border-b py-2">
                <span class="font-bold w-24">Mobile:</span>
                <span class="text-gray-700">{user.phone}</span>
              </li>
              <li class="flex border-b py-2">
                <span class="font-bold w-24">Email:</span>
                <span class="text-gray-700">{user.email}</span>
              </li>
              <li class="flex border-b py-2">
                <span class="font-bold w-24">Address:</span>
                <span class="text-gray-700">{user.address}</span>
              </li>
              {/* <li class="flex border-b py-2">
                <span class="font-bold w-24">Number of orders:</span>
                <span class="text-gray-700 text-center">5</span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
