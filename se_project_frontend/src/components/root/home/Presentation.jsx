import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";

const Presentation = () => {
  return (
    <Box component="main" 
      maxWidth="xs"
      height="100%"
      width= "50%"
      sx={{
        bgcolor: '#fefefe',
        opacity: [0.9, 0.8, 0.9]
      }}
    >
        <Typography variant="h4">
          Ready to bike?
        </Typography>
        <Typography variant="h6">
          Navigate our website and give it a go!
        </Typography>
        <Button 
          href="signup"
          color = "primary"
        >
        Sign up
        </Button>
    </Box>
  );
};

export default Presentation;
