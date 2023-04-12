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
    /**
     * Control the display mode of the grid line containing the map an either the:
     * - edit dialog
     * - add new station dialog
     */
    const [gridRowDistribution, setGridRowDistribution] = useState({
        map: 12,
        edit_dialog: 0,
        new_station_dialog:0
    });
    // New bike dialog state
    const [pickCoordinatesOn, setPickCoordinatesOn] = useState(false);
    const [pickedCoordinates, setPickedCoordinates] = useState({
        lat:-1,
        lng:-1
    });
    const [newStationName, setNewStationName] = useState("");
    const [newStationCapacity, setNewStationCapacity] = useState(-1);
    const [newStationErrors, setNewStationErrors] = useState({
        bool_coordinates_not_selected: false,
        coordinates_not_selected: "",
        bool_name_error: false,
        name_error: "",
        bool_capacity_error: false,
        capacity_error: ""
    });
    const [halfFilledCheck, setHalfFilledCheck] = useState(false);
    const [persistInCSVCheck, setPersistInCSVCheck] = useState(false);
    const [newStationSuccess, setNewStationSuccess] = useState({
        bool: false,
        message: "New station successfully added. Refresh the map and close this dialog."
    });
    const [newStationSubmitError, setNewStationSubmitError] = useState({
        bool: false,
        message: ""
    });
    const [deleteStationSuccess, setDeleteStationSuccess] = useState({
        bool: false,
        message: "Station deleted successfully. Refresh the map and close this dialog."
    });
    const [deleteStationError, setDeleteStationError] = useState({
        bool: false,
        message: ""
    });

    /**
     * Called when the edit station modified (set or set to null)
     */
    useEffect(() => {
        if(selectedEditStation !== null) {
            setGridRowDistribution({ ...gridRowDistribution, map:8, edit_dialog:4, new_station_dialog:0 });
        }
        else if(pickCoordinatesOn) {
            setGridRowDistribution({ ...gridRowDistribution, map:8, edit_dialog:0, new_station_dialog:4 });
        }
        else {
            setGridRowDistribution({ ...gridRowDistribution, map:12, edit_dialog:0, new_station_dialog:0 });
        }
    }, [selectedEditStation]);

    // Callback functions for interacting with the map module ---
    const handleEditStationChange = (station_name) => {
        setSelectedEditStation(station_name);
    };
    const handlePickCoordinatesOn = (buttonValue) => {
        setPickCoordinatesOn(buttonValue);
        if(buttonValue === true) {
            if(selectedEditStation === null) {
                setGridRowDistribution({ ...gridRowDistribution, map:8, edit_dialog:0, new_station_dialog:4 });
            }
            setSelectedEditStation(null);
        }
        else {
            setPickedCoordinates({...pickedCoordinates, lat: -1, lng: -1});
            setNewStationErrors({...newStationErrors,
                bool_coordinates_not_selected: false,
                coordinates_not_selected: "",
                bool_name_error: false,
                name_error: "",
                bool_capacity_error: false,
                capacity_error: ""});
            setNewStationSuccess({...newStationSuccess, bool: false});
            setNewStationSubmitError({...newStationSubmitError, bool: false, message: ""});
            setGridRowDistribution({ ...gridRowDistribution, map:12, edit_dialog:0, new_station_dialog:0 });
        }
    };
    const handlePickedCoordinates = (obj) => {
        setPickedCoordinates(obj);
    };
    // ---
    
    const handleCloseEditDialog = () => {
        setDeleteStationError({...deleteStationError, bool: false, message:""});
        setDeleteStationSuccess({...deleteStationSuccess, bool: false});
        setSelectedEditStation(null);
    };

    function validateAddStationInput() {
        const errors = {}
        if(pickedCoordinates.lat === -1 || pickCoordinatesOn.lng === -1) {
            errors.bool_coordinates_not_selected = true;
            errors.coordinates_not_selected = "You must select a location on the map.";
        }

        if(newStationName === "") {
            errors.bool_name_error = true;
            errors.name_error = "You must input a station name";
        }
        
        if((!/^\d+$/im.test(newStationCapacity))) {
            errors.bool_capacity_error = true;
            errors.capacity_error = "The capacity must be a positive number";
        }
        else if(newStationCapacity === -1) {
            errors.bool_capacity_error = true;
            errors.capacity_error = "You must input a valid capacity";
        }

        return errors;
    }

    const handleAddStationSubmit = async (event) => {    
        event.preventDefault();  
        const errors = validateAddStationInput();
        setNewStationErrors(errors);      
        if(Object.keys(errors).length === 0) {
            setNewStationSubmitError("");           
            const response = await AddNewStation(pickedCoordinates.lat, 
                pickedCoordinates.lng, 
                newStationCapacity,
                newStationName, 
                persistInCSVCheck,
                halfFilledCheck);

            if (response.status !== 201) {
                setNewStationSubmitError({...newStationSubmitError, bool: true, message: response.data});
                setNewStationSuccess({...newStationSuccess, bool: false});
            }
            else {  
                setNewStationSuccess({...newStationSuccess, bool: true});
                setNewStationSubmitError({...newStationSubmitError, bool: false, message: ""});
            }
        }
    }

    const handleDeleteStation = async () => {
        const response = await DeleteStation(selectedEditStation);
        if(response.status !== 200) {
            setDeleteStationError({...deleteStationError, bool: true, message: response.data});
            setDeleteStationSuccess({...deleteStationSuccess, bool: false});
        }
        else {
            setDeleteStationSuccess({...deleteStationSuccess, bool: true});
            setDeleteStationError({...deleteStationError, bool: false, message: ""});
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
                        { deleteStationSuccess.bool && 
                            <Typography color="success">
                                { deleteStationSuccess.message }
                            </Typography>
                        }
                        { deleteStationError.bool &&
                            <Typography color="error">
                                { deleteStationError.message }
                            </Typography>
                        }
                    </RoundedShadowBox>
                </Grid>

                <Grid hidden={gridRowDistribution.new_station_dialog === 0} item xs={gridRowDistribution.new_station_dialog}>
                    <RoundedShadowBox>
                        <Typography variant="h6">
                            Add New Station
                        </Typography>
                        <Divider/>
                        <Typography>
                            Coordinates:
                        </Typography>
                        <Typography>
                            {pickedCoordinates.lat}
                        </Typography>            
                        <Typography>
                            {pickedCoordinates.lng}
                        </Typography> 
                        { newStationErrors.bool_coordinates_not_selected &&
                            <Typography color="error">
                                {newStationErrors.coordinates_not_selected}
                            </Typography>
                        }
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="station-name"
                            label="Station Name"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setNewStationName(e.target.value)}
                            error = {newStationErrors.bool_name_error}
                            helperText={newStationErrors.name_error} 
                        >
                            Station Name 
                        </TextField>  
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="station-capacity"
                            label="Station Capacity"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setNewStationCapacity(e.target.value)}
                            error = {newStationErrors.bool_capacity_error}
                            helperText={newStationErrors.capacity_error}
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
                        {newStationSuccess.bool && <Typography color="success">
                            {newStationSuccess.message}
                        </Typography>}
                        {newStationSubmitError.bool &&
                            <Typography color="error">
                                {newStationSubmitError.message} 
                            </Typography>
                        }
                    </RoundedShadowBox>
                </Grid>
            </Grid>
        </>
    )
}

export default StationsActions;