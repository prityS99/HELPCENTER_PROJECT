import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff", 
      paper: "#f9f9f9",   
    },
    primary: {
      main: "#678e0bff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ac4040ff", 
      contrastText: "#ffffff",
    },
    text: {
      primary: "#121A1D",
      secondary: "#394d0aff", 
      disabled: "#9C9D9B",
    },
  },

  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontSize: "4rem",
      fontWeight: 600,
      color: "#20576bff",
      textTransform: "uppercase",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#678e0bff",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#333333",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      fontSize: "1rem",
      letterSpacing: "0.5px",
    },
   
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "12px 20px",
          transition: "all 0.3s ease",
          fontFamily: "'Poppins', sans-serif",
        },
        containedPrimary: {
          backgroundColor: "#678e0bff",
          "&:hover": {
            backgroundColor: "#f57474ff", 
          },
        },
        containedSecondary: {
          backgroundColor: "#D68240",
          "&:hover": {
            backgroundColor: "#b36b2a",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#121A1D",
        },
      },
    },
  },
});

export default theme;
