import { useState, useEffect } from 'react';
import { 
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  DialogContentText,
  Fab,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface ImageData {
  id: number;
  src: string;
  title: string;
  category: string;
}

const ImageListPage = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>(['all']);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [editedImage, setEditedImage] = useState<ImageData | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newImage, setNewImage] = useState<Omit<ImageData, 'id'>>({
    src: '',
    title: '',
    category: '',
  });

  useEffect(() => {
    const fetchedImages = [
      { id: 1, src: '/images/Gallery/shower.webp', title: 'Fenêtre Aluminium', category: 'Fenêtres' },
      { id: 2, src: '/images/Gallery/door.webp', title: 'Porte Entrée PVC', category: 'Portes' },
      { id: 3, src: '/images/Gallery/window.webp', title: 'Fenêtre PVC', category: 'Fenêtres' },
      { id: 4, src: '/images/Gallery/fence.webp', title: 'Porte Coulissante', category: 'Portes' },
      { id: 5, src: '/images/Gallery/mur.webp', title: 'Façade Aluminium', category: 'Façades' },
      { id: 6, src: '/images/garde-corp.jpg', title: 'Façade Commerciale', category: 'Façades' },
      { id: 7, src: '/images/Gallery/shower.webp', title: 'Fenêtre Aluminium', category: 'Fenêtres' },
      { id: 8, src: '/images/Gallery/door.webp', title: 'Porte Entrée PVC', category: 'Portes' },
      { id: 9, src: '/images/Gallery/window.webp', title: 'Fenêtre PVC', category: 'Fenêtres' },
      { id: 10, src: '/images/Gallery/fence.webp', title: 'Porte Coulissante', category: 'Portes' },
      { id: 11, src: '/images/Gallery/mur.webp', title: 'Façade Aluminium', category: 'Façades' },
      { id: 12, src: '/images/garde-corp.jpg', title: 'Façade Commerciale', category: 'Façades' },
    ];
    
    const uniqueCategories = ['all', ...new Set(fetchedImages.map(img => img.category))];
    setCategories(uniqueCategories);
    setImages(fetchedImages);
  }, []);

  const handleEditClick = (image: ImageData) => {
    setSelectedImage(image);
    setEditedImage({ ...image });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (image: ImageData) => {
    setSelectedImage(image);
    setDeleteDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editedImage && selectedImage) {
      setImages(prevImages =>
        prevImages.map(img =>
          img.id === selectedImage.id ? editedImage : img
        )
      );
      setEditDialogOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedImage) {
      setImages(prevImages => prevImages.filter(img => img.id !== selectedImage.id));
      setDeleteDialogOpen(false);
    }
  };

  const filteredImages = images.filter(img => 
    selectedCategory === 'all' ? true : img.category === selectedCategory
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedImage({ ...editedImage, src: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleNewImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewImage(prev => ({ ...prev, src: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSave = () => {
    if (newImage.src && newImage.title && newImage.category) {
      const newId = Math.max(...images.map(img => img.id)) + 1;
      setImages(prev => [...prev, { ...newImage, id: newId }]);
      setAddDialogOpen(false);
      setNewImage({ src: '', title: '', category: '' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map(category => (
            <Tab 
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              value={category}
            />
          ))}
        </Tabs>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleAddClick}
          sx={{ ml: 2 }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={3}>
      {filteredImages.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card
              sx={{
                height: '650px',
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
                height="200"
                image={image.src}
                alt={image.title}
                sx={{
                  objectFit: "contain",
                  transition: "filter 0.3s ease-in-out",
                }}
              />
              <CardContent sx={{ flexGrow: 1, height: "150px" }}>
                <Typography
                  variant="h6"
                  component="div"
                  className="text-center text-white"
                  sx={{ color: "white" }}
                >
                  {image.title}
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
                  onClick={() => handleEditClick(image)}
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
                  onClick={() => handleDeleteClick(image)}
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

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Modifier l'image</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {editedImage && (
                <Box
                  component="img"
                  src={editedImage.src}
                  alt={editedImage.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '400px',
                    objectFit: 'contain',
                    mt: 2,
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  Changer l'image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                <TextField
                  fullWidth
                  label="Titre"
                  value={editedImage?.title ?? ''}
                  onChange={(e) => setEditedImage(prev => prev ? { ...prev, title: e.target.value } : null)}
                />
                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={editedImage?.category ?? ''}
                    label="Catégorie"
                    onChange={(e) => setEditedImage(prev => prev ? { ...prev, category: e.target.value } : null)}
                  >
                    {categories.filter(cat => cat !== 'all').map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleEditSave} variant="contained">Enregistrer</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Photo Dialog */}
      <Dialog 
        open={addDialogOpen} 
        onClose={() => setAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Ajouter une nouvelle image</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {newImage.src ? (
                <Box
                  component="img"
                  src={newImage.src}
                  alt="Preview"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '400px',
                    objectFit: 'contain',
                    mt: 2,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mt: 2,
                  }}
                >
                  <Typography color="text.secondary">
                    Aperçu de l'image
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                >
                  Choisir une image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleNewImageChange}
                  />
                </Button>
                <TextField
                  fullWidth
                  label="Titre"
                  value={newImage.title}
                  onChange={(e) => setNewImage(prev => ({ ...prev, title: e.target.value }))}
                />
                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={newImage.category}
                    label="Catégorie"
                    onChange={(e) => setNewImage(prev => ({ ...prev, category: e.target.value }))}
                  >
                    {categories.filter(cat => cat !== 'all').map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAddDialogOpen(false);
            setNewImage({ src: '', title: '', category: '' });
          }}>
            Annuler
          </Button>
          <Button 
            onClick={handleAddSave} 
            variant="contained"
            disabled={!newImage.src || !newImage.title || !newImage.category}
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageListPage;