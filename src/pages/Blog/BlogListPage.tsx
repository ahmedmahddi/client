import { useState, useCallback, useMemo, ReactElement, ChangeEvent } from 'react';
import {
  Box,
  Stack,
  Paper,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import CustomPagination from 'components/common/CustomPagination';
import CustomNoResultsOverlay from 'components/common/CustomNoResultsOverlay';

interface BlogPost {
  id: string;
  date: string;
  author: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    date: "10 Aug 2016",
    author: "demongo",
    title: "Pourquoi vous ne devriez pas aller dans l'industrie",
    description: "Découvrez les raisons pour lesquelles choisir le secteur de la menuiserie aluminium et PVC peut transformer vos projets de rénovation.",
    content: "La menuiserie aluminium et PVC représente aujourd'hui l'un des secteurs les plus innovants. Les matériaux modernes comme l'aluminium et le PVC offrent des performances exceptionnelles en termes d'isolation thermique et acoustique. Leur durabilité et leur résistance aux intempéries en font des choix privilégiés pour les constructions contemporaines.",
    image: "/images/Blog/blog3.jpg",
    tags: ["Menuiserie", "Innovation", "Construction"]
  },
  {
    id: "2",
    date: "10 Aug 2016",
    author: "AARON",
    title: "Sept doutes que vous devriez clarifier à propos de",
    description: "Explorez les questions essentielles concernant l'industrie de la menuiserie aluminium et PVC pour prendre des décisions éclairées.",
    content: "Dans le domaine de la menuiserie aluminium et PVC, certaines questions reviennent fréquemment. La durabilité des matériaux est l'une des principales préoccupations. L'aluminium et le PVC sont parmi les matériaux les plus durables du marché, avec une durée de vie pouvant dépasser 30 ans avec un entretien minimal.",
    image: "/images/Blog/blog2.jpg",
    tags: ["FAQ", "Guide", "Menuiserie"]
  },
];

type DialogMode = 'view' | 'edit' | 'add';

