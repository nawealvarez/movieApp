import React from 'react';
import {Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { makeStyles } from '@mui/styles';
import MovieTableRow from './MovieTableRow';

const useStyles = makeStyles(theme =>
  ({
      title: {
        color: "primary",
        fontSize: "25px",
      },
      text: {
        fontSize: "20px",
      }
  }
  ));

export default function Movies(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.title} align="center">Movies</Typography>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell className={classes.text} align="center">Name</TableCell>
            <TableCell className={classes.text} align="center">Genre</TableCell>
            <TableCell className={classes.text} align="center">Details</TableCell>
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