import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ReactComponent as Logo} from '../assets/googleLogo.svg';
import { auth } from '../config/utils';
import { useAuth } from '../context/AuthContext';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authGoogle, provider } from '../services/Firebase.service';
import { signup } from '../services/Auth.service';
import { useHistory } from 'react-router';

const theme = createTheme();

export default function Signup() {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [onLoad, setOnLoad] = useState(false);
  const history = useHistory();



  const handleOnChagePassword = (e) => {
    const uPass = e.target.value;
    setPassword(uPass);

  }

  const handleOnChageEmail = (e) => {
    const uEmail = e.target.value;
    setEmail(uEmail);

  }

  useEffect(() => {
    if (password && email) {
      setDisabled(false); 
    } else {
      setDisabled(true);
    }
  }, [password, email]);


  const handleSubmit = async () => {
    try {
      setOnLoad(true);
      const res = await auth.createUserWithEmailAndPassword(email, password);
      if (res) {
        const fToken = await res.user.getIdToken();        
        const sign = await signup({credential: null, user: res.user, email: email, fToken: fToken});
 
        if (sign) {
          login(sign);
          history.push('/');
        }
        console.log('Your account has been created successfully!', sign);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setOnLoad(false);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      setOnLoad(true);
      const res = await signInWithPopup(authGoogle, provider)
      if (res) {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        //const token = credential.accessToken;
        // The signed-in user info.
        const user = res.user;
        const fToken = await user.getIdToken();
        const sign = await signup({credential: credential, user: user, email: user.email, fToken: fToken});
        if (sign) {
          login(sign);
          history.push('/');
        }
      }
    } catch (err) {
      const errjson = err;
      console.log(errjson);
    } finally {
      setOnLoad(false);
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleOnChageEmail}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleOnChagePassword}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              disabled={disabled || onLoad}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              onClick={handleLoginGoogle}
              variant="raised"
              >
              <Logo className='logo' />
              Sign Up With Google
            </Button>
            {onLoad ? 
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={onLoad}
              >
                <CircularProgress color="inherit" />
              </Backdrop> : 
              null }
            <Grid container justifyContent="center" sx={{ mt: 3, mb: 2 }}>
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}