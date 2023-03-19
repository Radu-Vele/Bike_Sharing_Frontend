import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, Dialog } from '@mui/material';
import { useState, useLayoutEffect } from 'react';
import { useEffect } from 'react';
import FinishRideService from "../../../api/system/FinishRideService";
import UserDetailsService from "../../../api/users/UserDetailsService";
import moment from "moment"
import FeedbackForm from "./FeedbackForm";

const FinishRide = () => {
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState();
    const [tempHasActiveRide, setTempHasActiveRide] = useState(false)
    const [rideStartTime, setRideStartTime] = useState("");
    const [openFbDialog, setOpenFbDialog] = useState(false);
    const [recommendedRoute, setRecommendedRoute] = useState("");

    useLayoutEffect(() => {
        let unmounted = false;
      
        UserDetailsService().then((response) => {
          if(!unmounted) {
              setUser(response.data);
              setTempHasActiveRide(response.data.activeRide);
              setRideStartTime(response.data.currentRide.startTime.substring(11,19));
              setRecommendedRoute(response.data.currentRide.recommendation.substring(19));
          }
        });
        return () => {
          unmounted = true;
        };
    }, [])

    useEffect( () => {
        var timer = setInterval(() => setDate(new Date()), 1000)

        return function cleanup() {
            clearInterval(timer);
        }
    })

    const time = date.toLocaleTimeString('it-IT');
    
    const rideHours = parseInt(rideStartTime.substring(0, 2)) - 12;
    const rideMinutes = parseInt(rideStartTime.substring(3, 5));
    const rideSeconds = parseInt(rideStartTime.substring(6, 8));;

    const start = moment()
        .subtract(rideHours, 'hours')
        .subtract(rideMinutes, 'minutes')
        .subtract(rideSeconds, 'seconds')
        .format("mm:ss");
    
    const handleFinishRide = async (event) => {
        await FinishRideService(user.currentRide.id)
        .then((response) => {
          if (response.status === 201) {
            setSuccess(true);
            setOpenFbDialog(true);
            setTempHasActiveRide(false);
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
        {tempHasActiveRide && (
        <div>      
            <Typography variant="h5">
                Your Current Ride
            </Typography> 

            <br></br>

            <Typography >
                Time since it started: {start}
            </Typography>

            <br></br>

            <Typography>
                Recommended Route:
            </Typography>

            <Typography fontSize={18}>
                {recommendedRoute.split('\n')[0]}
            </Typography>
            <br></br>
            <Typography>
                {recommendedRoute.split('\n')[1]}
            </Typography>
            
            <br></br>

            <Button
                variant="contained"
                onClick={handleFinishRide}
            >
                End Ride
            </Button>

            <Typography hidden={!error} color="error">
                Failed request!
            </Typography>

            <Typography hidden={!success} color="success">
                The ride was ended and saved successfully!
            </Typography>

        </div>
        )}
        {!tempHasActiveRide && (
        <div>
            <br></br>
            <Box>
                <Typography color="error" variant="h5">
                    You have no active ride!
                </Typography>
            </Box>
            
        </div>
        )}
        <Dialog
                open={openFbDialog}
                maxWidth="lg"
            >
                <FeedbackForm 
                    hook={[openFbDialog, setOpenFbDialog]} 
                /> {/* Is this even legal?*/}
            </Dialog>
    </Box>
    );
}

export default FinishRide;