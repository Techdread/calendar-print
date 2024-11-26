import { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, createTheme, Box, Button } from '@mui/material';
import './App.css';
import Calendar from './components/Calendar';
import CoverPage from './components/CoverPage';
import BackCover from './components/BackCover';
import PrintIcon from '@mui/icons-material/Print';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        '@media print': {
          padding: 0,
          margin: 0,
        }
      }}>
        <Box sx={{ 
          '@media screen': {
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1000,
          },
          '@media print': {
            display: 'none'
          }
        }}>
          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            Print Calendar
          </Button>
        </Box>
        <Container 
          maxWidth={false} 
          sx={{ 
            p: { xs: 1, sm: 2, md: 3 },
            '@media print': {
              padding: 0,
              margin: 0,
              width: '210mm',
              minHeight: '297mm',
            }
          }}
        >
          <CoverPage />
          <Calendar />
          <BackCover />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
