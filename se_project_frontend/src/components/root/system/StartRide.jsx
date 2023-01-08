import * as React from 'react';
import { Button } from '@mui/material';
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
    
    const [chosenStation, setChosenStation] = useState("");
    const [chosenBike, setChosenBike] = useState("");
    const [chosenEnd, setChosenEnd] = useState("");

    const [stationData, setStationData] = useState([]);

    const [bikeData, setBikeData] = useState([]);
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
                console.log(stationData);
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

        const getBikes = async() => {
            try {
                
                console.log("got here")
                const response = await axios.get("/get-usable-bikes", {params: { stationId: this.chosenStation } });
                console.log("got here x2")
                let arr = [];
                if (response.data.length > 0) {
                    let availableUsableBikes = response.data;
                    for (const iterator of availableUsableBikes) {
                        //let temp = iterator.id;
                        arr.push(iterator.id);             
                    }
                    setBikeData(arr);
                    console.log(bikeData);
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

    const submitHandler = async (event) => {
        event.preventDefault();

        let errors = validate(info);
        setErrors(errors);

        if(Object.keys(errors).length === 0) {

            setInfo.startStationId(chosenStation);
            info.bikeId = chosenBike;
            info.endStationId = chosenEnd;
            const response = await StartRideService(info);
            if (response.status === 201) {
            }
            else {
              console.log(errors);
            }

        }
        else console.log(errors);
    };

    const handleChange1 = (event) => {
        setChosenStation(event.target.value);
        console.log(event.target.value);
    }

    const handleChange2 = (event) => {
        setChosenBike(event.target.value);
        console.log(event.target.value);
    }

    const menuItems = stationData.map(item => (
        <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
      ));

      const menuItemsBikes = bikeData.map(item => (
        <MenuItem>{item.id}</MenuItem>
      ));      

    return (
        <Container variant="main" maxWidth = "xl">
        <FormControl sx={{ m: 1, minWidth: 300}}>
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
        <FormControl sx={{ m: 1, minWidth: 300}}>
            <InputLabel id="chosen-bike-id">Choose a bike</InputLabel>
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
        <FormControl sx={{ m: 1, minWidth: 300}}>
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