import { useState } from "react";
import { ToggleButton, Box, Grid, Table, TextField, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BikesActions = () => {
    const [rows, setRows] = useState([]);
    const [filters, setFilters] = useState({
        hostStation: "",
        bikeId: -1,
        onlyUsable: false,
        onlyNotUsable: false
    })



    return (
        <Grid container spacing={2} p={2} >
            <Grid item xs={12}>
                <Grid container spacing={1} p={0} >
                    <Grid item xs={12}>
                        <Accordion      
                            square={true}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <FilterAlt/> Filters
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1} p={0}>
                                    <Grid item xs={3}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="external-id-filter"
                                            label="External ID"
                                            name="external-id"
                                            autoComplete="external-id"
                                            autoFocus
                                            // value={editStationName}
                                            // onChange={(e) => {setEditStationName(e.target.value);}}
                                            // error = {editStationErrors.bool_name_error}
                                            // helperText={editStationErrors.name_error} 
                                        >

                                        </TextField>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                                margin="normal"
                                                fullWidth
                                                id="host-station-filter"
                                                label="Host station"
                                                name="host-station"
                                                autoComplete="host-station"
                                                autoFocus
                                                // value={editStationName}
                                                // onChange={(e) => {setEditStationName(e.target.value);}}
                                                // error = {editStationErrors.bool_name_error}
                                                // helperText={editStationErrors.name_error} 
                                        >
                                            
                                        </TextField>
                                    </Grid>
                                    <Grid item xs = {6}>
                                        <Grid container p={1}>
                                            <Grid item xs={6}>
                                                <FormControlLabel control={<Checkbox />} label="Usable Only" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControlLabel control={<Checkbox />} label="Broken Only" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Box
                    boxShadow={3} 
                    bgcolor="background.paper" 
                    p={3}
                    justifyContent="center"
                    alignItems="center"
                >
                    {rows.length === 0 &&
                    <Typography>
                        No items found
                    </Typography>
                    }
                    {
                        // add table with the results from queriyng the bikes based on filters
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default BikesActions;