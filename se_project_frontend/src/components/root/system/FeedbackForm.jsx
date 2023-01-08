import React from "react";
import { useState, useLayoutEffect } from "react";
import {DialogContent, DialogContentText, TextField, DialogActions, Button, DialogTitle } from "@mui/material"
import ChangeBikeRating from "../../../api/system/ChangeBikeRating";
import UserDetailsService from "../../../api/users/UserDetailsService";

const FeedbackForm = (hook) => {

    const [user, setUser] = useState({});
    const info = {
        bikeId: 0,
        currentRating: 10
    };

    useLayoutEffect(() => {
        let unmounted = false;
      
        UserDetailsService().then((response) => {
          if(!unmounted) {
              setUser(response.data);
          }
        });
        return () => {
          unmounted = true;
        };
    }, [])

    const[givenRating, setGivenRating] = useState();

    const computeRating = () => {
        if(Object.keys(givenRating).length === 0) {
            console.log("no info from form :(");
            return false;
        }
        else {
            //input is given - should be validated TODO
            info.currentRating = givenRating;
            info.bikeId = user.currentRide.bikeId;
            return true;
        }
    }

    const handleSubmit = async () => {
        if(computeRating()) {
            console.log(info);
            await ChangeBikeRating(info) 
            .then((response) => {
                console.log(response.status);
              if (response.status === 200) {
                handleClose();
              }
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else {
            handleClose();
        }


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
                onChange={(e) => setGivenRating(e.target.value)}
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