import { createTheme } from "@mui/material";

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#EB5424",
    },
    secondary: {
      main: "#EB5424",
    },
    text: {
      main: "#4B475C",
    },
  },
  typography: {
    fontFamily: "DM Sans",
    heading: {
      fontSize: "20px",
      color: "#263746",
      fontWeight: 700,
    },
    subHeading: {
      fontSize: "14px",
      color: "#4B475C",
      fontWeight: 500,
    },
    content: {
      fontSize: "16px",
      color: "#5F6062",
      fontWeight: 400,
    },
    info: {
      fontSize: "14px",
      color: "#717171",
      fontWeight: 400,
    },
    capabilityName: {
      fontSize: "18px",
      color: "#00000",
      fontWeight: 500,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
