import React from "react";
import Profile from "../../components/Profile/Profile";
import UserOrders from "../../components/Orders/UserOrders";

const ProfilePage = () => {
  return (
    //     <div className="flex">
    //     <Profile className="w-1/4" />
    //     <UserOrders className="w-3/4" />
    //   </div>
    <div>
      <Profile />
      <UserOrders />
    </div>
  );
};
export default ProfilePage;
