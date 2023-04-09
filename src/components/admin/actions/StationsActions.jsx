import { Button, Checkbox, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import BasicMap from "../../fragments/BasicMap";
import { useState, useEffect } from "react";
import RoundedShadowBox from "../../../custom_components/RoundedShadowBox";
import CloseIcon from '@mui/icons-material/Close';
import {FormGroup , FormControlLabel} from "@mui/material";
import AddNewStation from "../../../api/admin/actions/AddNewStation";
import DeleteStation from "../../../api/admin/actions/DeleteStation";

const StationsActions = () => {

    const [selectedEditStation, setSelectedEditStation] = useState(null);
    const [pickCoordinatesOn, setPickCoordinatesOn] = useState(false);
    const [gridRowDistribution, setGridRowDistribution] = useState({
        map: 12,
        edit_dialog: 0,
        new_station_dialog:0
    });
    const [pickedCoordinates, setPickedCoordinates] = useState({
        lat:0,
        lng:0
    });
    const [addStationName, setAddStationName] = useState("");
    const [addStationCapacity, setAddStationCapacity] = useState(-1);
    const [addStationErrors, setAddStationErrors] = useState({
        name_error: "",
        capacity_error: ""
    });
    const [halfFilledCheck, setHalfFilledCheck] = useState(false);
    const [persistInCSVCheck, setPersistInCSVCheck] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [addStationSubmitError, setAddStationSubmitError] = useState("");
    const [deleteStationSuccess, setDeleteStationSuccess] = useState(false);
    const [deleteStationError, setDeleteStationError] = useState("");

    useEffect(() => {
        if(selectedEditStation !== null) {
            setGridRowDistribution({ ...gridRowDistribution, map:8, edit_dialog:4, new_station_dialog:0 });
        }
    }, [selectedEditStation]);

    const handleEditStationChange = (station_name) => {
        setSelectedEditStation(station_name);
    };

    const handlePickCoordinatesOn = (buttonValue) => {
        setPickCoordinatesOn(buttonValue);
        if(buttonValue === true) {
            setGridRowDistribution({ ...gridRowDistribution, map:8, edit_dialog:0, new_station_dialog:4 });
        }
        else {
            setGridRowDistribution({ ...gridRowDistribution, map:12, edit_dialog:0, new_station_dialog:0 });
        }
    }

    const handleCloseEditDialog = () => {
        setSelectedEditStation(null);
        setDeleteStationError("");
        setDeleteStationSuccess(false);
        setGridRowDistribution({...gridRowDistribution, map:12, dialog:0 });
    };

    const handlePickedCoordinates = (obj) => {
        setPickedCoordinates(obj);
    }

    function validateAddStationInput() {
        
        if(addStationName === "") {
            setAddStationErrors({...addStationErrors, name_error:"You must input a station name"});
            return false;
        }
        if((!/^\d+$/im.test(addStationCapacity))) {
            setAddStationErrors({...addStationErrors, capacity_error:"The capacity must be a positive number"});
            return false;
        }
        else if(addStationCapacity === -1) {
            setAddStationErrors({...addStationErrors, capacity_error:"You must input a valid capacity"});
            return false;
        }
        return true;
    }

    const handleAddStationSubmit = async () => {
        if(validateAddStationInput()) {
            setAddStationSubmitError("");
            setAddStationErrors({...addStationErrors, name_error:"", capacity_error:""})
            const response = await AddNewStation(pickedCoordinates.lat, 
                pickedCoordinates.lng, 
                addStationCapacity,
                addStationName, 
                persistInCSVCheck,
                halfFilledCheck);
            if (response.status !== 201) {
                setAddStationSubmitError(response.data);
                setAddSuccess(false);
            }
            else {  
                setAddSuccess(true);
            }
        }
    }

    const handleDeleteStation = async () => {
        const response = await DeleteStation(selectedEditStation);
        if(response.status !== 200) {
            setDeleteStationError("Station not present");
            setDeleteStationSuccess(false);
        }
        else {
            setDeleteStationSuccess(true);
            setDeleteStationError("");
            setSelectedEditStation(null);
        }
    }

    return (
        <>
            <Typography>
                Stations Add (pick from map) / Edit name / Delete (pick from map)
            </Typography>
            <Grid container spacing={2} p={2} >
                <Grid item xs={gridRowDistribution.map}>
                    <RoundedShadowBox>
                        <BasicMap 
                            editMode={true} 
                            setSelectedEditStation={handleEditStationChange} 
                            handlePickCoordinatesOn={handlePickCoordinatesOn}
                            setPickedCoordinates={handlePickedCoordinates}
                        />
                    </RoundedShadowBox>
                </Grid>
                <Grid hidden={gridRowDistribution.edit_dialog===0} item xs={gridRowDistribution.edit_dialog}>
                    <RoundedShadowBox>
                        <IconButton  color={"error"} onClick={handleCloseEditDialog}>
                            <CloseIcon/>
                        </IconButton>  
                        <Typography variant="h6"> Edit station {selectedEditStation}:</Typography>
                        <Divider/>
                        <br></br>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="station-name-input"
                            label="New Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            // onChange={}
                            // error = {errors.name_err}
                            // helperText={errors.legalName} 
                        >
                            New Name
                        </TextField>
                        <br></br>
                        <Button variant="contained">
                            Rename Station
                        </Button>
                        <br></br>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="station-capacity-input"
                            label="New Capacity"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            // onChange={}
                            // error = {errors.name_err}
                            // helperText={errors.legalName} 
                        >
                            New Name
                        </TextField>
                        <br></br>
                        <Button variant="contained">
                            Change Capacity
                        </Button>
                        <br></br>
                        <br></br>
                        <Divider/>
                        <br></br>
                        <Button variant="contained" onClick={handleDeleteStation}>
                            Delete Station
                        </Button>
                        {deleteStationSuccess && 
                            <Typography color="success">
                                Station Deleted Successfully.
                            </Typography>
                        }
                        <Typography color="error">
                            {deleteStationError}
                        </Typography>
                    </RoundedShadowBox>
                </Grid>

                <Grid hidden={!pickCoordinatesOn} item xs={gridRowDistribution.new_station_dialog}>
                    <RoundedShadowBox>
                        <Typography variant="h6">
                            Add New Station
                        </Typography>
                        <Divider/>
                        <Typography>
                            Location:
                        </Typography>
                        <Typography>
                            Lat: {pickedCoordinates.lat}
                        </Typography>            
                        <Typography>
                            Long: {pickedCoordinates.lng}
                        </Typography> 
                        <TextField
                            margin="normal"
                            fullWidth
                            id="station-name"
                            label="Station Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setAddStationName(e.target.value)}
                            error = {addStationErrors.name_error !== ""}
                            helperText={addStationErrors.name_error} 
                        >
                            Station Name
                        </TextField>  
                        <TextField
                            margin="normal"
                            fullWidth
                            id="station-capacity"
                            label="Station Capacity"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setAddStationCapacity(e.target.value)}
                            error = {addStationErrors.capacity_error !== ""}
                            helperText={addStationErrors.capacity_error}
                        >
                            Station Name
                        </TextField>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox onChange={(e) => setHalfFilledCheck(e.target.checked)}/>} label="Half-fill station with new bikes" />
                            <FormControlLabel control={<Checkbox onChange={(e) => setPersistInCSVCheck(e.target.checked)}/>} label="Save station to initialization csv" />
                        </FormGroup>
                        <Button variant="contained" onClick={handleAddStationSubmit}>
                            Add Station Here
                        </Button>
                        {addSuccess && <Typography color="success">
                            Station added successfuly.
                        </Typography>}
                        <Typography color="error">
                            {addStationSubmitError} 
                        </Typography>
                    </RoundedShadowBox>
                </Grid>
            </Grid>
        </>
    )
}

export default StationsActions;