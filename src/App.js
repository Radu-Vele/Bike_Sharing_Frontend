import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { styled, ThemeProvider } from '@mui/material/styles';
import Header from "./components/fragments/header/Header";
import Home from "./components/guest/home/Home";
import SignUp from "./components/guest/signUp/SignUp";
import Login from "./components/guest/Login";
import ProtectedRouteGuest from "./components/protectedRoutes/ProtectedRouteGuest";
import ProtectedRouteUser from "./components/protectedRoutes/ProtectedRouteUser";
import ProtectedRouteAdmin from "./components/protectedRoutes/ProtectedRouteAdmin";
import AccountUser from "./components/user/accountUser/AccountUser";
import CssBaseline from '@mui/material/CssBaseline';
import React, {useState} from "react"
import UserHome from './components/user/UsersHome';
import myTheme from './theme/AppTheme';
import StartRide from './components/system/StartRide';
import AdminHome from './components/admin/AdminHome';
import ManageBikesStations from './components/admin/actions/ManageBikesStations.jsx';

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ myTheme, open }) => ({
      flexGrow: 1,
      padding: myTheme.spacing(3),
      transition: myTheme.transitions.create("margin", {
        easing: myTheme.transitions.easing.sharp,
        duration: myTheme.transitions.duration.leavingScreen
      }),
      marginRight: -drawerWidth,
      ...(open && {
        transition: myTheme.transitions.create("margin", {
          easing: myTheme.transitions.easing.easeOut,
          duration: myTheme.transitions.duration.enteringScreen
        }),
        marginRight: 0
      })
    })
  );

function App() {

  return (
      <Router>
          <ThemeProvider theme = {myTheme}> {/** Theme inherited in all sub-pages */}
          <CssBaseline /> 
            <Header />
            <br></br>
            <br></br>
            <Routes>
              <Route element={<ProtectedRouteGuest />}>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp signUpAdmin={false} />} />
                <Route path="/login" element={<Login />} />
              </Route>
    
              <Route element={<ProtectedRouteUser />}>
                <Route path="/user-home" element={<UserHome />} />
                <Route path="/account-user" element={<AccountUser />} />
                <Route path="/bike-pickup" element={<StartRide />} />
              </Route> 

              <Route element={<ProtectedRouteAdmin />}>
                <Route path="/admin-home" element={<AdminHome />} />
                <Route path="/new-admin" element ={<SignUp signUpAdmin={true} />} />
                <Route path="/manage-bikes-stations" element={<ManageBikesStations/>} />
              </Route>
            </Routes>
          </ThemeProvider>
      </Router>
  );
}

export default App;