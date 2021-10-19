import React, {useState} from 'react';
import {Typography, Link, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import MovieDialog from './MovieDialog';
import MovieTableRow from './MovieTableRow';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];


export default function Orders() {

  return (
    <React.Fragment>
      <Typography align="center">Movies</Typography>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Ship To</TableCell>
            <TableCell align="center">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, ) => (
                <MovieTableRow key={row.id} id={row.id} date={row.date} name={row.name} shipTo={row.shipTo}/>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}