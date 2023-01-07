import React from "react";
import styles from "../../../../css/Header.module.css";
import style_nav from "../../../../css/Navlink.module.css";
import Navbar from "./navbar/Navbar";
import { Box } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { NavLink } from "react-router-dom";
import AuthenticationService from "../../../../api/authentication/AuthenticationService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const userLogged = AuthenticationService.isUserLoggedIn();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box component="main" 
    maxWidth="xs"
    >
    {userLogged && (
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

          <Button color="inherit"
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


        </Toolbar>
      </AppBar>
    </Box>
    )}
    {!userLogged && (
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
    
        </Toolbar>
      </AppBar>
      </Box>     
    )}
    </Box>

  );
};

export default Header;
