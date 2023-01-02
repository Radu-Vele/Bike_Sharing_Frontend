import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/root/fragments/header/Header";
import Home from "./components/root/home/Home";
import SignUp from "./components/root/users/signUp/SignUp";
import Login from "./components/root/users/login/Login";
import ProtectedRouteGuest from "./components/protectedRoutes/ProtectedRouteGuest";
import ProtectedRouteUser from "./components/protectedRoutes/ProtectedRouteUser";
import AccountUser from "./components/root/users/accountUser/AccountUser";

import React, {useState} from "react"

function App() {


  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route element={<ProtectedRouteGuest />}>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRouteUser />}>
            <Route path="account-user" element={<AccountUser />} />
          </Route> 
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
