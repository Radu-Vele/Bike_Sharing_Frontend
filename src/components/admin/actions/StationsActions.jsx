import { Grid, Typography } from "@mui/material";
import BasicMap from "../../fragments/BasicMap";

const StationsActions = () => {
    return (
        <>
            <Typography>
                Stations Add (pick from map) / Edit name / Delete (pick from map)
            </Typography>
            <Grid container spacing={2} p={2} >
                <Grid item xs={12}>
                    <BasicMap stationsArray={[]}/>
                </Grid>
            </Grid>
        </>
    )
}

export default StationsActions;