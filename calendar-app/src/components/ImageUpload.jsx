import { useState, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUpload = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFiles = (files) => {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      sx={{
        border: '2px dashed',
        borderColor: 'primary.main',
        borderRadius: 1,
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
      />
      
      {preview ? (
        <Box
          component="img"
          src={preview}
          sx={{
            maxWidth: '100%',
            maxHeight: 200,
            objectFit: 'contain',
          }}
        />
      ) : (
        <>
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography>
            Drag and drop an image here, or click to select
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ImageUpload;
