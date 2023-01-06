import {createTheme} from '@mui/material/styles';
import { blue, red, green, grey } from "@mui/material/colors";

const myTheme = createTheme({
    palette: {
        primary: {
            main: blue[500]
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