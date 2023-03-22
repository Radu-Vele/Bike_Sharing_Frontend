import {createTheme} from '@mui/material/styles';
import { blue, green, grey } from "@mui/material/colors";

const myTheme = createTheme({
    palette: {
        primary: {
            main: blue[800],
            light: blue[500],
            dark: blue[950]
        },
        secondary: {
            main: green[900]
        },
        background: {
            default: grey[100]
        },

        text: {
            primary: "#000000"
        }
    },
});

export default myTheme;