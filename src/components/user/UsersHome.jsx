import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material"
import MyRideDrawer from "../fragments/drawer/Drawer";
import BasicMap from "../fragments/Map"
import { Container } from "@mui/system";
import axios from "../../api/customAxiosConfig/CustomAxiosConfig";
import { useState, useEffect } from 'react';
import RoundedShadowBox from "../../custom_components/RoundedShadowBox";

const UserHome = () => {

  const[stationData, setStationData] = useState([]);

  const retrieveStations = async () => {
    try {
        const response = await axios.get("/get-stations");
        if(response.status === 200) {
            return response;
        }
    }
    catch(err) {
        console.log(err);
    }
  }

useEffect( () => {
    retrieveStations().then((response) => {
            setStationData(response.data);  
      });
  }, [])


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
          <Container align="center" maxWidth="m">
            <BasicMap stationsArray={stationData}/>
          </Container>
        </RoundedShadowBox>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default UserHome;
