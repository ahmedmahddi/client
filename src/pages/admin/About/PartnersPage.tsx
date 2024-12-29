import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
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

interface Partner {
  id?: number;
  image: string;
  title: string;
  link: string;
}

const PartnersPage = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [editedPartner, setEditedPartner] = useState<Partner | null>(null);
  const [newPartner, setNewPartner] = useState<Omit<Partner, "id">>({
    image: "",
    title: "",
    link: "./Gallery.html",
  });

  useEffect(() => {
    const initialPartners = [
      {
        id: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        title: "Google",
        link: "https://www.google.com",
      },
      {
        id: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        title: "IBM",
        link: "https://www.ibm.com",
      },
      {
        id: 3,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        title: "Microsoft",
        link: "https://www.microsoft.com",
      },
      {
        id: 4,
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        title: "Apple",
        link: "https://www.apple.com",
      },
      {
        id: 5,
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        title: "Amazon",
        link: "https://www.amazon.com",
      },
      {
        id: 6,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        title: "Netflix",
        link: "https://www.netflix.com",
      },
    ];
    setPartners(initialPartners);
  }, []);

  const handleEditClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setEditedPartner({ ...partner });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setDeleteDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editedPartner && selectedPartner) {
      setPartners((prevPartners) =>
        prevPartners.map((part) =>
          part.id === selectedPartner.id ? editedPartner : part
        )
      );
      setEditDialogOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedPartner) {
      setPartners((prevPartners) =>
        prevPartners.filter((part) => part.id !== selectedPartner.id)
      );
      setDeleteDialogOpen(false);
    }
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    target: "edit" | "new"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (target === "edit" && editedPartner) {
          setEditedPartner({ ...editedPartner, image: result });
        } else if (target === "new") {
          setNewPartner((prev) => ({ ...prev, image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSave = () => {
    if (newPartner.image && newPartner.title) {
      const newId = Math.max(...partners.map((part) => part.id || 0)) + 1;
      setPartners((prev) => [...prev, { ...newPartner, id: newId }]);
      setAddDialogOpen(false);
      setNewPartner({
        image: "",
        title: "",
        link: "./Gallery.html",
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
        {partners.map((partner) => (
          <Grid item xs={12} sm={6} md={4} key={partner.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                "&:hover .action-buttons": {
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
                image={partner.image}
                alt={partner.title}
                sx={{
                  objectFit: "cover",
                  transition: "filter 0.3s ease-in-out",
                }}
              />
              <Box sx={{ flexGrow: 1, p: 2 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  {partner.title}
                </Typography>
              </Box>
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
                  onClick={() => handleEditClick(partner)}
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
                  onClick={() => handleDeleteClick(partner)}
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
        <DialogTitle className="text-white">Modifier le partenaire</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography gutterBottom>Logo</Typography>
                {editedPartner?.image && (
                  <Box
                    component="img"
                    src={editedPartner.image}
                    alt="Preview"
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "contain",
                      mb: 2,
                    }}
                  />
                )}
                <Button variant="contained" component="label" fullWidth>
                  Changer l'image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "edit")}
                  />
                </Button>
              </Box>
            </Box>
            <TextField
              fullWidth
              label="Nom du partenaire"
              value={editedPartner?.title ?? ""}
              onChange={(e) =>
                setEditedPartner((prev) =>
                  prev ? { ...prev, title: e.target.value } : null
                )
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} className="text-white">
            Annuler
          </Button>
          <Button onClick={handleEditSave} variant="contained" className="text-white">
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
        <DialogTitle className="text-white">Ajouter un nouveau partenaire</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography gutterBottom>Logo</Typography>
                {newPartner.image ? (
                  <Box
                    component="img"
                    src={newPartner.image}
                    alt="Preview"
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "contain",
                      mb: 2,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: 200,
                      bgcolor: "background.default",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed",
                      borderColor: "divider",
                      mb: 2,
                    }}
                  >
                    <Typography color="text.secondary">
                      Aperçu du logo
                    </Typography>
                  </Box>
                )}
                <Button variant="contained" component="label" fullWidth>
                  Choisir l'image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "new")}
                  />
                </Button>
              </Box>
            </Box>
            <TextField
              fullWidth
              label="Nom du partenaire"
              value={newPartner.title}
              onChange={(e) =>
                setNewPartner((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddDialogOpen(false);
              setNewPartner({
                image: "",
                title: "",
                link: "./Gallery.html",
              });
            }}
            className="text-white"
          >
            Annuler
          </Button>
          <Button
            onClick={handleAddSave}
            variant="contained"
            disabled={!newPartner.image || !newPartner.title}
            className="text-white"
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
            Êtes-vous sûr de vouloir supprimer ce partenaire ? Cette action est
            irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} className="text-white">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained" className="text-white">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PartnersPage;