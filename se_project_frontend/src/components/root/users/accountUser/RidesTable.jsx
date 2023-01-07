import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Collapse, Typography } from "@mui/material";
import {IconButton} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { useState } from "react";
import RidesHistoryService from '../../../../api/users/RidesHistoryService';

export default function RidesTable() {
  
  const rows = [];

  function createData(
    id,
    s_time,
    s_station_id,
    e_time,
    e_station_id,
    bike_id
  ) {
    return { id, s_time, s_station_id, e_time, e_station_id, bike_id};
  }
  
  function populateTable(response) {
    rows += createData(response[0])
  }

  
  const [ridesListPresent, setRidesListPresent] = useState(false);
  const [ridesOpen, setRidesOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleCollapseOpen = async (event) => {
    if(ridesOpen) {
      setRidesOpen(!ridesOpen);
    }
    else {
      if(!ridesListPresent) {
        await RidesHistoryService()
        .then((response) => {
          if (response.status === 201) {
            //populate table
            setRidesListPresent(true);
            setRidesOpen(true);
          }
        })
        .catch((err) => {
          setRidesOpen(false);
          setError(true);
          setRidesListPresent(false);
        });
      }
    }
  }

  return (
  <Box>

    <Typography color="error" hidden={!error}>
      Failed to get rides history
    </Typography>

    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleCollapseOpen}
          >
              {ridesOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
      
      <TableCell align="left">
          See all your rides (click to unfold)
      </TableCell>               
    </TableRow>

    <Collapse in={ridesOpen} timeout="auto" unmountOnExit>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ride ID</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">Start Station</TableCell>
              <TableCell align="right">Finish Time</TableCell>
              <TableCell align="right">Finish Station</TableCell>
              <TableCell align="right">Bike Used</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.s_time}</TableCell>
                <TableCell align="right">{row.s_station}</TableCell>
                <TableCell align="right">{row.e_time}</TableCell>
                <TableCell align="right">{row.e_station}</TableCell>
                <TableCell align="right">{row.bike}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Collapse>
  </Box>
  );
}
