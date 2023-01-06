import React from "react";
import BackgroundCover from "./BackgroundCover";
import Presentation from "./Presentation";
import Cover from "./Cover";
import Footer from "../fragments/footer/Footer";
import { CssBaseline } from "@mui/material";
import myTheme from "../../../theme/AppTheme";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Home = () => {
  return (
      <Container component="main" maxWidth="l">
        <Presentation />
        <Cover />
      </Container>
  );
};

export default Home;
