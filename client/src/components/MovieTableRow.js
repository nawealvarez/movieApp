import React, {useState} from 'react';
import {Typography, TableCell, TableRow, Button } from "@mui/material";
import MovieDialog from './MovieDialog';

export default function MovieTableRow(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <TableRow key={props.id}>
                <TableCell align="center">{props.date}</TableCell>
                <TableCell align="center">{props.name}</TableCell>
                <TableCell align="center">{props.shipTo}</TableCell>
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
                >
                    <Typography>{props.name} {props.shipTo}</Typography>
                </MovieDialog>
                </TableCell>
            </TableRow>
        </>
    );
}