import React, { useState, useEffect } from "react";
import {Typography, Grid, Button} from "@mui/material";
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Home from './Home';
import Movies from './Movies';
import { addMovie, getMovies } from '../services/Movie.service';
import CreateMovie from './CreateMovie';

const useStyles = makeStyles(theme =>
({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey["100"],
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundPosition: "0 400px",
        paddingBottom: 200
    },
    
    grid: {
    width: 1200,
    margin: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down("sm")]: {
        width: "calc(100% - 20px)"
    }},
    
    topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
    },
    
    block: {
    padding: theme.spacing(2)
    },
    
    outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
    },
}));


function MoviesHome (props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [movies, setMovies] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [ onLoad, setOnLoad] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleCreate = async (payload) => {
        try{
            setOnLoad(true);
            const res = await addMovie(payload);
            if (res) {
                handleGetMovies();
                handleClose();
            }
        } catch(err) {
            console.log(err);
        } finally {
            setOnLoad(false);
        }
    };

    const handleGetMovies = async () => {
        try{
            const res = await getMovies();
            setMovies(res.data.movies);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleGetMovies();
    },[])


    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Home>
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid
                    spacing={10}
                    alignItems="center"
                    justify="center"
                    container
                    className={classes.grid}
                    >
                        <Grid item xs={12}>
                            <div className={classes.topBar}>
                                <div className={classes.block}>
                                    <Typography variant="h6" gutterBottom>
                                        Welcome!
                                    </Typography>
                                    <Typography variant="body1">
                                        Add new and see existing movies
                                    </Typography>
                                </div>
                                <div>
                                    <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleClickOpen}
                                    className={classes.outlinedButtom}
                                    >
                                    Add New Movie
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Movies movies={movies}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            
            <CreateMovie 
                setDisabled={setDisabled} 
                open={open}
                onClose={handleClose}
                cancel={handleClose}
                submit={handleCreate}
                disabled={disabled}
                onLoad={onLoad}
                setOnLoad={setOnLoad}
            />
    
        </Home>
    );
}

export default MoviesHome;