import React from "react";
import { Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
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
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.contentText}
                    </DialogContentText>
                        {props.children}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default MovieDialog;