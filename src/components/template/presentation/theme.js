import {createMuiTheme} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#73b742',
        },
        secondary: {
            main: '#73b742',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#FFF',
        },
        color: {
            default: '#FFF',
        },
    },
});
