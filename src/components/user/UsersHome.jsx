import React from "react";
import { Box, Divider, Typography } from "@mui/material"
import MyRideDrawer from "../fragments/drawer/Drawer";
import BasicMap from "../fragments/Map"
import { Container } from "@mui/system";
import axios from "../../api/customAxiosConfig/CustomAxiosConfig";
import { useState, useEffect } from 'react';

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
    <Box
      justifyContent="center"
      alignItems="center"
    >
        <Typography variant = "h5" align="center">
          Hello and welcome to the Bike Sharing App Home Page!
        </Typography>
        <br></br>
        <MyRideDrawer />
        <br></br>
        <Divider />
        <br></br>
        <Box
          borderRadius={7} 
          boxShadow={3} 
          bgcolor="background.paper" 
          p={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={"70%"}
        >
          <Container align="center" maxWidth="m">
            <BasicMap stationsArray={stationData}/>
          </Container>
        </Box>

        
    </Box>
  );
};

export default UserHome;
