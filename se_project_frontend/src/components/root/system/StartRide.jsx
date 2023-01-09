import * as React from 'react';
import { Button, Typography, Modal, Box } from '@mui/material';
import { useState, useLayoutEffect, useEffect } from 'react';
import StartRideService from "../../../api/system/StartRideService";
import AuthenticationService from "../../../api/authentication/AuthenticationService";
import axios from "../../../api/customAxiosConfig/CustomAxiosConfig";
import { Container } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StartRide = () => {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errors, setErrors] = useState({});

    const style = {
        width: 400,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    // Arrays of data retrieved through calls
    const [stationData, setStationData] = useState([]);
    const [endStationData, setEndStationData] = useState([]);
    const [bikeData, setBikeData] = useState([]);


    // Data retrieved from the UI
    const [chosenStation, setChosenStation] = useState('');
    const [chosenStationId, setChosenStationId] = useState('');
    const [chosenBike, setChosenBike] = useState('');
    const [chosenEnd, setChosenEnd] = useState('');
    const [chosenEndId, setChosenEndId] = useState('');

    //Logged in user
    const username = AuthenticationService.getLoggedInUser();

    // Info for the init ride call
    const [info, setInfo] = useState({
        username: username,
        startStationId: "",
        endStationId: "",
        bikeId: ""
    });

    // Retrieve usable stations
    const getStations = async () => {
        try {
            const response = await axios.get("/get-usable-stations");
            let arr = [];
            if (response.data.length > 0) {
                let availableStartStations = response.data;
                for (const iterator of availableStartStations) {
                    let temp = {
                        name: iterator.name,
                        id: iterator.id
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


    //executed at component mount
    useLayoutEffect(() => {
        let unmounted = false;
      
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

        if (info.startStationId == '') {
            errors.startStationId_error = true;
            errors.startStationId = "Please choose a start station!";
        }

        if (info.bikeId == '') {
            errors.bikeId_error = true;
            errors.bikeId = "Please choose a bike from your start station!";
        }

        if (info.endStationId == '') {
            errors.endStationId_error = true;
            errors.endStationId = "Please choose an end station!";
        }

        return errors;
    };



    const getBikes = async () => { //works well
        try {
            const response = await axios.get("/get-usable-bikes?stationId=" + chosenStationId);
            let arr = [];
            if (response.data.length > 0) {
                let availableUsableBikes = response.data;
                for (const iterator of availableUsableBikes) {
                    //let temp = iterator.id;
                    arr.push(iterator.id);
                }
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
            const response = await axios.get("/get-free-stations");
            let arr = [];
            if (response.data.length > 0) {
                let availableEndStations = response.data;
                for (const iterator of availableEndStations) {
                    let temp = {
                        name: iterator.name,
                        id: iterator.id
                    };
                    if(temp.name != chosenStation) { //do not show the start station as an option
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

        console.log(info);

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
        //set chosen station name
        setChosenStation(event.target.value);
        
        //set chosen Station ID
        let chosenId  = 0;

        for (let i = 0; i < stationData.length; i++) {
            if(event.target.value == stationData[i].name) {
                chosenId = stationData[i].id;
            }
        }

        setChosenStationId(chosenId);
        
        // clear other fields and info regarding the bike and end station
        setChosenBike('');
        setChosenEnd('');
        setInfo({ ...info, startStationId: chosenId, bikeId: 0, endStationId: 0});
    }

    const handleChange2 = (event) => {
        setChosenBike(event.target.value);
        setInfo({ ...info, bikeId: event.target.value });
    }


    const handleChange3 = (event) => {
        setChosenEnd(event.target.value);
        let chosenId = 0;

        for (let i = 0; i < stationData.length; i++) {
            if(event.target.value == stationData[i].name) {
                chosenId = stationData[i].id;
            }
        }
        
        setChosenStationId(chosenId);
        setInfo({ ...info, endStationId: chosenId});
    }


    //Map from station Data to Menu item
    const menuItemsStations = stationData.map((item, index) => (
        <MenuItem key={item.id} value={item.name}> {item.name} </MenuItem>
    ));

    const menuItemsBikes = bikeData.map((item, i) => (
        <MenuItem key={i} value={item}> {item} </MenuItem>
    ));

    const menuItemsEnd = endStationData.map(item => (
        <MenuItem key={item.id} value={item.name}> {item.name} </MenuItem>
    ));

    return (

        <Container maxWidth='xs' sx={{ fontWeight: 'light', typography: 'body1' }}>
            <Typography component="h1" variant="h5">
                Pick up a bike
            </Typography >
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
            <br></br>
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
            <br></br>
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
            <br></br>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
                <Button
                    onClick={submitHandler}
                    variant="contained"
                    color="secondary"
                >
                    Start Your Ride
                </Button>
            </FormControl>
            <br></br>
            <Modal
                    open={openError}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onClose={() => {setOpenError(false)}}
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            You cannot start a ride!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Please verify your inputs!
                        </Typography>
                    </Box>
            </Modal>
            <Modal
                    open={openSuccess}
                    onClose={() => {setOpenSuccess(false)}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Enjoy Your Ride!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            And take care!
                        </Typography>
                    </Box>
            </Modal>
        </Container>
    );
}

export default StartRide;