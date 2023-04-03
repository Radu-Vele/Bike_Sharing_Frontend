import React from "react";
import UserDetailsService from "../../../api/users/UserDetailsService";
import { useState, useLayoutEffect } from "react";
import EditAccount from "./EditAccount"
import DeletePopUp from "../../fragments/popUps/DeleteAccountPopUp";
import { Button, Divider, Grid, ListItemText, Typography } from "@mui/material";
import RidesTable from "./RidesTable";
import { Container } from "@mui/system";
import Box from '@mui/material/Box';
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import RoundedShadowBox from "../../../custom_components/RoundedShadowBox";

const AccountUser = () => {
    const [user, setUser] = useState([]);
    const [editViewOff, setEditViewOff] = useState([]);

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

    const handleToggleEditView = async () => {
            setEditViewOff(!editViewOff);
    }

    return (
        <>
        <Grid
            container 
            spacing={2}
            p={2}
        >
            <Grid 
                item
                xs={6} 
            >
                <RoundedShadowBox>
                    <Typography variant="h4">
                        Account info
                    </Typography>           
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={user.username} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary={user.email} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <BadgeIcon />
                        </ListItemIcon>
                        <ListItemText primary={user.legalName} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <LocalPhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary={user.phoneNumber} />
                        </ListItemButton>
                    </ListItem>
                </RoundedShadowBox>
            </Grid>
            <Grid
                item
                xs={6}
            >
                <RoundedShadowBox>
                    <Typography variant="h4">
                        Actions
                    </Typography>
                    <Divider />
                    <br></br>
                    <Button variant="outlined" onClick={handleToggleEditView} >
                        Toggle Edit Account
                    </Button>
                    <br></br>
                    <Box hidden={editViewOff}>
                        <br></br>
                        <EditAccount currAccount={user}/>
                    </Box>
                    <br></br>
                    <DeletePopUp />
                </RoundedShadowBox>
               
            </Grid>
            <Grid
                item
                xs={12}
            >
                <RoundedShadowBox>
                <Typography variant="h4">
                    Ride History
                </Typography>
                <Divider />
                <RidesTable />
                </RoundedShadowBox>
            </Grid>
        </Grid>
        </>
    )
}

export default AccountUser;