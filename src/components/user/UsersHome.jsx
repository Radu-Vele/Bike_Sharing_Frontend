import React from "react";
import { Box, Typography } from "@mui/material"
import MyRideDrawer from "../fragments/drawer/Drawer";
import BasicMap from "../fragments/Map"
import { Container } from "@mui/system";
import axios from "../../api/customAxiosConfig/CustomAxiosConfig";
import { useState, useLayoutEffect, useEffect } from 'react';

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

useLayoutEffect( () => {
    let unmounted = false;
    
    retrieveStations().then((response) => {
        if(!unmounted) {
            setStationData(response.data);
        }
      });

    return () => {
        unmounted = true;
      };
  }, [])


  return (
    <Box>
        <Typography variant = "h5" align="center">
          Hello and welcome to the Bike Sharing App Home Page!
        </Typography>
        <br></br>
        <MyRideDrawer />
        <br></br>
        <Container align="center" maxWidth="l">
          <BasicMap stationsArray={stationData}/>
        </Container>

        
    </Box>
  );
};

export default UserHome;
