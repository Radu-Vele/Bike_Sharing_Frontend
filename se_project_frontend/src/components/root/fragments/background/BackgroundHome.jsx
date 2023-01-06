import React from "react";
import styles from "../../../../css/Background.module.css";
import blueImg from "../../../../img/blueImg.jpg";

const BackgroundHome = () => {
  return (
    <>
      <img className={styles.blueImg} src={blueImg} alt="blue"></img>
    </>
  );
};

export default BackgroundHome;
