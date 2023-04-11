import {createTheme} from '@mui/material/styles';
import { blue, green, grey } from "@mui/material/colors";

const myTheme = createTheme({
    palette: {
        primary: {
            main: "#005377"
        },
        secondary: {
            main: "#82ca9d"
        },
        background: {
            default: grey[100]
        },

        text: {
            primary: "#000000"
        },
        success: {
            main: '#4caf50',
        }
    },
});

export default myTheme;