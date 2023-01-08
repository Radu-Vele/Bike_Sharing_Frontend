import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import StartRideService from "../../../api/system/StartRideService";
import AuthenticationService from "../../../api/authentication/AuthenticationService";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/customAxiosConfig/CustomAxiosConfig";
import { Container, Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StartRide = () => {

    // const navigate = useNavigate();

    // const [loadingStartStations, setLoadingStartStations] = useState(true);
    // const [loadingUsableBikes, setLoadingUsableBikes] = useState(true);
    
    const [chosenStation, setChosenStation] = useState();

    const iterator = useState();

    const [stationData, setStationData] = useState([{
        name: "",
        id: ""
    }]);

    const bikeData = useState([]);
    const username = AuthenticationService.getLoggedInUser();

    const [info, setInfo] = useState({
        username: username,
        startStationId: "",
        bikeId: "",
        endStationId: ""
    });

    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState();

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

    const getStations = async() => {
        
            try {
                const availableStartStations = axios.get("/get-stations");
                if (availableStartStations.data.length > 0) {
                    for (const iterator of availableStartStations.data) {
                        let temp = {
                            name: iterator.name,
                            id: iterator.id
                        };
                        setStationData(stationData.concat(temp));
                    }
                        
                    console.log(stationData[0].name);
                }
            }
            catch (err) {
                let error = "";
                if(err.response) {
                    error += err.response;
                }
                return error;
            }

        };

    /*
    // useEffect(() => {
    //     setLoadingUsableBikes(true);
    //     const availableOptionsBikes = async() => {
    //         try {
    //             const availableUsableBikes = await axios.get("/get-usable-bikes/", null, { 
                        params: { 
                            stationId,
                        }, ); //TODO: add param the selected station
    //             if(availableUsableBikes.data.length > 0) {
    //                 setAvailableUsableBikes(availableUsableBikes.data.map(bikeData => ({bikeId: bikeData.id})));
    //             }
    //         }
    //         catch (err) {
    //             let error = "";
    //             if(err.response) {
    //                 error += err.response;
    //             }
    //             return error;
    //         }
    //     };
    //     availableOptionsBikes();
    // }, [startStations]);
    */

    const submitHandler = async (event) => {
        event.preventDefault();

        let errors = validate(info);
        setErrors(errors);

        if(Object.keys(errors).length === 0) {

            info.startStationId = chosenStation;
            const response = await StartRideService(info);
            if (response.status === 201) {
            }
            else {
              console.log(errors);
            }

        }
        else console.log(errors);
    };

    const handleChange1 = async(event) => {
        setChosenStation(event.target.value);
    }

    return (
        <Container variant="main" maxWidth = "l">
        <FormControl sx={{ m: 1, minWidth: 120}}>
            <InputLabel id="chosen-station-id">Start station</InputLabel>
            <Select
                labelId="chosen-station-id"
                id="chosen-station"
                value={chosenStation}
                label="Choose station"
                onClick={getStations}
                onChange={handleChange1}
            >
                for (const iterator of stationData) {
                    <MenuItem value={iterator.id}>{iterator.name}</MenuItem>
                }
            </Select>
            <Button
                onClick={submitHandler}
                variant="contained"
                color="secondary"
            >
                Start Your Ride
            </Button> 
        </FormControl>
        </Container>
      );
}

export default StartRide;