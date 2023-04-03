import React from 'react';
import Box from '@mui/material/Box';

const RoundedShadowBox = ({children}) => {
  return (
    <Box
        borderRadius={7} 
        boxShadow={3} 
        bgcolor="background.paper" 
        p={3}
        justifyContent="center"
        alignItems="center"
    >
        {children}
    </Box>
  );
};

export default RoundedShadowBox;
