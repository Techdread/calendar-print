import { useState } from 'react';
import { Box, Typography, Paper, IconButton, Dialog, DialogContent, Button } from '@mui/material';
import { useCalendarStore } from '../store/calendarStore';
import ImageUpload from './ImageUpload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const CoverPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { selectedYear, coverImage, setCoverImage } = useCalendarStore();

  const handleImageUpload = (imageUrl) => {
    setCoverImage(imageUrl);
    setOpenDialog(false);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '210mm',
        height: '297mm',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        pageBreakAfter: 'always',
        cursor: 'pointer',
        overflow: 'hidden',
        '@media screen': {
          marginBottom: 4,
        },
      }}
      onClick={() => setOpenDialog(true)}
    >
      {coverImage && (
        <Box
          component="img"
          src={coverImage}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.7,
            '@media print': {
              opacity: 1,
            },
          }}
        />
      )}

      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          '@media print': {
            display: 'none'
          }
        }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setOpenDialog(true);
          }}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }
          }}
        >
          <AddPhotoAlternateIcon />
        </IconButton>
      </Box>
      
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: '6rem',
          fontWeight: 'bold',
          color: coverImage ? '#fff' : 'text.primary',
          textShadow: coverImage ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
          position: 'relative',
          zIndex: 1,
          '@media print': {
            color: coverImage ? '#000' : 'text.primary',
            textShadow: 'none',
          },
        }}
      >
        {selectedYear}
      </Typography>
      
      <Typography
        variant="h4"
        sx={{
          mt: 2,
          color: coverImage ? '#fff' : 'text.secondary',
          textShadow: coverImage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none',
          position: 'relative',
          zIndex: 1,
          '@media print': {
            color: coverImage ? '#000' : 'text.secondary',
            textShadow: 'none',
          },
        }}
      >
        Calendar
      </Typography>

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
    </Paper>
  );
};

export default CoverPage;
