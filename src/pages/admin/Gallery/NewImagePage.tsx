import React, { useState, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  IconButton,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloseIcon from '@mui/icons-material/Close';

interface ImageData {
  id?: number;
  src: string;
  title: string;
  category: string;
}

const NewImagePage = () => {
  const [imageData, setImageData] = useState<ImageData>({
    src: "",
    title: "",
    category: "",
  });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const categories = ["Fenêtres", "Portes", "Autres"];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      setPreviewUrls((prevUrls) => [...prevUrls, URL.createObjectURL(file)]);
    });
    setImageData((prev) => ({ ...prev, src: acceptedFiles.map(file => file.name).join(", ") }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setImageData({
      ...imageData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting:", { ...imageData, images: previewUrls });
  };

  const handleRemoveImage = (index: number) => {
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: "auto", p: 3 }}
    >
      <Typography variant="h4" gutterBottom className="text-primary">
        Ajouter de nouvelles images
      </Typography>
      <TextField
        fullWidth
        label="Titre"
        name="title"
        value={imageData.title}
        onChange={handleInputChange}
        margin="normal"
        required
      />

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={imageData.category}
          onChange={handleInputChange}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Box 
        {...getRootProps()} 
        sx={{ 
          border: '2px dashed #ccc',
          borderRadius: 2,
          p: 2,
          mb: 3,
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Déposez les fichiers ici ...</p>
        ) : (
          <p>Glissez et déposez des fichiers ici, ou cliquez pour sélectionner des fichiers</p>
        )}
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {previewUrls.map((url, index) => (
          <Grid item xs={4} key={index}>
            <Card sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="100"
                image={url}
                alt={`Preview ${index + 1}`}
                sx={{ objectFit: "cover" }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: 'white',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  },
                }}
                onClick={() => handleRemoveImage(index)}
              >
                <CloseIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        className="site-button bg-primary text-white"
      >
        Ajouter les Images
      </Button>
    </Box>
  );
};

export default NewImagePage;
