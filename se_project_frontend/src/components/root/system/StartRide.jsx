import * as React from 'react';
import { Button, Typography, Modal, Box } from '@mui/material';
import { useState } from 'react';
import StartRideService from "../../../api/system/StartRideService";
import AuthenticationService from "../../../api/authentication/AuthenticationService";
import axios from "../../../api/customAxiosConfig/CustomAxiosConfig";
import { Container } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StartRide = () => {
    // const navigate = useNavigate();

    // const [loadingStartStations, setLoadingStartStations] = useState(true);
    // const [loadingUsableBikes, setLoadingUsableBikes] = useState(true);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        width: 400,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [chosenStation, setChosenStation] = useState({});
    const [chosenBike, setChosenBike] = useState("");
    const [chosenEnd, setChosenEnd] = useState("");

    const [chosenStationId, setChosenStationId] = useState(0);
    var chosenEndId;

    const [stationData, setStationData] = useState([]);
    const [endStationData, setEndStationData] = useState([]);

    const [bikeData, setBikeData] = useState([]);
    const username = AuthenticationService.getLoggedInUser();

    const [info, setInfo] = useState({
        username: username,
        startStationId: "",
        endStationId: "",
        bikeId: ""
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
                setStationData(arr);
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

    const getBikes = async () => {
        try {
            for (const iterator of stationData) {
                if (iterator.name === chosenStation) {
                    setChosenStationId(iterator.id);
                    console.log(chosenStationId);

                }
            }
            const response = await axios.get("/get-usable-bikes?stationId=" + chosenStationId);
            let arr = [];
            if (response.data.length > 0) {
                let availableUsableBikes = response.data;
                for (const iterator of availableUsableBikes) {
                    //let temp = iterator.id;
                    arr.push(iterator.id);
                }
                setBikeData(arr);
                console.log("bike arr:", bikeData);
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

                    arr.push(temp);
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

        setInfo({ ...info, startStationId: chosenStationId });
        console.log("bike: ", chosenBike);
        for (const iterator of endStationData) {
            if (iterator.name === chosenEnd) {
                chosenEndId = iterator.id;
                console.log(chosenEndId)
            }
        }

        info.endStationId = chosenEndId

        event.preventDefault();

        let errors = validate(info);
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const response = await StartRideService(info);
            if (response.status === 201) {
                return (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title2"
                        aria-describedby="modal-modal-description2"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title2" variant="h6" component="h2">
                                Ride started succesfully!
                            </Typography>
                            <Typography id="modal-modal-description2" sx={{ mt: 2 }}>
                                Take care on the road!
                            </Typography>
                        </Box>
                    </Modal>
                )
            }
            else {
                console.log(errors);
            }

        }
        else {
            console.log(errors);
            return (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
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
            )
        }
    };

    const handleChange1 = (event) => {
        setChosenStation(event.target.value);
    }

    const handleChange2 = (event) => {
        setChosenBike(event.target.value);
        setInfo({ ...info, bikeId: event.target.value })
    }

    const handleChange3 = (event) => {
        setChosenEnd(event.target.value);
    }


    const menuItems = stationData.map(item => (
        <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
    ));

    const menuItemsBikes = bikeData.map((item, i) => (
        <MenuItem key={i} value={i}>{item}</MenuItem>
    ));

    const menuItemsEnd = endStationData.map(item => (
        <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
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
                    label="Choose station"
                    onOpen={getStations}
                    onChange={handleChange1}
                >
                    {menuItems}
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
        </Container>
    );
}

export default StartRide;