import { Box, Typography, Paper } from '@mui/material';
import { useCalendarStore } from '../store/calendarStore';
import ImageUpload from './ImageUpload';

const CoverPage = () => {
  const { selectedYear, coverImage, setCoverImage } = useCalendarStore();

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
        '@media screen': {
          marginBottom: 4,
        },
      }}
    >
      {coverImage ? (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${coverImage})`,
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
              display: coverImage ? 'none' : 'block',
            },
          }}
        >
          <ImageUpload onImageUpload={setCoverImage} />
        </Box>
      )}
      
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
        }}
      >
        Calendar
      </Typography>
    </Paper>
  );
};

export default CoverPage;
