import { Typography, Divider} from "@mui/material"
import { Box } from "@mui/system"
import { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import RidesChart from "./dashboard/RidesChart";


const AdminHome = () => {

    return (
        <Box
            p={2}
            textAlign="justify"
        >
            <Typography variant="h4">
                Bike Sharing System - Admin dashboard
            </Typography>
            <Divider/>
            <Box p={2}>
            <RidesChart />
            </Box>
        </Box>
    )
}

export default AdminHome;