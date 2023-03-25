import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from 'react'
import ImportInitialStations from "../../api/admin/ImportInitialStations"

const AdminHome = () => {

    const[success, setSuccess] = useState(false);
    const[error, setError] = useState(false);
    const[response, setResponse] = useState({});

    const handleImportInitial = async (event) => {
        await ImportInitialStations()
        .then((response) => {
            if (response.status === 201) {
              setSuccess(true);
              setError(false);
            }
            setError(true);
            setResponse(response);
          })
          .catch((err) => {
              setSuccess(false);
              setError(true);
          });
    }

    return (
        <Box
            p={2}
            textAlign="center"
        >
            <Typography>
                Admin dashboard (Work in progress...)
            </Typography>
            <Typography
                hidden={!success}
                color="success"
            >
            Stations initiallized successfully!
            </Typography>
            <Typography
                hidden={!error}
                color="error"
            >
                {response.body}
            </Typography>
            
            <Button
                variant="contained"
                onClick={handleImportInitial}
            >
                Import initial stations and bikes
            </Button>
        </Box>
    )
}

export default AdminHome;