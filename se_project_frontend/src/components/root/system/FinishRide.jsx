import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import FinishRideService from "../../../api/system/FinishRideService";
import AuthenticationService from "../../../api/authentication/AuthenticationService";

const FinishRide = () => {
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);
    
    const username = AuthenticationService.getLoggedInUser();

    useEffect( () => {
        var timer = setInterval(() => setDate(new Date()), 1000)

        return function cleanup() {
            clearInterval(timer);
        }
    })

    const time = date.toLocaleTimeString("en-US");

    const handleFinishRide = async (event) => {
        //call finish ride request from backend and send curr time and user.
        //@Bori
        const info = {
            currTime: date.toString(),
            username: username 
        }

        await FinishRideService(info)
        .then((response) => {
          if (response.status === 201) {
            setSuccess(true);
          }
        })
        .catch((err) => {
            setError(true);
            setSuccess(false);
        });
    }

    return (
        <Box
        p={2}
        textAlign="center"
        sx={{ width: 500 }}

        >
            <Typography variant="h5">
                Your Current Ride
            </Typography>
            
            <br></br>

            <Typography >
                Time since it started: {time}
            </Typography>
            
            <br></br>

            <Button
                variant="contained"
                color="success"
                onClick={handleFinishRide}
            >
                End Ride
            </Button>
    </Box>
    );
}

export default FinishRide;