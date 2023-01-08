import React from "react";
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import StartRideService from "../../../api/system/StartRideService";
import AuthenticationService from "../../../api/authentication/AuthenticationService";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/customAxiosConfig/CustomAxiosConfig";
import { Container, Box } from "@mui/material";

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

        if (!info.startStationId) {
            errors.startStationId_error = true;
            errors.startStationId = "Please choose a start station!";
        }

        if (!info.bikeId) {
            errors.bikeId_error = true;
            errors.bikeId = "Please choose a bike from your start station!";
        }

        if (!info.endStationId) {
            errors.endStationId_error = true;
            errors.endStationId = "Please choose an end station!";
        }

        return errors;            
    };

    useEffect(() => {
        setLoadingStartStations(true);
        const availableOptions = async()  => {
            try {
                const availableStartStations = await axios.get("/get-stations");
                if (availableStartStations.data.length > 0) {
                    setAvailableStartStations(availableStartStations.data.map(station => ({name: station.name})));
                    setLoadingStartStations(false);
                }
            }
            catch(err) {
                console.log(err);
            }

        };
        availableOptions();
    }, []);

    useEffect(() => {
        setLoadingUsableBikes(true);
        const availableOptions = async() => {
            try {
                const availableUsableBikes = await axios.get("/get-usable-bikes"); //TODO: add param the selected station
                if(availableUsableBikes.data.length > 0) {
                    setAvailableUsableBikes(availableUsableBikes.data.map(bike => ({bikeId: bike.id})));
                }
            }
            catch(err) {
                console.log(err);
            }
        };
        availableOptions();
    }, [startStations]);

    const submitHandler = async (event) => {
        console.log(availableStartStations);
        console.log(usableBikes);
        event.preventDefault();

        let errors = validate(info);
        setErrors(errors);

        if(Object.keys(errors).length === 0) {
            const response = await StartRideService(info);
            if (response.status === 201) {
                window.location.reload(false);
            }
            else {
              console.log(errors);
            }

        }
        else console.log(errors);
    };

    return (
        <Container variant="main" maxWidth = "l">

        <Button
            onClick={submitHandler}
            variant="contained"
            color="secondary"
        >
            Start Your Ride
        </Button>

        </Container>
      );
}

export default StartRide;