import { useState, ReactElement, ChangeEvent } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  styled,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface Slide {
  imageUrl: string;
  title: string;
  type: string;
  description: string;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const compressImage = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Set maximum dimensions
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
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Could not compress image'));
          }
        },
        'image/jpeg',
        0.7
      );
    };
    img.onerror = () => reject(new Error('Could not load image'));
  });
};

const initialSlides: Slide[] = [
  {
    imageUrl: '/images/garde-corp1.jpg',
    title: 'Garde Corps',
    type: 'FLOWER',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
  },
  {
    imageUrl: '/images/porte-fenetre.jpg',
    title: 'Porte Fenêtre',
    type: 'NATURE',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
  },
  {
    imageUrl: '/images/porte-fenetre2.jpg',
    title: 'Porte Fenêtre',
    type: 'NATURE',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
  },
  {
    imageUrl: '/images/window3.jpg',
    title: 'Fenêtre',
    type: 'NATURE',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
  },
  {
    imageUrl: '/images/shower1.jpg',
    title: 'Douches',
    type: 'NATURE',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
  },
];

const SliderPage = (): ReactElement => {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState<Slide>({
    imageUrl: '',
    title: '',
    type: '',
    description: '',
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleOpen = (slide?: Slide, index?: number) => {
    setError(null);
    if (slide && index !== undefined) {
      setEditIndex(index);
      setCurrentSlide(slide);
      setPreviewUrl(slide.imageUrl);
    } else {
      setEditIndex(null);
      setCurrentSlide({
        imageUrl: '',
        title: '',
        type: '',
        description: '',
      });
      setPreviewUrl('');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setCurrentSlide({
      imageUrl: '',
      title: '',
      type: '',
      description: '',
    });
    setPreviewUrl('');
    setError(null);
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
          setError('Only JPG, PNG and WebP images are allowed');
          return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          setError('File size should not exceed 5MB');
          return;
        }

        setIsUploading(true);
        setError(null);

        // Compress image
        const compressedImage = await compressImage(file);

        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPreviewUrl(result);
          setCurrentSlide({ ...currentSlide, imageUrl: result });
        };
        reader.readAsDataURL(compressedImage);
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Error uploading image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      setError(null);
      
      // Validate required fields
      if (!currentSlide.title.trim()) {
        setError('Title is required');
        return;
      }
      if (!currentSlide.type.trim()) {
        setError('Type is required');
        return;
      }
      if (!currentSlide.imageUrl) {
        setError('Image is required');
        return;
      }

      if (editIndex !== null) {
        // Update existing slide
        const newSlides = [...slides];
        newSlides[editIndex] = currentSlide;
        setSlides(newSlides);
      } else {
        // Add new slide
        setSlides([...slides, currentSlide]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving slide:', error);
      setError('Error saving slide. Please try again.');
    }
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const newSlides = slides.filter((_, index) => index !== deleteIndex);
      setSlides(newSlides);
    }
    setDeleteConfirmOpen(false);
    setDeleteIndex(null);
  };

  const handleInputChange = (field: keyof Slide, value: string) => {
    setCurrentSlide({ ...currentSlide, [field]: value });
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" className='text-white'>Gestion des Slides</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Ajouter un Slide
        </Button>
      </Box>

      <Grid container spacing={3}>
        {slides.map((slide, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                position: "relative",
                "&:hover .image-overlay": {
                  opacity: 1,
                },
                "&:hover .MuiCardMedia-root": {
                  filter: "brightness(0.7)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={slide.imageUrl}
                alt={slide.title}
                sx={{
                  objectFit: "cover",
                  transition: "filter 0.3s ease-in-out",
                  width: "100%",
                }}
              />
              <CardContent sx={{ flexGrow: 1, height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography
                  variant="h6"
                  component="div"
                  className="text-center text-white"
                  sx={{ color: "white" }}
                >
                  {slide.title}
                </Typography>
              </CardContent>
              <Box
                className="image-overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  p: 1,
                  opacity: 0,
                  transition: "opacity 0.3s ease-in-out",
                  background:
                    "linear-gradient(to bottom, rgba(34, 64, 103, 0.8), transparent)",
                  display: "flex",
                  gap: 1,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => handleOpen(slide, index)}
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit/Add Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editIndex !== null ? 'Modifier le Slide' : 'Ajouter un Slide'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
            
            {/* Image Upload Preview */}
            {previewUrl && (
              <Box sx={{ width: '100%', height: 200, position: 'relative' }}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              </Box>
            )}
            
            {/* Image Upload Button */}
            <Button
              component="label"
              variant="contained"
              startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
              sx={{ mb: 2 }}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Choisir une image'}
              <VisuallyHiddenInput
                type="file"
                accept={ALLOWED_TYPES.join(',')}
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </Button>

            <TextField
              label="Titre"
              fullWidth
              required
              value={currentSlide.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              error={error === 'Title is required'}
            />
            <TextField
              label="Type"
              fullWidth
              required
              value={currentSlide.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              error={error === 'Type is required'}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={currentSlide.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isUploading}>
            Annuler
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
            disabled={isUploading || !previewUrl || !currentSlide.title || !currentSlide.type}
          >
            {isUploading ? 'Uploading...' : 'Sauvegarder'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer ce slide ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Annuler</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SliderPage;