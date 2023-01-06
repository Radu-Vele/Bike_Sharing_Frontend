import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import EditAccountService from "../../../../api/users/EditAccountService";
import Container from "@mui/system/Container";
import { Typography } from "@mui/material";
import { Box }from "@mui/system";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Checkbox } from "@mui/material";
import {FormGroup , FormControlLabel} from "@mui/material";

const EditAccount = (user) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [phoneChecked, setPhoneChecked] = useState(false);  
    const [nameChecked, setNameChecked] = useState(false);

    const [info, setInfo] = useState({
        legalName: user.currAccount.legalName,
        phoneNumber: user.currAccount.phoneNumber,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

  
    const validate = () => {
      const errors = {};
      console.log(user.currAccount.legalName);

      console.log(phoneChecked, nameChecked);
  
      if(!(phoneChecked || nameChecked)) {
        errors.legalName = "must select at least a field to edit";
        errors.name_err = true;
        errors.phoneNumber = "must select at least a field to edit";
        errors.phone_err = true;
        return errors;
      }
      
      if(nameChecked === true) {
        if (info.legalName.length < 2 || info.legalName.length > 20) {
          errors.name_err = true;
          errors.legalName = "2 and 20 char";
        }
      }
 
      if(phoneChecked === true) {
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(info.phoneNumber)) { 
          errors.phoneNumber = "Invalid phone number";
          errors.phone_err = true;
        }
      }


      return errors;
    };
  
    const submitHandler = async (event) => {
        event.preventDefault();
        
        let errors = validate(info);
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            const response = await EditAccountService(info);
            setLoading(true);
            if (response.status === 201) {
                setLoading(false);
                window.location.reload(false);
            }
            else {
              setLoading(false);
              console.log(errors);
            }
        }

    };
  
    return (
      <Container variant="main" maxWidth = "l">
        <Typography variant="h6">
          Edit your account
        </Typography>
        <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={(e) => setNameChecked(e.target.checked)}/>} label="Edit username" />
          </FormGroup>
            <TextField
                margin="normal"
                fullWidth
                id=""
                label="Full Name"
                name="name"
                autoComplete="name"
                onChange= { (e) => setInfo({ ...info, legalName: e.target.value })}
                autoFocus
                error = {errors.name_err}
                helperText={errors.legalName} 
              />
            
            <FormGroup>
              <FormControlLabel control={<Checkbox  onChange={(e) => setPhoneChecked(e.target.checked)}/>} label="Edit phone number" />
            </FormGroup>

            <TextField
                margin="normal"
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                type="phoneNumber"
                id="phoneNumber"
                autoComplete="phoneNumber"
                onChange={ (e) => setInfo({ ...info, phoneNumber: e.target.value })}
                error = {errors.phone_err}
                helperText={errors.phoneNumber}
              />
          <LoadingButton
                color="primary"
                loading={ loading }
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit Account
            </LoadingButton>
        </Box>             
      </Container>
    );
  };

export default EditAccount;