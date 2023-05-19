import * as React from 'react';
import { Button, Typography, Modal, Box, Grid, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import StartRideService from "../../api/system/StartRideService";
import axios from "../../api/customAxiosConfig/CustomAxiosConfig";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UserDetailsService from '../../api/users/UserDetailsService';
import RoundedShadowBox from '../../custom_components/RoundedShadowBox';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

//TODO: Make sure to use a correct way of handling the hooks
const StartRide = () => {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errors, setErrors] = useState({});

    // Arrays of data retrieved through calls
    const [stationData, setStationData] = useState([]); //station names
    const [endStationData, setEndStationData] = useState([]);
    const [bikeData, setBikeData] = useState([]);
    const [hidePage, setHidePage] = useState(false);

    // Data retrieved from the UI
    const [chosenStation, setChosenStation] = useState('');
    const [chosenBike, setChosenBike] = useState('');
    const [chosenEnd, setChosenEnd] = useState('');

    // Info for the init ride call
    const [info, setInfo] = useState({
        startStationName: "",
        endStationName: "",
        bikeExternalId: ""
    });

    const getStations = async () => {
        try {
            const response = await axios.get("/get-start-stations");
            let arr = [];
            if (response.data.length > 0) {
                let availableStartStations = response.data;
                for (const iterator of availableStartStations) {
                    let temp = {
                        name: iterator.name,
                    };

                    arr.push(temp);
                }
                return(arr);
            }
        }
        catch (err) {
            let error = "";
            if (err.response) {
                error += err.response;
            }
            return error;
        }
    };

    useEffect(() => { 
        let unmounted = false;
        
        UserDetailsService().then((response) => {
            if(!unmounted) {
                setHidePage(response.data.inActiveRide);
            }
          });
        
        getStations().then((dataArr) => {
          if(!unmounted) {
              setStationData(dataArr);
          }
        });
    
        return () => {
            unmounted = true;
          };
    }, []) 


    const validate = () => { //TODO: check if well defined
        const errors = {};

        if (info.startStation === '') {
            errors.startStationName_error = true;
            errors.startStationName = "Please choose a start station!";
        }

        if (info.bikeExternalId === '') {
            errors.bikeExternalId_error = true;
            errors.bikeExternalId = "Please choose a bike from your start station!";
        }

        if (info.endStation === '') {
            errors.endStationName_error = true;
            errors.endStationName = "Please choose an end station!";
        }

        return errors;
    };



    const getBikes = async () => {
        try {
            var request = "/get-usable-bikes?stationName=" + chosenStation;

            const response = await axios.get(request);
            let arr = [];
            if (response.data.length > 0) {
                let availableUsableBikes = response.data;
                for (const iterator of availableUsableBikes) {
                    let temp = {
                        externalId: iterator.externalId,
                        rating: iterator.rating
                    };

                    arr.push(temp);
                }
                console.log(arr);
                setBikeData(arr);
            }
        }
        catch (err) {
            let error = "";
            if (err.response) {
                error += err.response;
            }
            return error;
        }
    };

    const getEndStations = async () => {
        try {
            const response = await axios.get("/get-end-stations");
            let arr = [];
            if (response.data.length > 0) {
                let availableEndStations = response.data;
                for (const iterator of availableEndStations) {
                    let temp = {
                        name: iterator.name,
                    };
                    if(temp.name !== chosenStation) { //do not show the start station as an option
                        arr.push(temp);
                    }
                }

                setEndStationData(arr);
            }
        }
        catch (err) {
            let error = "";
            if (err.response) {
                error += err.response;
            }
            return error;
        }

    };

    const submitHandler = async (event) => {
        event.preventDefault();

        let errors = validate(info);

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const response = await StartRideService(info);
            if (response.status === 201) {
               console.log("init ride");
               setOpenSuccess(true);
            }
            else {
                console.log(errors);
                setOpenError(true);
            }
        }
        else {
             console.log(errors);
             setOpenError(true);
        }
    };
    
    const handleChange1 = (event) => {
        setChosenStation(event.target.value);
        
        // clear other fields and info regarding the bike and end station
        setChosenBike('');
        setChosenEnd('');
        setInfo({ ...info, startStationName: event.target.value, bikeExternalId: 0, endStationName: 0});
    }

    const handleChange2 = (event) => {
        setChosenBike(event.target.value);
        setInfo({ ...info, bikeExternalId: event.target.value });
    }


    const handleChange3 = (event) => {
        setChosenEnd(event.target.value);
        setInfo({ ...info, endStationName: event.target.value});
    }


    //Map from station Data to Menu item
    const menuItemsStations = stationData.map((item) => (
        <MenuItem key={item.name} value={item.name}> {item.name} </MenuItem>
    ));

    const menuItemsBikes = bikeData.map((item, i) => (
        <MenuItem key={i} value={item.externalId}> {"Bike: " + item.externalId.toString() + " [ " + (item.rating === 0 ? "Fresh Bike": "Rating = " + item.rating.toString()) + ' ]'} </MenuItem>
    )); 

    const menuItemsEnd = endStationData.map(item => (
        <MenuItem key={item.name} value={item.name}> {item.name} </MenuItem>
    ));

    return (
    <>
    <div hidden={hidePage}>
        <Grid container spacing={2} p={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <RoundedShadowBox
                    display="flex"
                    flexDirection="column"
                >
                    <Typography component="h1" variant="h5">
                        Pick up a bike
                    </Typography >
                    <Divider/>
                    <br></br>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="chosen-station-id">Start station</InputLabel>
                        <Select
                            labelId="chosen-station-id"
                            id="chosen-station"
                            value={chosenStation}
                            onChange={handleChange1}
                            label="Choose station"
                            >
                            {menuItemsStations}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="chosen-bike-id">Choose bike</InputLabel>
                        <Select
                            labelId="chosen-bike-id"
                            id="chosen-bike"
                            value={chosenBike}
                            label="Choose bike"
                            onOpen={getBikes}
                            onChange={handleChange2}
                        >
                            {menuItemsBikes}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="chosen-end-station-id">End station</InputLabel>
                        <Select
                            labelId="chosen-end-station-id"
                            id="chosen-end-station"
                            value={chosenEnd}
                            label="Choose station"
                            onOpen={getEndStations}
                            onChange={handleChange3}
                            >
                            {menuItemsEnd}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <Button
                            onClick={submitHandler}
                            variant="contained"
                            color="secondary"
                            >
                            Start Your Ride
                        </Button>
                    </FormControl>
                </RoundedShadowBox>
                <Modal
                        open={openError}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        onClose={() => {setOpenError(false)}}
                        >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
                                You cannot start a ride!
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 } } textAlign="center">
                                Please verify your inputs!
                            </Typography>
                        </Box>
                </Modal>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
        <Modal
                open={openSuccess}
                onClose={() => {
                    setOpenSuccess(false);
                    setHidePage(true);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
                        Enjoy Your Ride!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} textAlign="center">
                        And take care!
                    </Typography>
                </Box>
        </Modal>
    </div>
    <div hidden={!hidePage}>
        <Typography variant="h5" align='center' color="error">
            You can't pick up a new bike while you're having an active ride!
        </Typography>
    </div>
    </>
    );
}

export default StartRide;