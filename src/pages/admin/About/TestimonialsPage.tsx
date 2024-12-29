import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  DialogContentText,
  Fab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface Testimonial {
  id?: number;
  text: string;
  name: string;
  position: string;
}

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [editedTestimonial, setEditedTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, "id">>({
    text: "",
    name: "",
    position: "",
  });

  useEffect(() => {
    const initialTestimonials = [
      {
        id: 1,
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsuma has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        name: "David Matin",
        position: "Student",
      },
      {
        id: 2,
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        name: "Jane Doe",
        position: "Teacher",
      },
      {
        id: 3,
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        name: "John Smith",
        position: "Engineer",
      },
    ];
    setTestimonials(initialTestimonials);
  }, []);

  const handleEditClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setEditedTestimonial({ ...testimonial });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setDeleteDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editedTestimonial && selectedTestimonial) {
      setTestimonials((prevTestimonials) =>
        prevTestimonials.map((test) =>
          test.id === selectedTestimonial.id ? editedTestimonial : test
        )
      );
      setEditDialogOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedTestimonial) {
      setTestimonials((prevTestimonials) =>
        prevTestimonials.filter((test) => test.id !== selectedTestimonial.id)
      );
      setDeleteDialogOpen(false);
    }
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddSave = () => {
    if (newTestimonial.text && newTestimonial.name && newTestimonial.position) {
      const newId = Math.max(...testimonials.map((test) => test.id || 0)) + 1;
      setTestimonials((prev) => [...prev, { ...newTestimonial, id: newId }]);
      setAddDialogOpen(false);
      setNewTestimonial({
        text: "",
        name: "",
        position: "",
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Fab color="primary" aria-label="add" onClick={handleAddClick}>
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={3}>
        {testimonials.map((testimonial) => (
          <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
            <Card
              sx={{
                height: "350px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                "&:hover .action-buttons": {
                  opacity: 1,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: "white" }}
                >
                  {testimonial.text}
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: "white" }}>
                  {testimonial.name}
                </Typography>
                <Typography sx={{ color: "white" }}>
                  {testimonial.position}
                </Typography>
              </CardContent>
              <Box
                className="action-buttons"
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
                  onClick={() => handleEditClick(testimonial)}
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
                  onClick={() => handleDeleteClick(testimonial)}
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
        <DialogTitle className="text-white">Modifier le témoignage</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nom"
              value={editedTestimonial?.name ?? ""}
              onChange={(e) =>
                setEditedTestimonial((prev) =>
                  prev ? { ...prev, name: e.target.value } : null
                )
              }
            />
            <TextField
              fullWidth
              label="Position"
              value={editedTestimonial?.position ?? ""}
              onChange={(e) =>
                setEditedTestimonial((prev) =>
                  prev ? { ...prev, position: e.target.value } : null
                )
              }
            />
            <TextField
              fullWidth
              label="Témoignage"
              multiline
              rows={4}
              value={editedTestimonial?.text ?? ""}
              onChange={(e) =>
                setEditedTestimonial((prev) =>
                  prev ? { ...prev, text: e.target.value } : null
                )
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleEditSave} variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="text-white">Ajouter un nouveau témoignage</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nom"
              value={newTestimonial.name}
              onChange={(e) =>
                setNewTestimonial((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <TextField
              fullWidth
              label="Position"
              value={newTestimonial.position}
              onChange={(e) =>
                setNewTestimonial((prev) => ({
                  ...prev,
                  position: e.target.value,
                }))
              }
            />
            <TextField
              fullWidth
              label="Témoignage"
              multiline
              rows={4}
              value={newTestimonial.text}
              onChange={(e) =>
                setNewTestimonial((prev) => ({
                  ...prev,
                  text: e.target.value,
                }))
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddDialogOpen(false);
              setNewTestimonial({
                text: "",
                name: "",
                position: "",
              });
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleAddSave}
            variant="contained"
            disabled={
              !newTestimonial.text ||
              !newTestimonial.name ||
              !newTestimonial.position
            }
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle className="text-white">Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-white">
            Êtes-vous sûr de vouloir supprimer ce témoignage ? Cette action est
            irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} className="text-white">Annuler</Button>
          <Button onClick={handleDelete} color="error" variant="contained" className="text-white">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestimonialsPage;