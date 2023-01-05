import React from "react";
import AuthenticationService from "../../../../api/authentication/AuthenticationService"
import UserDetailsService from "../../../../api/users/UserDetailsService";
import { useState, useLayoutEffect } from "react";
import styles from "../../../../css/Account.module.css";
import Collapsible from "react-collapsible";
import UserAccountDeleteService from "../../../../api/users/DeleteAccountService.js"
import { confirmAlert } from "react-confirm-alert";
import EditAccount from "./EditAccount"

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

    const deleteHandler = async (event) => {
        event.preventDefault();
        console.log("got here")
        confirmAlert({
          title: "Delete Profile",
          message: "Are you sure you want to delete your profile?",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                const response = await UserAccountDeleteService();
                if (response.data !== null) {
                  AuthenticationService.logout();
                }
              },
            },
            {
              label: "No",
            },
          ],
        });
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
                        <button onClick={handleToggleEditView}>
                            Toggle Edit Account
                        </button>
                        <div hidden = {editViewOff}>
                            <EditAccount/>
                        </div>
                        <br></br>
                        <br></br>
                        <button onClick={deleteHandler}>
                            Delete Account
                        </button>
                        
                        </div>
                </section>
            </main>
        </>
    )
}

export default AccountUser;