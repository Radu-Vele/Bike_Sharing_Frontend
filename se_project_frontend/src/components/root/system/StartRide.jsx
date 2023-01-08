import React from "react";
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import StartRideService from "../../../api/system/StartRideService";
import AuthenticationService from "../../../api/authentication/AuthenticationService";
import { useNavigate } from "react-router-dom";

const StartRide = (ride) => {

    const navigate = useNavigate();

    const [startStations, setStartStations] = useState('DEFAULT');
    const [usableBikes, setUsableBikes] = useState('DEFAULT');

    const [loadingStartStations, setLoadingStartStations] = useState(true);
    const [loadingUsableBikes, setLoadingUsableBikes] = useState(true);
    
    const [availableStartStations, setAvailableStartStations] = useState();
    const [availableUsableBikes, setAvailableUsableBikes] = useState();
    
    const username = AuthenticationService.getLoggedInUser();

    const [info, setInfo] = useState({
        username: username,
        startStationId: "",
        bikeId: "",
        endStationId: ""
    });

    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};

        if (!startStationId) {
            errors.startStationId_error = true;
            errors.startStationId = "Please choose a start station!";
        }

        if (!bikeId) {
            errors.bikeId_error = true;
            errors.bikeId = "Please choose a bike from your start station!";
        }

        if (!endStationId) {
            errors.endStationId_error = true;
            errors.endStationId = "Please choose an end station!";
        }

        return errors;            
    };

    useEffect(() => {
        setLoadingStartStations(true);
        const availableOptions = async()  => {
            const availableStartStations = await Axios.get("/get-stations");
            console.log(availableStartStations.data);
            if (availableStartStations.data.length > 0) {
                setAvailableStartStations(availableStartStations.data.map(station => ({name: station.name})));
                setLoadingStartStations(false);
            }
        };
        availableOptions();
    }, []);

    useEffect(() => {
        setLoadingUsableBikes(true);
        const availableOptions = async() => {
            const availableUsableBikes = await Axios.get("/get-usable-bikes");
            console.log(availableUsableBikes.data);
            if(availableUsableBikes.data.length > 0) {
                setAvailableUsableBikes(availableUsableBikes.data.map(bike => ({bikeId: bike.id})));
            }
        };
        availableOptions();
    }, [startStations]);

    const submitHandler = async (event) => {
        event.preventDefault();

        let errors = validate(info);
        setErrors(errors);

        if(Object.keys(errors).length === 0) {
            const response = await StartRideService(info);
            setLoading(true);
            if (response.status === 201) {
                setLoading(false);
                window.location.reload(false);
            }
            else {
              setLoading(false);
              console.log(errors);
            }

        }
        else console.log(errors);
    };

    return (
        <Container variant="main" maxWidth = "l">
        <Typography variant="h6">
          Start your ride
        </Typography>
        <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
          
        </Box>
        </Container>
      );
}

export default StartRide;