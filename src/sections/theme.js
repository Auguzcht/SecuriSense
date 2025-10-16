import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
          fontWeight: 'bold',
        },
        contained: {
          backgroundColor: '#1976d2',
          '&:hover': { backgroundColor: '#115293' },
        },
        outlined: {
          borderColor: '#1976d2',
          color: '#1976d2',
          '&:hover': {
            borderColor: '#115293',
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
          },
        },
      },
    },
  },
});

export default theme;
