import React from "react";
import { Outlet } from "react-router-dom";
import AuthenticationService from "../../api/authentication/AuthenticationService";
import { Navigate } from "react-router-dom";

const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
const isAdminLoggedIn = AuthenticationService.isAdminLoggedIn();

const ProtectedRoutesGuest = () => {
  if (isUserLoggedIn) {
    return <Navigate to="/user-home" />;
  } 
  else if (isAdminLoggedIn) {
    return <Navigate to="/admin-home" />;
  }
  else {
    return <Outlet />;
  }
};

export default ProtectedRoutesGuest;