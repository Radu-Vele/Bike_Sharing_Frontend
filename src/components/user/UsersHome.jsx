import React from "react";
import { Divider, Grid, Typography } from "@mui/material"
import MyRideDrawer from "../fragments/drawer/Drawer";
import BasicMap from "../fragments/BasicMap"
import { Container } from "@mui/system";
import RoundedShadowBox from "../../custom_components/RoundedShadowBox";

const UserHome = () => {

  return (
    <Grid p={2} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant = "h5" align="center">
          Hello and welcome to the Bike Sharing App Home Page!
        </Typography>
        <Divider/>
      </Grid>
      <Grid item xs={12}>
          <MyRideDrawer />
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <RoundedShadowBox>
          <BasicMap editMode={false}/>
        </RoundedShadowBox>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default UserHome;
