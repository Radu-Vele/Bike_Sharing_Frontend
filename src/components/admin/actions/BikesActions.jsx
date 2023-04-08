import { Grid, Typography } from "@mui/material";

const BikesActions = () => {
    return (
        <Typography>
            Possible actions:
            - create bike and place it in pool of bikes
            - show bikes that need service (set as repaired)
            - edit a specific bike (select, move to)
            - delete a bike (select from all bikes)
        </Typography>
    )
}

export default BikesActions;