import { useState } from 'react'
import { Button, Typography, Grid, Divider, ToggleButton } from "@mui/material"
import ImportInitialStations from "../../../api/admin/ImportInitialStations"
import RoundedShadowBox from '../../../custom_components/RoundedShadowBox';
import BikesActions from './BikesActions';
import StationsActions from './StationsActions';

const ManageBikesStations = () => {
    const[success, setSuccess] = useState(false);
    const[error, setError] = useState(false);
    const[response, setResponse] = useState({});
    const[stationsToggle, setStationsToggle] = useState(false);
    const[bikesToggle, setBikesToggle] = useState(false);

    const handleImportInitial = async (event) => {
        await ImportInitialStations()
        .then((response) => {
            if (response.status === 201) {
              setSuccess(true);
              setError(false);
            }
            setError(true);
            setResponse(response);
          })
          .catch((err) => {
              setSuccess(false);
              setError(true);
          });
    }

    return (
    <>
        <Grid container spacing={2} p={2} >
            <Grid item xs={12}>
                <Typography variant="h4">
                    Manage the Bikes and Stations
                </Typography>        
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <RoundedShadowBox>
                    <Typography variant="h6">
                        Bikes Actions
                    </Typography>
                    <Divider/>
                    <ToggleButton 
                        value="check"
                        selected={bikesToggle}
                        onChange={() => {setBikesToggle(!bikesToggle);}}
                        color={"primary"}
                    >
                        Toggle View
                    </ToggleButton>
                    <div hidden={!bikesToggle}>
                        <BikesActions/>
                    </div>
                </RoundedShadowBox>
            </Grid>
            <Grid item xs={12}>
                <RoundedShadowBox>
                    <Typography variant="h6">
                        Stations Actions
                    </Typography>
                    <Divider/>
                    <ToggleButton
                        value="check"
                        selected={stationsToggle}
                        onChange={() => {setStationsToggle(!stationsToggle);}}
                        color={"primary"}
                    >
                        Toggle View
                    </ToggleButton>
                    <div hidden={!stationsToggle}>
                        <StationsActions/>
                    </div>
                </RoundedShadowBox>
            </Grid>
            <Grid item xs={12}>
                <RoundedShadowBox
                    p={2}
                    textAlign="center"
                >
                    <Typography variant="h6">
                        Import initial stations and bikes   
                    </Typography>
                    <Divider/>
                    <Typography
                        hidden={!success}
                        color="success"
                    >
                    Stations initiallized successfully!
                    </Typography>
                    <Typography
                        hidden={!error}
                        color="error"
                    >
                        {response.body}
                    </Typography>

                    <br></br>
                    <Button
                        variant="contained"
                        onClick={handleImportInitial}
                    >
                        Import from CSV
                    </Button>
                </RoundedShadowBox>
            </Grid>
        </Grid>
    </>
    )
}

export default ManageBikesStations;