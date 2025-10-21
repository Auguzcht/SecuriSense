import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4079ff',       // Primary blue color
      dark: '#164260',       // Darker blue for hover states
      light: '#6293ff',      // Lighter blue for accents
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#f97316',       // Orange color
      dark: '#ef4444',       // Red color for hover states
      light: '#ff9e41',      // Lighter orange
      contrastText: '#ffffff'
    },
    text: {
      primary: '#042046',    // Dark blue text from your heading
      secondary: '#4079ff',  // Blue text
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',  // Updated to match your Home component
          textTransform: 'none',
          fontWeight: '600',     // Updated to match your Home component
          letterSpacing: '0.5px',
          fontSize: '1rem',
          transition: 'all 0.3s ease-in-out',
        },
        contained: {
          // Gradient styles will be applied via className in components
          boxShadow: 'none',
          '&:hover': { 
            boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)',
            transform: 'translateY(-3px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          }
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#4079ff',
          color: '#4079ff',
          '&:hover': {
            borderColor: '#4079ff',
            backgroundColor: 'rgba(64, 121, 255, 0.05)',
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 20px rgba(64, 121, 255, 0.15)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          }
        },
        // Adding style for text buttons too
        text: {
          color: '#4079ff',
          '&:hover': {
            backgroundColor: 'rgba(64, 121, 255, 0.05)',
          }
        }
      },
    },
    // Add other component styling as needed
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: '#042046',
          fontWeight: 700,
        },
        h2: {
          color: '#042046',
          fontWeight: 600,
        },
        h3: {
          color: '#042046',
          fontWeight: 500,
        },
        body1: {
          color: '#042046',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4079ff',
            },
            '&:hover fieldset': {
              borderColor: '#164260',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4079ff',
            },
          }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#4079ff',
          '&.Mui-checked': {
            color: '#4079ff',
          }
        }
      }
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(16, 66, 96, 0.05)',
    '0 4px 8px rgba(16, 66, 96, 0.1)',
    // ...more shadows if needed
  ],
});

export default theme;
