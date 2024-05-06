// COOKIES, LOCAL STORAGE

export const setAuthUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

// export const getAuthenticatedUser = (data) => {
//   if (localStorage.getItem("user")) {
//     return JSON.parse(localStorage.getItem("user"));
//   }
// };

// helper/Storage.js

export const getAuthenticatedUser = () => {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    // Check if the user object contains both 'role' property and its value is 'admin'
    // if (user && user.role === 'admin') {
    //   return user;
    // }
    return user;
  }
  return null; // Return null if no authenticated user or if user's role is not 'admin'
};


export const removeAuthUser = () => {
  if (localStorage.getItem("user")) localStorage.removeItem("user");
};