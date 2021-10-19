import React, { useState, useEffect } from 'react';
import { useMediaQuery, Typography, Grid, Button, InputLabel, MenuItem, FormControl, Select, Box, TextField, Chip, Rating, CircularProgress, Backdrop, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AddCircle } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getGenres } from '../services/Movie.service';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const useStyles = makeStyles(theme =>
    ({
        icon: {
            marginTop: '20%',
            marginLeft: '20%',
        },
        chip: {
            marginTop: '6px',
        },
        text: {
            marginLeft: theme.spacing(1),
            color: "primary"
        }
    }
    ));

export default function CreateMovie(props) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [date, setDate] = useState();
    const [name, setName] = useState();
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState();
    const [cast, setCast] = useState();
    const [list, setList] = useState("");
    const [castList, setCastList] = useState([]);

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeGenre = (e) => {
        console.log(e.target.value);
        setGenre(e.target.value);
    };

    const handleChangeCast = (e) => {
        setCast(e.target.value);
    };

    const handleChangeRaiting = (e) => {
        setRating(e.target.value);
    }

    const handleAddToCastList = () => {
        if (cast) {
            setCastList([...castList, cast]);
            setCast("");
        }
    };

    const handleDeleteChip = (i) => {
        const newCastList = castList;
        castList.splice(i, 1);
        setCastList([...newCastList]);
    };

    const handleGetGenres = async () => {
        try {
            props.setOnLoad(true);
            const res = await getGenres();
            setList(res.data.genres);
        } catch (err) {
            console.log(err);
        } finally {
            props.setOnLoad(false);
        }
    }

    useEffect(() => {
        console.log(castList);
      }, [castList]);

    useEffect(() => {
        if (name && date && genre && rating && castList.length > 0) {
            props.setDisabled(false); 
          } else {
            props.setDisabled(true);
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [name,date,genre,rating, castList,]);

      useEffect(() => {
        handleGetGenres();
      }, []);

    return(
        <>
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    {"Create your movie"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    onChange={handleChangeName}
                                    label="Name"
                                    autoComplete="name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={genre}
                                        label="Genre"
                                        onChange={handleChangeGenre}
                                        >
                                            {list && list.map((item) => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))} 
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.text}>Raiting</Typography>
                                    <Rating name="half-rating" onChange={handleChangeRaiting} defaultValue={2.5} precision={0.5} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container direction="row" alignItems="stretch" style={{ display: "flex" }}>
                                        <Grid item xs={11}>
                                            <TextField
                                                required
                                                fullWidth
                                                value={cast}
                                                onChange={handleChangeCast}
                                                label="Cast & Crew"
                                                autoComplete="cast"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <AddCircle fontSize="large" className={classes.icon} onClick={handleAddToCastList}/> 
                                        </Grid>
                                    </Grid>
                                    {castList && castList.map((cast, index) => (
                                        <Chip key={index} className={classes.chip} label={cast} onDelete={() => handleDeleteChip(index)}/>
                                    ))}

                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            inputFormat="dd/MM/yyyy"
                                            label="Release Date"
                                            value={date}
                                            onChange={(newValue) => {
                                            setDate(newValue);
                                            }}
                                            renderInput={
                                                (params) => <TextField 
                                                                required
                                                                fullWidth
                                                                {...params}
                                                            />
                                            }
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            {props.onLoad ? 
                                <Backdrop
                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open={props.onLoad}
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop> : null 
                            }
                        </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={props.cancel}>Cancel</Button>
                                <Button disabled={props.disabled} onClick={()=> props.submit({name:name, releaseDate: date, genre_id: genre, rating: rating, cast: castList})}>
                                    Create Movie
                                </Button>
                            </DialogActions>
                            
            </Dialog>
            
        </>
    );
}