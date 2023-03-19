import React from "react";
import { Outlet } from "react-router-dom";
import AuthenticationService from "../../api/authentication/AuthenticationService";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  return AuthenticationService.isAdminLoggedIn();
};
const ProtectedRouteAdmin = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouteAdmin;