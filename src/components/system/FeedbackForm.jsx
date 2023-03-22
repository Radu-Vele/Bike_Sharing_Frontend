import React from "react";
import { useState, useLayoutEffect } from "react";
import {DialogContent, DialogContentText, TextField, DialogActions, Button, DialogTitle, Rating } from "@mui/material"
import ChangeBikeRating from "../../api/system/ChangeBikeRating";
import UserDetailsService from "../../api/users/UserDetailsService";

const FeedbackForm = (hook) => {

    const [user, setUser] = useState({});
    const [info, setInfo] = useState({
        externalId: 0,
        givenRating: 10
    });

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

    const[givenRating, setGivenRating] = useState(0);

    const computeRating = () => {
        if(givenRating === 0) {
            return false;
        }
        else {
            info.givenRating = givenRating;
            info.externalId = user.currentRide.bikeExternalId;
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
        <DialogTitle>The Condition of your Bike</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please evaluate the condition of your bike (consider brakes functioning, gears, direction etc.). 
                If you set it to one star the bike will not be available from now on and our team will check it.
            </DialogContentText>

            <Rating 
                name="The raing of your bike:" 
                defaultValue={5} 
                max={10} 
                onChange={(event, newValue) => {
                    setGivenRating(newValue);
                  }}
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