import React from "react";
import UserDetailsService from "../../../../api/users/UserDetailsService";
import { useState, useLayoutEffect } from "react";
import styles from "../../../../css/Account.module.css";
import EditAccount from "./EditAccount"
import DeletePopUp from "../../fragments/popUps/DeleteAccountPopUp";
import { Button } from "@mui/material";
import BasicTable from "../../fragments/tables/RidesTable";
import { Collapse } from "@mui/material";
import {IconButton} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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
        <>
            <main >
                <section className={styles.account_content}>
                    <div>
                        <span className={styles.account_title}>
                            <b>Account info</b>
                        </span>
                        <hr className={styles.account_hr}></hr>
                        <br></br>
                        <p> Username: {user.username} </p>
                        <p> Email: {user.email}</p>
                        <p> Full Name: {user.legalName} </p>
                        <p> Phone Number: {user.phoneNumber} </p>
                        <br></br>
                    </div>
                </section>
                
                <section className = {styles.account_content}>
                <span className={styles.account_title}>
                            <b>Rides</b>
                 </span>
                 <hr className={styles.account_hr}></hr>

                <tbody>
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

                </tbody>
                </section>

                <section className = {styles.account_content}>
                    <span className={styles.account_title}>
                                <b>Actions</b>
                    </span>
                    <hr className={styles.account_hr}></hr>
                    <div>
                        <br></br>
                        <Button variant="outlined" onClick={handleToggleEditView}>
                          Toggle Edit Account
                        </Button>
                        <div hidden = {editViewOff}>
                            <EditAccount/>
                        </div>
                        <br></br>
                        <br></br>
                        <DeletePopUp />
                        </div>
                </section>
            </main>
        </>
    )
}

export default AccountUser;