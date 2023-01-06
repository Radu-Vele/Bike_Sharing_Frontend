import React from "react";
import styles from "../../../../../css/Navbar.module.css";
import Menu from "../navbar/mobileMenu/Menu";
import NavLinks from "../navbar/navLinks/NavLinks";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLinks />
    </nav>
  );
};

export default Navbar;
