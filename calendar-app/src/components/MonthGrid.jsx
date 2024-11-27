import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Grid, 
  Box,
  IconButton,
  Dialog,
  DialogContent,
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

  const daysInMonth = new Date(year, month.monthIndex + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month.monthIndex, 1).getDay();
  const emptyDays = Array(firstDayOfMonth).fill(null);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

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
          component="img"
          src={currentImage}
          sx={{ 
            flex: 1,
            mb: 4,
            width: '100%',
            height: '180mm',
            objectFit: 'cover',
            borderRadius: 1,
            '@media print': {
              height: '180mm',
              pageBreakInside: 'avoid',
            }
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
          <Typography variant="body2" color="textSecondary">Click to add image</Typography>
        </Box>
      )}

      <Box sx={{ mt: 'auto' }}>
        <Grid 
          container 
          spacing={1}
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
            p: 2,
            '@media print': {
              backgroundColor: 'transparent',
            }
          }}
        >
          {weekDays.map((day, index) => (
            <Grid item xs={1.7} key={day}>
              <Typography align="center" sx={{ fontWeight: 'bold' }}>
                {day}
              </Typography>
            </Grid>
          ))}
          
          {emptyDays.map((_, index) => (
            <Grid item xs={1.7} key={`empty-${index}`}>
              <Box 
                sx={{ 
                  height: '40px',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }} 
              />
            </Grid>
          ))}
          
          {monthDays.map(day => {
            const date = new Date(year, month.monthIndex, day);
            const isCurrentDay = isToday(date);
            
            return (
              <Grid item xs={1.7} key={day}>
                <Box
                  sx={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isCurrentDay ? 'primary.main' : 'transparent',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    '@media print': {
                      backgroundColor: isCurrentDay ? 'action.hover' : 'transparent',
                    }
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: isCurrentDay ? 'primary.contrastText' : 'text.primary',
                      '@media print': {
                        color: 'text.primary',
                      }
                    }}
                  >
                    {day}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <ImageUpload onImageUpload={handleImageUpload} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MonthGrid;
