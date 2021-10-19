import React, {useState} from 'react';
import { makeStyles } from '@mui/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {Typography, TableCell, TableRow, Button, Box, Grid, Rating, Chip, TextField, } from "@mui/material";
import MovieDialog from './MovieDialog';

const useStyles = makeStyles(theme =>
    ({
        icon: {
            marginTop: '20%',
            marginLeft: '20%',
        },
        chip: {
            marginTop: '6px',
            marginRight: '6px',
        },
        text: {
            marginBottom: theme.spacing(1),
            color: "primary"
        },
        content: {
            marginLeft: theme.spacing(1),
        }
    }
    ));

export default function MovieTableRow(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <TableRow>
                <TableCell align="center">{props.movie.name}</TableCell>
                <TableCell align="center">{props.movie.genre.name}</TableCell>
                <TableCell align="center">

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClickOpen}
                    >
                        See Details
                    </Button>

                <MovieDialog
                    open={open}
                    onClose={handleClose}
                    title={props.movie.name}
                >
                    <Box>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                    <Typography component="legend">Genre:</Typography>
                                    <Chip className={classes.content} label={props.movie.genre.name} color="secondary"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component="legend">Raiting:</Typography>
                                    <Rating className={classes.content} value={props.movie.rating} precision={0.5} readOnly />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography component="legend">Cast & Crew:</Typography>
                                        </Grid>
                                        <Grid item xs={12} className={classes.content}>
                                            {props.movie.cast.map((cast, index) => (
                                                <Chip key={index} label={cast} className={classes.chip} color="primary"/>
                                            ))}
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component="legend" className={classes.text}>Release Date:</Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                        <DatePicker
                                            readOnly
                                            value={props.movie.releaseDate}
                                            renderInput={(params) => <TextField {...params} className={classes.content}/>}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Box>
                </MovieDialog>
                </TableCell>
            </TableRow>
        </>
    );
}