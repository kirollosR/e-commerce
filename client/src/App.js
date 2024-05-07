import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  Navigate,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Users from "./pages/Users/Users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import Profile from "./pages/Profile/Profile";

import { getAuthenticatedUser } from "./helper/Storage";
import AdminHeader from "./components/Admin/AdminHeader/AdminHeader";
import AddCategoryForm from "./pages/Admin/AddCategory/AddCategoryForm";
import EditProfile from "./pages/Profile/EditProfile";
import AddProduct from "./pages/Admin/AddProduct/AddProduct";





const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />

      <Footer />
      <FooterBottom />
    </div>
  );
};

const Admin = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <AdminHeader />
      
      
      {/* <ScrollRestoration /> */}
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/" element={<Layout />}>
//         {/* ==================== Header Navlink Start here =================== */}
//         <Route index element={<Home />}></Route>
//         <Route path="/shop" element={<Shop />}></Route>
//         <Route path="/about" element={<About />}></Route>
//         <Route path="/contact" element={<Contact />}></Route>
//         <Route path="/journal" element={<Journal />}></Route>
//         {/* ==================== Header Navlink End here ===================== */}
//         <Route path="/profile" element={<Profile/>}></Route>
//         <Route path="/admin-home" element={<AdminHome />}></Route>
//         <Route path="/category/:category" element={<Offer />}></Route>
//         <Route path="/product/:_id" element={<ProductDetails />}></Route>
//         <Route path="/cart" element={<Cart />}></Route>
//         <Route path="/paymentgateway" element={<Payment />}></Route>
//         {/* <Route path="/users" element={<Users />}></Route> */}
//       </Route>
//       <Route path="admin" element={<Admin />}>
//         <Route path="users" element={<Users />}></Route>
//       </Route>
        
//       <Route path="/signup" element={<SignUp />}></Route>
//       <Route path="/signin" element={<SignIn />}></Route>
      
//     </Route>
//   )
// );




const ProtectedRoute = ({ element, redirectTo }) => {
  return getAuthenticatedUser() ? (
    element
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

const AdminRoute = ({ element }) => {
  const auth = getAuthenticatedUser();
  return auth && auth.role === "admin" ? element : <Navigate to="/" replace />;
}

const GuestRoute = ({ element, redirectTo }) => {
  return !getAuthenticatedUser() ? (
    element
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      
        
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} redirectTo="/signin" />}
        />
        <Route
          path="/shop"
          element={<ProtectedRoute element={<Shop/>} redirectTo="/signin" />}
        />
      </Route>
      <Route
        path="/admin"
        element={<AdminRoute element={<Admin />} redirectTo="/" />}
      >
        <Route path="/admin/category" element={<AddCategoryForm />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin/users" element={<Users />} />
      </Route>

      {/* <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} /> */}
      <Route
        path="/signin"
        element={<GuestRoute element={<SignIn />} redirectTo="/" />}
      />
      <Route
        path="/signup"
        element={<GuestRoute element={<SignUp />} redirectTo="/" />}
      />
      

      {/* Guest route example */}
      {/* <Route path="/guest" element={<Guest />}> */}
        {/* Define guest-only routes */}
      {/* </Route> */}
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);


function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <div className="font-bodyFont">
//       <ToastContainer
//         position="top-right"
//         autoClose={1000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//       <Header />
//       <HeaderBottom />
//       <SpecialCase />
//       <ScrollRestoration />
//       <Outlet />

//       <Footer />
//       <FooterBottom />
//     </div>
//   );
// }

// export default App;