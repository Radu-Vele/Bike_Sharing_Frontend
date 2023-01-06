import React from "react";
import BackgroundCover from "./BackgroundCover";
import Presentation from "./Presentation";
import Cover from "./Cover";
import Footer from "../fragments/footer/Footer";
import style from "../../../css/Footer.module.css";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import myTheme from "../../../theme/AppTheme";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Home = () => {
  return (
      <Container component="main" maxWidth="l">
        <Presentation />
        <Cover />
        <Footer class={style.footer_cover} />
      </Container>
  );
};

export default Home;
