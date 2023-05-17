import { useState, useEffect } from "react";
import { ToggleButton, Box, Grid, Table, TextField, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FetchBikesData from "../../../api/admin/dashboard/FetchBikesData";

const BikesActions = () => {
    const [rows, setRows] = useState([]);
    const [filters, setFilters] = useState({
        hostStation: "",
        externalId: "",
        onlyUsable: false,
        onlyNotUsable: false
    })
    const [filtersErrors, setFiltersErrors] = useState({
        bool_external_id_error : false, 
        external_id_error : "",
        bool_host_station_error: false,
        host_station_error : ""
    })

    useEffect(() => {
        async function fetchData() {
            await FetchBikesData(filters).then((response) => {
                console.log(response.status)
                if (response.status === 200) {
                  populateTable(response);
                }
              })
              .catch((err) => {
                setRows([]);
              });
        }

        const errors = validateFilters();
        setFiltersErrors(errors);
        if(Object.keys(errors).length === 0) {
            fetchData();
        }
    }, [filters])
    
    function validateFilters() {
        const errors = {}
        
        if(filters.externalId !== "") {
            if (!/^\d+$/.test(filters.externalId)) {
                errors.bool_external_id_error = true
                errors.external_id_error = "Need to have the external ID as an integer";
            }
        }

        return errors;
    }

    function populateTable(response) {
        //TODO: populate table
    }

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
                                            value={filters.externalId}
                                            onChange= {(e) => setFilters({ ...filters, externalId: e.target.value })}
                                            error = {filtersErrors.bool_external_id_error}
                                            helperText={filtersErrors.external_id_error} 
                                        >
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                                //TODO: replace with a dropdown menu
                                                margin="normal"
                                                fullWidth
                                                id="host-station-filter"
                                                label="Host station"
                                                name="host-station"
                                                autoComplete="host-station"
                                                autoFocus
                                                value={filters.hostStation}
                                                onChange={(e) => setFilters({ ...filters, hostStation: e.target.value })}
                                                error = {filtersErrors.bool_host_station_error}
                                                helperText={filtersErrors.host_station_error} 
                                        >   
                                        </TextField>
                                    </Grid>
                                    <Grid item xs = {6}>
                                        <Grid container p={1}>
                                            <Grid item xs={6}>
                                                <FormControlLabel control={<Checkbox
                                                    onChange={(e) => {
                                                            if(e.target.checked && filters.onlyNotUsable) {
                                                                setFilters({ ...filters, onlyNotUsable: false,  onlyUsable: e.target.checked});
                                                            }
                                                            else {
                                                                setFilters({ ...filters, onlyUsable: e.target.checked});
                                                            }
                                                        }
                                                    } 
                                                    checked={filters.onlyUsable}
                                                />} label="Usable Only" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControlLabel control={<Checkbox 
                                                    onChange={(e) => {
                                                        if(e.target.checked && filters.onlyUsable) {
                                                            setFilters({ ...filters, onlyNotUsable: e.target.checked,  onlyUsable: false});
                                                        }
                                                        else {
                                                            setFilters({ ...filters, onlyNotUsable: e.target.checked});
                                                        }
                                                        }
                                                    } 
                                                    checked={filters.onlyNotUsable}
                                                />} label="Broken Only" />
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

                    }
                    
                </Box>
            </Grid>
        </Grid>
    )
}

export default BikesActions;