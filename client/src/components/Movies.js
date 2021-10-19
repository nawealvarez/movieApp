import React from 'react';
import {Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import MovieTableRow from './MovieTableRow';

export default function Movies(props) {

  return (
    <React.Fragment>
      <Typography align="center">Movies</Typography>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Genre</TableCell>
            <TableCell align="center">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.movies.map((movie) => (
                <MovieTableRow key={movie.id} movie={movie}/>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}