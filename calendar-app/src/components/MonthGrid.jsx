import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Grid, 
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { format, isSameDay, isToday } from 'date-fns';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useCalendarStore } from '../store/calendarStore';
import ImageUpload from './ImageUpload';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MonthGrid = ({ month, year }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { monthImages, setMonthImage } = useCalendarStore();
  const currentImage = monthImages[`${year}-${month.monthIndex}`];

  const handleImageUpload = (imageUrl) => {
    setMonthImage(year, month.monthIndex, imageUrl);
    setOpenDialog(false);
  };

  const firstDayOfMonth = new Date(year, month.monthIndex, 1).getDay();
  const emptyDays = Array(firstDayOfMonth).fill(null);

  return (
    <Box 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {month.name} {year}
        </Typography>
        <IconButton 
          sx={{ 
            position: 'absolute', 
            right: 0, 
            top: 0,
            '@media print': {
              display: 'none'
            }
          }}
          onClick={() => setOpenDialog(true)}
        >
          <AddPhotoAlternateIcon />
        </IconButton>
      </Box>

      {currentImage ? (
        <Box 
          sx={{ 
            flex: 1,
            mb: 4,
            backgroundImage: `url(${currentImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 1,
            minHeight: '180mm',
          }} 
        />
      ) : (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 1,
            mb: 4,
            minHeight: '180mm',
            '@media print': {
              display: 'none'
            }
          }}
          onClick={() => setOpenDialog(true)}
        >
          <Typography color="textSecondary">Click to add image</Typography>
        </Box>
      )}

      <Box sx={{ mt: 'auto' }}>
        <Grid container spacing={0.5} sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 1,
          p: 2,
        }}>
          {weekDays.map(day => (
            <Grid item xs={12/7} key={day}>
              <Typography 
                variant="subtitle2" 
                align="center" 
                sx={{ fontWeight: 'bold' }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
          
          {emptyDays.map((_, index) => (
            <Grid item xs={12/7} key={`empty-${index}`}>
              <Box sx={{ pt: '60%' }} />
            </Grid>
          ))}

          {month.days.map(date => (
            <Grid item xs={12/7} key={date.toString()}>
              <Box
                sx={{
                  pt: '60%',
                  position: 'relative',
                  bgcolor: isToday(date) ? 'primary.light' : 'transparent',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontWeight: isToday(date) ? 'bold' : 'normal',
                  }}
                >
                  {format(date, 'd')}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Upload Image for {month.name}</DialogTitle>
        <DialogContent>
          <ImageUpload onImageUpload={handleImageUpload} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MonthGrid;
