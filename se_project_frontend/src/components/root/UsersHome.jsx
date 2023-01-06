import React from "react";
import styles from "../../css/UserHome.module.css";
import Background from "./fragments/background/Background";

const UserHome = () => {
  
  return (
    <>
      <main className={styles.home_page}>
        <div className = {styles.welcome_text}>
          <p>Hello and welcome to the Bike Sharing App Home Page</p>
        </div>
      </main>
    </>
  );
};

export default UserHome;
