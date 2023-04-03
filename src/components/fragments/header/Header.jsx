import React from "react";
import { useState, useRef } from "react";
import style_nav from "../../../css/Navlink.module.css";
import { Box, Switch, FormGroup, FormControlLabel, ClickAwayListener, MenuItem } from "@mui/material";
import { AppBar, Popper, Paper, MenuList, Grow } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { NavLink } from "react-router-dom";
import AuthenticationService from "../../../api/authentication/AuthenticationService";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { AdminPanelSettings } from "@mui/icons-material";

const Header = () => {
  const [adminInUserMode, setAdminInUserMode] = useState(false);
  const userLogged = AuthenticationService.isUserLoggedIn();
  const adminLogged = AuthenticationService.isAdminLoggedIn();
  const [openActions, setOpenActions] = useState(false);
  const anchorRef = useRef(null);

  const navigate = useNavigate();
  const label = "-"; //?

  const handleSwitchToggle = (event) => {
    if(event.target.checked) {
      setAdminInUserMode(true);
      navigate("/user-home");
    }
    else {
      setAdminInUserMode(false);
      navigate("/admin-home");
    }
  }

  const handleToggle = () => {
    setOpenActions((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenActions(false);
  };

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
          <Button 
            color="inherit"
          >
            <NavLink 
            to="/admin-home"
            className={style_nav.nav_link_default} 
            activeClassName={style_nav.nav_link_active}
            >
              Home 
            </NavLink>
          </Button>

          <Button 
            ref={anchorRef}
            id="menu-list-button"
            aria-controls={openActions ? 'menu-list' : undefined}
            aria-expanded={openActions ? 'true' : undefined}
            aria-haspopup={true}
            color="inherit"
            onClick={handleToggle}>
            Actions
          </Button>

          <Popper
            open={openActions}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {( { TransitionProps, placement}) => (
              <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={openActions}
                      id="menu-list"
                      aria-labelledby="menu-list-button"
                    >
                      <MenuItem onClick={handleClose}>
                        <NavLink 
                        to="/manage-bikes-stations"
                        >
                          Manage Bikes & Stations
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <NavLink 
                        to="/manage-users"
                        >
                          Manage Users
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <NavLink 
                        to="/new-admin"
                        >
                          New Admin
                        </NavLink>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
      </>
    )}

    { adminLogged && (
      <>
      <FormGroup>
        <FormControlLabel
          control={<Switch 
            {...label} 
            color='secondary' 
            onChange={handleSwitchToggle} 
            />}
              />
        </FormGroup>
        {adminInUserMode && <AccountCircleIcon />}
        {!adminInUserMode && <AdminPanelSettings />}
      </>
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
