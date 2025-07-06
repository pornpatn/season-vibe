import { createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7a2d18', // Deep Burgundy
    },
    secondary: {
      main: '#cba345', // Mustard Gold
    },
    background: {
      default: '#f8f1e3', // Creamy beige
      paper: '#ffffff',   // Keep white cards/panels
    },
    text: {
      primary: '#3b1e0d', // Dark brown text
      secondary: '#5f3a22', // Softer brown
    },
  },
  typography: {
    fontFamily: `'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: {
      fontWeight: 600,
      color: '#3b1e0d',
    },
    h2: {
      fontWeight: 600,
      color: '#3b1e0d',
    },
    h3: {
      fontWeight: 500,
      color: '#3b1e0d',
    },
    subtitle1: {
      color: '#5f3a22',
    },
    body1: {
      color: '#3b1e0d',
    },
    body2: {
      color: '#5f3a22',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: '#7a2d18',
          '&:hover': {
            backgroundColor: '#5f1f0f',
          },
        },
        containedSecondary: {
          backgroundColor: '#cba345',
          '&:hover': {
            backgroundColor: '#b8933e',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#7a2d18',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});

export default theme
