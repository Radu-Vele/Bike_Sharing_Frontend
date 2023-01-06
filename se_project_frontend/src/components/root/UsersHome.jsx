import React from "react";
import styles from "../../css/UserHome.module.css";
import Background from "./fragments/background/Background";
import { Box, Typography } from "@mui/material"

const UserHome = () => {
  
  return (
    <Box>
      <Typography variant = "h5" align="center">
        Hello and welcome to the Bike Sharing App Home Page
      </Typography>

    </Box>
  );
};

export default UserHome;
