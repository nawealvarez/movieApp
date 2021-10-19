import React, { useState } from "react";
import {Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function MovieDialog (props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    return (
        <>
            <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.contentText}
                    </DialogContentText>
                        {props.children}
                </DialogContent>
                {props.submit ?
                    <DialogActions>
                        <Button onClick={props.cancel}>Cancel</Button>
                        <Button disabled={props.disabled} onClick={props.submit}>Create Movie</Button>
                    </DialogActions>
                : null }
            </Dialog>
        </>
    );
}

export default MovieDialog;