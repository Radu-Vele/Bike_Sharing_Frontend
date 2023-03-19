import React from "react";
import { useState } from "react";
import style_nav from "../../../css/Navlink.module.css";
import { Box, Switch, FormGroup, FormControlLabel } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { NavLink } from "react-router-dom";
import AuthenticationService from "../../../api/authentication/AuthenticationService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const [adminInUserMode, setAdminInUserMode] = useState(false);
  const [mode4Admin, setMode4Admin] = useState("Admin Mode");
  const userLogged = AuthenticationService.isUserLoggedIn();
  const adminLogged = AuthenticationService.isAdminLoggedIn();

  const location = useLocation();
  const navigate = useNavigate();
  const label = "-"; //?

  const handleSwitchToggle = (event) => {
    if(event.target.checked) {
      setAdminInUserMode(true);
      setMode4Admin("User Mode");
      navigate("/user-home");
    }
    else {
      setAdminInUserMode(false);
      setMode4Admin("Admin Mode");
      navigate("/admin-home");
    }
  }

  return (
    <Box component="main" maxWidth="xs" >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu" //TODO: make it point to home page
            sx={{ mr: 2 }}
          >
            <DirectionsBikeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cluj Bike Sharing
          </Typography>
    
    {(userLogged || adminInUserMode) && (  
      <>
          <Button color="inherit">
            <NavLink 
            to="/user-home" 
            className={style_nav.nav_link_default} 
            activeClassName={style_nav.nav_link_active}
            >
              Home</NavLink>
          </Button>
          <Button color="inherit">
            <NavLink 
            to="/bike-pickup"
            className={style_nav.nav_link_default} 
            activeClassName={style_nav.nav_link_active}
            >
              Pick up a Bike</NavLink>
          </Button>

          <Button color="inherit">
            <NavLink 
            to="/account-user"
            className={style_nav.nav_link_default} 
            activeClassName={style_nav.nav_link_active}
            >
              My Account</NavLink>
          </Button>
      </>
    )}
    
    {(adminLogged && !adminInUserMode) && (
      <>
          <Button color="inherit">
            <NavLink 
            to="/admin-home"
            className={style_nav.nav_link_default} 
            activeClassName={style_nav.nav_link_active}
            >
              Home </NavLink>
          </Button>

          <Button color="inherit">
            <NavLink 
            to="/new-admin"
            className={style_nav.nav_link_default} 
            activeClassName={style_nav.nav_link_active}
            >
              New Admin</NavLink>
          </Button>
      </>
    )}

    { adminLogged && (
      <FormGroup>
        <FormControlLabel
          control={<Switch {...label} color='secondary' onChange={handleSwitchToggle} />}
          label={mode4Admin}
        />
      </FormGroup>
    )} 
    
    {!userLogged && !adminLogged && (
      <> 
         <Button color="inherit">
           <NavLink 
           to="/"
           className={style_nav.nav_link_default} 
           activeClassName={style_nav.nav_link_active}   
           >
              Home
            </NavLink>
         </Button>
      
         <Button color="inherit">
           <NavLink 
           to="/login"
           className={style_nav.nav_link_default} 
           activeClassName={style_nav.nav_link_active}   
           >
              Login
            </NavLink>
         </Button>

         <Button color="inherit">
           <NavLink 
           to="/signup"
           className={style_nav.nav_link_default} 
           activeClassName={style_nav.nav_link_active}   
           >
              SignUP
            </NavLink>
         </Button>
    
      </>
    )}

    {(userLogged || adminLogged) && (
      <>
        <Button color="inherit" edge="end"
            onClick={AuthenticationService.logout}
          >
            <NavLink 
            to="/"
            className={style_nav.nav_link_default} 
            activeClassName={style_nav.nav_link_active}         
            >
              <LogoutIcon fontSize="small"/>
            </NavLink>
        </Button>
      </>
    )}
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default Header;
