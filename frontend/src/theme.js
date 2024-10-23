import createTheme from "@mui/material/styles/createTheme";
const theme = createTheme({
  palette: {
    primary: {
      main: "#b28704",
      // main: "#5a98fc",

      light: "#63a4ff"
    },
    secondary: {
      main: "#dc004e", // Change this to your secondary color
      light: "#ff5c8d"
    },
    error: {
      main: "#f44336",
      light: "#e57373"
    },
    background: {
      default: "#fsfsfs"
    }
  },
  typography: {
    fontFamily: "Montserrat, Tiro Devanagari Hindi",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    // fontSize: i18n.language === "hi" && "1.1rem",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#333"
        }
      }
    }
  }
});

export default theme;
