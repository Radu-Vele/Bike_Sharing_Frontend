import React from "react";
import styles from "../../../../css/Background.module.css";
import blueImg from "../../../../img/blueImg.jpg";

const Background = () => {
  return (
    <>
      <img className={styles.blueImg} src={blueImg} alt="blueImg2"></img>
    </>
  );
};

export default Background;
