import React from "react";
import { useState } from "react";
import {DialogContent, DialogContentText, TextField, DialogActions, Button, DialogTitle } from "@mui/material"

const FeedbackForm = (hook) => {

    const[visible, setVisible] = useState(hook[0]);

    const handleSubmit = () => {
        
    }

    const handleClose = () => {
        hook.hook[1](false)
    }

    return (
    <>
        <DialogTitle>Evaluate The Bike Condition</DialogTitle>
        <DialogContent>
            <DialogContentText>
                It would be very helpful for us and for the other users to answer
                a few questions about your ride. 
                We'd appreciate it a lot!
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="given-rating"
                label="Your rating (out of 10)"
                type="given-rating"
                fullWidth
                variant="standard"
            />
            
        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose}>Dismiss</Button>
            <Button onClick={handleSubmit}>Send Form</Button>
        </DialogActions>
    </>
    );
}

export default FeedbackForm;