import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Container } from '@mui/system';
import FinishRide from '../../system/FinishRide';

export default function MyRideDrawer() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <Container>
        <div
            align="center"
        >
            <Button
            variant="outlined"
            color="success"
            onClick={() => setIsDrawerOpen(true)}>
                My Ride
            </Button>
        </div>
        

        <Drawer
        anchor="right"
        role="presentation"
        open= {isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        >
            <FinishRide />
        </Drawer>
    </Container>
  );
}
