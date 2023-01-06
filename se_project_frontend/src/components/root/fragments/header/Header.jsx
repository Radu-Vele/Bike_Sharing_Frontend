import React from "react";
import styles from "../../../../css/Header.module.css";
import Navbar from "./navbar/Navbar";
import Logo from "./logo/Logo";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <Box component="main">
    <header className={styles.header}>
      <Logo />
      <Navbar />
    </header>
    </Box>
  );
};

export default Header;
