import { useState } from 'react';
import { Box, Typography, Paper, IconButton, Dialog, DialogContent, Button } from '@mui/material';
import { useCalendarStore } from '../store/calendarStore';
import ImageUpload from './ImageUpload';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const BackCover = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { backCoverImage, setBackCoverImage } = useCalendarStore();

  const handleImageUpload = (imageUrl) => {
    setBackCoverImage(imageUrl);
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
        pageBreakBefore: 'always',
        overflow: 'hidden',
        '@media screen': {
          marginTop: 4,
        },
      }}
    >
      {backCoverImage ? (
        <Box
          component="img"
          src={backCoverImage}
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
      ) : (
        <Box
          onClick={() => setOpenDialog(true)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '2px dashed',
            borderColor: 'primary.main',
            '@media print': {
              display: 'none'
            }
          }}
        >
          <Typography variant="body1" color="textSecondary">
            Click to add back cover image
          </Typography>
        </Box>
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
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDialog(false);
                }} 
                color="primary"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default BackCover;
