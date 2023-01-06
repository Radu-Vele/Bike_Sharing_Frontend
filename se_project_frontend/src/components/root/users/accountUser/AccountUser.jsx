import React from "react";
import UserDetailsService from "../../../../api/users/UserDetailsService";
import { useState, useLayoutEffect } from "react";
import styles from "../../../../css/Account.module.css";
import EditAccount from "./EditAccount"
import DeletePopUp from "../../fragments/popUps/DeleteAccountPopUp";
import { Button, Divider, ListItemText, Typography } from "@mui/material";
import BasicTable from "../../fragments/tables/RidesTable";
import { Collapse } from "@mui/material";
import {IconButton} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Container } from "@mui/system";
import Box from '@mui/material/Box';
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import InboxIcon  from '@mui/icons-material/Inbox';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const AccountUser = () => {

    const [user, setUser] = useState([]);
    const [rides, setRides] = useState([]);
    const [editViewOff, setEditViewOff] = useState([]);
    const [ridesOpen, setRidesOpen] = React.useState(false);

    //retrieve details
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

    const ridesHandler = async (event) => {
        setRides("See rides")
        return "See rides"
    }    

    const handleToggleEditView = async () => {
            setEditViewOff(!editViewOff);
    }

    return (
        <Container maxWidth="l">
            <Typography variant="h4">
                Account info
            </Typography>            
            
            <Divider />            
            
            <Box>
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
            </Box>
            <br></br>
            <Typography variant="h4">
                Ride History
            </Typography>
            
            <Divider />


            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setRidesOpen(!ridesOpen)}
                    >
                        {ridesOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                    
                <TableCell align="left">
                    See all your rides (click to unfold)
                </TableCell>               
            </TableRow>

            <Collapse in={ridesOpen} timeout="auto" unmountOnExit>
                <BasicTable />
            </Collapse>
            <br></br>
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

        </Container>
    )
}

export default AccountUser;