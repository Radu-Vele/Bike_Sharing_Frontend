import { Button, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import BasicMap from "../../fragments/BasicMap";
import { useState, useEffect } from "react";
import RoundedShadowBox from "../../../custom_components/RoundedShadowBox";
import CloseIcon from '@mui/icons-material/Close';

const StationsActions = () => {

    const [selectedEditStation, setSelectedEditStation] = useState(null);
    const [pickCoordinatesOn, setPickCoordinatesOn] = useState(false);
    const [gridRowDistribution, setGridRowDistribution] = useState({
        map: 12,
        edit_dialog: 0,
        new_station_dialog:0
    });

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
        setGridRowDistribution({...gridRowDistribution, map:12, dialog:0 });
    };


    return (
        <>
            <Typography>
                Stations Add (pick from map) / Edit name / Delete (pick from map)
            </Typography>
            <Grid container spacing={2} p={2} >
                <Grid item xs={gridRowDistribution.map}>
                    <RoundedShadowBox>
                        <BasicMap editMode={true} setSelectedEditStation={handleEditStationChange} handlePickCoordinatesOn={handlePickCoordinatesOn}/>
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
                        <Button variant="contained">
                            Rename Station
                        </Button>
                        <br></br>
                        <br></br>
                        <Button variant="contained">
                            Delete Station
                        </Button>
                    </RoundedShadowBox>
                </Grid>

                <Grid hidden={!pickCoordinatesOn} item xs={gridRowDistribution.new_station_dialog}>
                    <RoundedShadowBox>
                        <Typography variant="h6">
                            Currently picked coordinates are: 
                        </Typography>            
                        <Divider/>
                        <br></br>        
                        <Button variant="contained">
                            Add Station Here
                        </Button>
                    </RoundedShadowBox>
                </Grid>
            </Grid>
        </>
    )
}

export default StationsActions;