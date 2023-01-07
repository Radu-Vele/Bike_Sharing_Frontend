import React from "react";
import { Box, Typography } from "@mui/material"
import MyRideDrawer from "./fragments/drawer/Drawer";
import BasicMap from "./fragments/Map"
import { Container } from "@mui/system";

const UserHome = () => {
  
  return (
    <Box>
        <Typography variant = "h5" align="center">
          Hello and welcome to the Bike Sharing App Home Page!
        </Typography>
        <br></br>
        <MyRideDrawer />
        <br></br>
        <Container align="center" maxWidth="l">
          <BasicMap />
        </Container>

        
    </Box>
  );
};

export default UserHome;
