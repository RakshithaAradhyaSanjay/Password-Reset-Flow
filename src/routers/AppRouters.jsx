/** @format */

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

const AppRouters = () => {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
};

export default AppRouters;
