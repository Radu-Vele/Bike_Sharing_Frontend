import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  id,
  s_time,
  s_station,
  e_time,
  e_station,
  bike
) {
  return { id, s_time, s_station, e_time, e_station, bike };
}

const rows = [
  createData('-', '-', '-', '-', '-', '-')
];

export default function BasicTable() {
  return (
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
  );
}
