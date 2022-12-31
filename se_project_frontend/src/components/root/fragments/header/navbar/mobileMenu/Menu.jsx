import React from "react";
import { useLocation } from "react-router-dom";
import AuthenticationService from "../../../../../../api/authentication/AuthenticationService";
import { NavLink } from "react-router-dom";
import styles from "../../../../../../css/Navbar.module.css";
import { useState } from "react";
import { useEffect } from "react";

const Menu = () => {
  const [clicked, setClicked] = useState(false);
  const userLogged = AuthenticationService.isUserLoggedIn();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setClicked(false);
  }, [pathname]);

  return (
    <section className="menu">
      <img
        alt="mobile"
        onClick={(e) => setClicked(!clicked)}
        className={styles.menu}
      />
      {clicked && userLogged && (
        <menu className={styles.popup_menu}>
          <ul className={styles.nav_links_popup}>
            <li className={styles.nav_link}>
              <NavLink to="/user-home">Home</NavLink>
            </li>
            <li className={styles.nav_link}>
              <NavLink to="/test">Pick-up a bike</NavLink>
            </li>
            <li className={styles.nav_link}>
              <NavLink to="/my-hobbies" className="nav-link">
                Leave a bike
              </NavLink>
            </li>
            <li className={styles.nav_link}>
              <NavLink to="/account-user">Account Details</NavLink>
            </li>
            <li
              className={styles.nav_link}
              onClick={AuthenticationService.logout}
            >
              <NavLink to="/"> Logout</NavLink>
            </li>
          </ul>
        </menu>
      )}

      {clicked && !userLogged && (
        <menu className={styles.popup_menu}>
          <ul className={styles.nav_links_popup}>
            {pathname !== "/signup" && location.pathname !== "/" && (
              <li className={styles.nav_link}>
                <NavLink to="/signup">Sign up</NavLink>
              </li>
            )}
            {pathname !== "/login" && (
              <li className={styles.nav_link}>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </menu>
      )}
    </section>
  );
};

export default Menu;
