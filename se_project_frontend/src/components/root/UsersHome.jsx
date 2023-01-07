import React from "react";
import styles from "../../css/UserHome.module.css";
import Background from "./fragments/background/Background";
import { Box, Typography } from "@mui/material"
import MyRideDrawer from "./fragments/drawer/Drawer";

const UserHome = () => {
  
  return (
    <Box>
      <Typography variant = "h5" align="center">
        Hello and welcome to the Bike Sharing App Home Page
      </Typography>
      <br></br>
      <MyRideDrawer />

    </Box>
  );
};

export default UserHome;
