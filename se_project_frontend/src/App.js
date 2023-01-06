import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { styled, createTheme, ThemeProvider, createMuiTheme } from '@mui/material/styles';

import Header from "./components/root/fragments/header/Header";
import Home from "./components/root/home/Home";
import SignUp from "./components/root/users/signUp/SignUp";
import Login from "./components/root/users/login/Login";
import ProtectedRouteGuest from "./components/protectedRoutes/ProtectedRouteGuest";
import ProtectedRouteUser from "./components/protectedRoutes/ProtectedRouteUser";
import AccountUser from "./components/root/users/accountUser/AccountUser";
import CssBaseline from '@mui/material/CssBaseline';

import React, {useState} from "react"
import UserHome from './components/root/UsersHome';
import myTheme from './theme/AppTheme';

function App() {

  return (
      <Router>
          <ThemeProvider theme = {myTheme}> {/** Theme inherited in all sub-pages */}
          <CssBaseline /> 
            <Header />
            <Routes>
              <Route element={<ProtectedRouteGuest />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
              </Route>

              <Route element={<ProtectedRouteUser />}>
                <Route path="user-home" element={<UserHome />} />
                <Route path="account-user" element={<AccountUser />} />
              </Route> 
            </Routes>
          </ThemeProvider>
      </Router>
  );
}

export default App;
