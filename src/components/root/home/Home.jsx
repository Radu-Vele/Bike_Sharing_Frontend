import React from "react";
import Presentation from "./Presentation";
import Cover from "./Cover";
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
