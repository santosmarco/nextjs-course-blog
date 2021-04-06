import { createMuiTheme } from "@material-ui/core";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
