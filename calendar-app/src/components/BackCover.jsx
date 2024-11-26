import { Box, Typography, Paper } from '@mui/material';
import { useCalendarStore } from '../store/calendarStore';
import ImageUpload from './ImageUpload';

const BackCover = () => {
  const { backCoverImage, setBackCoverImage } = useCalendarStore();

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
        '@media screen': {
          marginTop: 4,
        },
      }}
    >
      {backCoverImage ? (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backCoverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
          }}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            '@media print': {
              display: backCoverImage ? 'none' : 'block',
            },
          }}
        >
          <ImageUpload onImageUpload={setBackCoverImage} />
        </Box>
      )}
    </Paper>
  );
};

export default BackCover;
