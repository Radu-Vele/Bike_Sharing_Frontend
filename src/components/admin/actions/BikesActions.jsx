import { useState } from "react";
import { ToggleButton, Grid, Table, TextField, Typography, Button } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import RoundedShadowBox from "../../../custom_components/RoundedShadowBox";

const BikesActions = () => {
    const [rows, setRows] = useState([]);

    return (
        <Grid container spacing={2} p={2} >
            <Grid item xs={12}>
                <Grid container spacing={2} p={2} >
                    <Grid item xs={12}>
                        <ToggleButton
                            variant="contained"
                        >
                            <FilterAlt/> Filter Bikes
                        </ToggleButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <RoundedShadowBox>

                </RoundedShadowBox>
            </Grid>
        </Grid>
    )
}

export default BikesActions;