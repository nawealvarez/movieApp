import React from 'react';
import { Toolbar, Typography, IconButton, Divider, MenuItem, Container, Box, Grid, Hidden, Menu, CardContent, CardActions, CardActionArea, CardMedia, Button, AppBar } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: theme.palette.primary.main,
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: 240, // // 240 == drawerwidth
        width: "calc(100% - 240px)", // 240 == drawerwidth
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 0,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    createMenu: {},
    createMenuButtom: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(6),
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240, // 240 == drawerwidth
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0, //theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: 0, // theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    linkButton: {
        color: "#ffffff",
    },
    logo: {
        maxWidth: "120px",
        marginRight: "16px",
        marginTop: "4px",
    },
}),

);

function Home(props) {
    const { logout, user } = useAuth();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openProfile = Boolean(anchorEl);


    const handleLogOut = async () => {
        await signOut(auth);
        logout();
    };


    const handleProfile = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleProfileClose = () => {
        setAnchorEl(null);
    };


    return (
        <LoginRequired>
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <Typography component="div" variant="h5" color="inherit" noWrap className={classes.title}>
                        Admios Movie App
                    </Typography>
                
                <Box>
                        <Button className={classes.linkButton} onClick={handleProfile}>{user ? user.email : null}</Button>
                        <IconButton
                            aria-label={"account of current user"}
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleProfile}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={openProfile}
                            onClose={handleProfileClose}
                        >
                            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </LoginRequired>
    );
}

export default Home;
