import React from "react";
import {Typography, Grid, Button} from "@mui/material";
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Home from './Home';
import Orders from './Orders';

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


function MoviesHome () {
    const classes = useStyles();
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
                                    className={classes.outlinedButtom}
                                    >
                                    Add New Movie
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Orders />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Home>
    );
}

export default MoviesHome;