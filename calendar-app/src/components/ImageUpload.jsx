import { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUpload = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress with reduced quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
      };
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFiles = async (files) => {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const compressedImage = await compressImage(file);
        setPreview(compressedImage);
        onImageUpload(compressedImage);
      } catch (error) {
        console.error('Error processing image:', error);
      }
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
        <img 
          src={preview} 
          alt="Preview" 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '200px',
            objectFit: 'contain'
          }} 
        />
      ) : (
        <>
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography>
            Drag and drop an image here, or click to select one
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ImageUpload;
