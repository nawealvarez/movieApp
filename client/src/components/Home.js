import React from 'react';
import { Toolbar, Typography, Container, Box, Grid, Hidden, Card, CardContent, CardActions, CardActionArea, CardMedia, Button } from "@mui/material";
import { LoginRequired } from '../context/AuthContext';
import { signOut } from "firebase/auth";
import { auth } from '../config/utils';
import { useAuth } from '../context/AuthContext';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) =>
({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    padding: {
        paddingRight: 0,
        paddingLeft: 0
    },
    mediaDataset: {
        width: 60,
    },
    mediaMap: {
        width: 60,
    }
}),
);

function Home(props) {
  const { logout } = useAuth();
    const classes = useStyles();
    const handleLogOut = async () => {
        await signOut(auth);
        logout();
    };

    return (
        <LoginRequired>
            <Container>
                <Toolbar className={classes.padding}>
                    <Typography component="div" variant="h5" color="inherit" noWrap className={classes.title}>
                        Home
                    </Typography>
                </Toolbar>
                <Grid container spacing={2} direction="row-reverse">
                    <Hidden smDown>
                        <Grid item md={4}>
                            <Typography component="h1" variant="h6" color="inherit" noWrap>
                                Tools
                            </Typography>
                            <Box>
                                <Button color="secondary" >Update user data</Button>
                            </Box>
                        </Grid>
                    </Hidden>

                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                            <Button
                                type="submit"
                                fullWidth
                                onClick={handleLogOut}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                LogOut
                            </Button>

                                <Card >
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.mediaMap}
                                            component="img"
                                            alt="Create Map"
                                            title="Create Map"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Empieza creando un mapa
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Con akopica puedes crear mapas con distintos tipos de capas de información almacenadas en datasets.
                                                <br></br>&nbsp;
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Crear un mapa
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>

                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.mediaDataset}
                                            component="img"
                                            alt="Create dataset"
                                            title="Create dataset"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Sube un dataset
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Los dataset son los datos que se visualizan en los mapas. Puedes subir datos de figuras, imágenes, mosaicos, etc.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Subir datos
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </LoginRequired>
    );
}

export default Home;
