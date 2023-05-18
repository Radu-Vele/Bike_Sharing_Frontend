import { useState, useEffect } from "react";
import { ToggleButton, Box, Grid, TextField, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel, TablePagination } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FetchBikesData from "../../../api/admin/dashboard/FetchBikesData";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


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

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(() => {
        async function fetchData() {
            await FetchBikesData(filters).then((response) => {
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

    function createBikeEntry(externalId, usable, available, rating) {
        return {externalId, usable, available, rating}
    }

    function populateTable(response) {
        const arr = [];
        for(let i = 0; i < response.data.length; i++) {
            arr.push(createBikeEntry(response.data[i].externalId,
                response.data[i].usable.toString(),
                response.data[i].available.toString(),
                response.data[i].rating));
        }
        console.log(arr);
        setRows(arr);
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
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell align="right">External ID</TableCell>
                                <TableCell align="right">Usable</TableCell>
                                <TableCell align="right">Available</TableCell>
                                <TableCell align="right">Rating</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow
                                            key={row.externalId}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right">{row.externalId}</TableCell>
                                            <TableCell align="right">{row.usable}</TableCell>
                                            <TableCell align="right">{row.available}</TableCell>
                                            <TableCell align="right">{row.rating}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default BikesActions;