const BlogListPage = (): ReactElement => {
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogPosts);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>('view');
  const [editedBlog, setEditedBlog] = useState<Partial<BlogPost>>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleViewDetails = useCallback((blog: BlogPost) => {
    setSelectedBlog(blog);
    setDialogMode('view');
    setDialogOpen(true);
  }, []);

  const handleEdit = useCallback((blog: BlogPost) => {
    setSelectedBlog(blog);
    setEditedBlog(blog);
    setDialogMode('edit');
    setDialogOpen(true);
  }, []);

  const handleAdd = useCallback(() => {
    setSelectedBlog(null);
    setEditedBlog({
      date: new Date().toISOString().split('T')[0],
      tags: [],
    });
    setDialogMode('add');
    setDialogOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setBlogs((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleSave = useCallback(() => {
    if (dialogMode === 'add') {
      const newBlog: BlogPost = {
        id: Date.now().toString(),
        ...(editedBlog as Omit<BlogPost, 'id'>),
      };
      setBlogs((prev) => [...prev, newBlog]);
    } else if (dialogMode === 'edit' && selectedBlog) {
      setBlogs((prev) =>
        prev.map((item) =>
          item.id === selectedBlog.id ? { ...item, ...editedBlog } : item
        )
      );
    }
    setDialogOpen(false);
  }, [dialogMode, editedBlog, selectedBlog]);

  const handleInputChange = useCallback((field: keyof BlogPost, value: string | string[]) => {
    setEditedBlog((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      handleInputChange('image', URL.createObjectURL(file));
    }
  }, [handleInputChange]);

  const columns: GridColDef<BlogPost>[] = useMemo(
    () => [
      {
        field: 'title',
        headerName: 'Titre',
        flex: 2,
        minWidth: 200,
      },
      {
        field: 'author',
        headerName: 'Auteur',
        flex: 1,
        minWidth: 130,
      },
      {
        field: 'date',
        headerName: 'Date',
        flex: 1,
        minWidth: 130,
      },
      {
        field: 'tags',
        headerName: 'Tags',
        flex: 1,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams<BlogPost>) => (
          <Typography variant="body2">
            {params.row.tags.join(', ')}
          </Typography>
        ),
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        flex: 1,
        minWidth: 150,
        getActions: (params) => [
          <GridActionsCellItem
            key="view"
            icon={
              <Tooltip title="Voir les détails">
                <VisibilityIcon />
              </Tooltip>
            }
            label="View"
            onClick={() => handleViewDetails(params.row)}
          />,
          <GridActionsCellItem
            key="edit"
            icon={
              <Tooltip title="Modifier">
                <EditIcon />
              </Tooltip>
            }
            label="Edit"
            onClick={() => handleEdit(params.row)}
          />,
          <GridActionsCellItem
            key="delete"
            icon={
              <Tooltip title="Supprimer">
                <DeleteIcon />
              </Tooltip>
            }
            label="Delete"
            onClick={() => handleDelete(params.row.id)}
          />,
        ],
      },
    ],
    [handleViewDetails, handleEdit, handleDelete]
  );

  return (
    <>
      <Paper sx={{ p: { xs: 4, sm: 8 }, height: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={5}
          flexWrap="wrap"
          gap={3}
        >
          <Typography variant="h4" color="common.white">
            Liste des Articles
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Ajouter un Article
          </Button>
        </Stack>

        <Box sx={{ height: 1 }}>
          <DataGrid
            rows={blogs}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            autoHeight
            slots={{
              pagination: CustomPagination,
              noRowsOverlay: CustomNoResultsOverlay,
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #e0e0e0',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                borderBottom: '2px solid #e0e0e0',
              },
            }}
          />
        </Box>
      </Paper>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className='text-white'>
          {dialogMode === 'view' 
            ? 'Détails de l\'Article'
            : dialogMode === 'edit'
            ? 'Modifier l\'Article'
            : 'Ajouter un Article'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {dialogMode === 'view' ? (
              // View mode
              selectedBlog && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Titre
                    </Typography>
                    <Typography variant="body1">
                      {selectedBlog.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Auteur
                    </Typography>
                    <Typography variant="body1">
                      {selectedBlog.author}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body1">
                      {selectedBlog.date}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Description
                    </Typography>
                    <Typography variant="body1">
                      {selectedBlog.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Tags
                    </Typography>
                    <Typography variant="body1">
                      {selectedBlog.tags.join(', ')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Image
                    </Typography>
                    <Box
                      component="img"
                      src={selectedBlog.image}
                      alt={selectedBlog.title}
                      sx={{ maxWidth: '100%', height: 'auto', mt: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Contenu
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                      {selectedBlog.content}
                    </Typography>
                  </Grid>
                </>
              )
            ) : (
              // Edit/Add mode
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Titre"
                    value={editedBlog.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Auteur"
                    value={editedBlog.author || ''}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    value={editedBlog.date || ''}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    value={editedBlog.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    <Typography variant="subtitle1">Image</Typography>
                    <Box
                      sx={{
                        border: '2px dashed #ccc',
                        borderRadius: 1,
                        p: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button
                          component="span"
                          startIcon={<AddPhotoAlternateIcon />}
                          variant="outlined"
                        >
                          Choisir une image
                        </Button>
                      </label>
                    </Box>
                    {(imagePreview || editedBlog.image) && (
                      <Box sx={{ mt: 2 }}>
                        <img
                          src={imagePreview || editedBlog.image}
                          alt="Preview"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '200px',
                            objectFit: 'contain',
                          }}
                        />
                      </Box>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tags (séparés par des virgules)"
                    value={editedBlog.tags?.join(', ') || ''}
                    onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Contenu"
                    value={editedBlog.content || ''}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            {dialogMode === 'view' ? 'Fermer' : 'Annuler'}
          </Button>
          {dialogMode !== 'view' && (
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
            >
              {dialogMode === 'add' ? 'Ajouter' : 'Mettre à jour'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlogListPage;