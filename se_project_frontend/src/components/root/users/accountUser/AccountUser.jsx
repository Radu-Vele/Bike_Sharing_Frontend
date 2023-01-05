import React from "react";
import UserDetailsService from "../../../../api/users/UserDetailsService";
import { useState, useLayoutEffect } from "react";
import styles from "../../../../css/Account.module.css";
import Collapsible from "react-collapsible";
import EditAccount from "./EditAccount"
import DeletePopUp from "../../fragments/popUps/DeleteAccountPopUp";
import { Button } from "@mui/material";

const AccountUser = () => {

    const [user, setUser] = useState([]);
    const [rides, setRides] = useState([]);
    const [editViewOff, setEditViewOff] = useState([]);


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
            <main className="layout.hobbie_main">
                <section className="styles.account_container">
                    <div className={styles.account_content}>
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
                        <span className={styles.account_title}>
                            <b>Rides</b>
                        </span>
                        <hr className={styles.account_hr}></hr>
                        <div className={styles.account_content}>
                            <Collapsible trigger="See all your rides (click to unfold)" onOpen={ridesHandler}>
                            <p>
                                <small>{rides}</small>
                                !
                            </p>
                            </Collapsible>
                        </div>
                        <hr className={styles.account_hr}></hr>
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