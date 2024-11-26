import { useState, useEffect } from 'react';
import { Box, TextField, Grid, Typography, Paper } from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import MonthGrid from './MonthGrid';
import { useCalendarStore } from '../store/calendarStore';

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const { setSelectedYear } = useCalendarStore();

  const handleYearChange = (event) => {
    const value = event.target.value;
    if (value.length === 4 && !isNaN(value)) {
      setYear(parseInt(value));
      setSelectedYear(parseInt(value));
    }
  };

  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(year, index);
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return {
      name: format(date, 'MMMM'),
      days,
      monthIndex: index,
    };
  });

  useEffect(() => {
    setSelectedYear(year);
  }, []);

  return (
    <Box>
      <Box 
        sx={{ 
          mb: 4,
          '@media print': {
            display: 'none'
          }
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Calendar {year}
        </Typography>
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={handleYearChange}
          inputProps={{ min: 1900, max: 2100 }}
          sx={{ width: 200 }}
        />
      </Box>
      
      <Box sx={{ 
        '@media print': {
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }
      }}>
        {months.map((month) => (
          <Paper
            key={month.monthIndex}
            elevation={0}
            sx={{
              width: '210mm',
              height: '297mm',
              margin: '0 auto',
              padding: '10mm',
              display: 'flex',
              flexDirection: 'column',
              pageBreakAfter: 'always',
              '@media screen': {
                marginBottom: 4,
              },
            }}
          >
            <MonthGrid month={month} year={year} />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Calendar;
