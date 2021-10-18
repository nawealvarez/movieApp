import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {apiConfig } from '../config/utils';
import { authGoogle, provider } from '../services/Firebase.service';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {ReactComponent as Logo} from '../assets/googleLogo.svg';
import { auth } from '../config/utils';
import { useHistory } from 'react-router';

const styles = makeStyles({
  root: {
    alignItems: 'center',
    justifyContent: 'center'
  }})

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Admios
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const history = useHistory();
  const classes = styles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleOnChageEmail = (e) => {
    const uEmail = e.target.value;
    setEmail(uEmail);
  }

  const handleOnChagePassword = (e) => {
    const uPass = e.target.value;
    setPassword(uPass);

  }

  const handleSubmit = async () => {
    try {
      history.push('/');
      const res = await auth.signInWithEmailAndPassword(email, password);
      if (res) {
        console.log('Your account has been created successfully!', res);
      }
    } catch (err) {
      console.log(err);
    }    
  };

  const handleLoginGoogle = async () => {
    try {
      const res = await signInWithPopup(authGoogle, provider)
      if (res) {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = res.user;
        console.log('Your account has been created successfully!', res, user);
        history.push('/');
      }
    } catch (err) {
      alert(err);
    }
  }
  
  useEffect(() => {
    if (email && password) {
      setDisabled(false); 
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/img/admios.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleOnChageEmail}
                value={email}
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleOnChagePassword}
                value={password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={disabled}
              >
                Sign In
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                onClick={handleLoginGoogle}
              >
                <Logo className='logo' />
                Sign In with Google
              </Button>
              <Grid container justifyContent="center" sx={{ mt: 3, mb: 2 }}>
                <Grid item className={classes.root}>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}