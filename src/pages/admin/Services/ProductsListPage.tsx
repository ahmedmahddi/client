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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface ProductType {
  title: string;
  icon: string;
}

const productTypes: ProductType[] = [
  { title: "Menuiseries coulissantes", icon: "/images/icon/sliding-door.png" },
  { title: "Murs rideaux", icon: "/images/icon/window.png" },
  { title: "Fenetres", icon: "/images/icon/garage.png" },
  { title: "Garde-corps", icon: "/images/icon/stairs.png" },
  { title: "Cabines de douche", icon: "/images/icon/shower.png" },
  { title: "Alucobond", icon: "/images/icon/frame.png" },
];

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
}

const ProductsListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    image: "",
    title: "",
    description: "",
    link: "services-details.html",
  });

  useEffect(() => {
    const initialProducts = [
      {
        id: 1,
        image: "/images/window1.jpg",
        title: "Menuiseries coulissantes",
        description:
          "portes et fenêtres offrant une isolation performante et un design moderne.",
        link: "services-details.html",
      },
      {
        id: 2,
        image: "/images/mur-rideaux2.jpg",
        title: "Murs rideaux",
        description:
          "solutions architecturales pour des façades vitrées élégantes.",
        link: "services-details.html",
      },
      {
        id: 3,
        image: "/images/window2.jpg",
        title: "Fenetres",
        description: "systèmes de protection solaire et de sécurité.",
        link: "services-details.html",
      },
      {
        id: 4,
        image: "/images/garde-corp2.jpg",
        title: "Garde-corps",
        description: "éléments de sécurité alliant robustesse et design.",
        link: "services-details.html",
      },
      {
        id: 5,
        image: "/images/douche2.jpg",
        title: "Cabines de douche",
        description: "Solutions modernes et élégantes pour cabines de douches.",
        link: "services-details.html",
      },
      {
        id: 6,
        image: "/images/alucobond.jpeg",
        title: "Alucobond",
        description:
          "panneaux composites en aluminium pour l'habillage de façades.",
        link: "services-details.html",
      },
    ];
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);

  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.title === selectedFilter)
      );
    }
  }, [selectedFilter, products]);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editedProduct && selectedProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === selectedProduct.id ? editedProduct : prod
        )
      );
      setEditDialogOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedProduct) {
      setProducts((prevProducts) =>
        prevProducts.filter((prod) => prod.id !== selectedProduct.id)
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
        if (target === "edit" && editedProduct) {
          setEditedProduct({ ...editedProduct, image: result });
        } else if (target === "new") {
          setNewProduct((prev) => ({ ...prev, image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSave = () => {
    if (newProduct.image && newProduct.title && newProduct.description) {
      const newId = Math.max(...products.map((prod) => prod.id)) + 1;
      setProducts((prev) => [...prev, { ...newProduct, id: newId }]);
      setAddDialogOpen(false);
      setNewProduct({
        image: "",
        title: "",
        description: "",
        link: "services-details.html",
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={selectedFilter}
            label="Filtrer par type"
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <MenuItem value="all" className="text-white">Tous les produits</MenuItem>
            {productTypes.map((type) => (
              <MenuItem key={type.title} value={type.title}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <span className="text-white">{type.title}</span>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Fab color="primary" aria-label="add" onClick={handleAddClick}>
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                height: "650px",
                display: "flex",
                flexDirection: "column",
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
                image={product.image}
                alt={product.title}
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
                  {product.title}
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
                  onClick={() => handleEditClick(product)}
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
                  onClick={() => handleDeleteClick(product)}
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

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Modifier le produit</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography gutterBottom>Image principale</Typography>
                {editedProduct?.image && (
                  <Box
                    component="img"
                    src={editedProduct.image}
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
              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>Type de produit</InputLabel>
                  <Select
                    value={editedProduct?.title ?? ""}
                    label="Type de produit"
                    onChange={(e) =>
                      setEditedProduct((prev) =>
                        prev ? { ...prev, title: e.target.value } : null
                      )
                    }
                  >
                    {productTypes.map((type) => (
                      <MenuItem key={type.title} value={type.title}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <img src={type.icon} alt="" width="24" height="24" />
                          <span>{type.title}</span>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={editedProduct?.description ?? ""}
              onChange={(e) =>
                setEditedProduct((prev) =>
                  prev ? { ...prev, description: e.target.value } : null
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

      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Ajouter un nouveau produit</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography gutterBottom>Image principale</Typography>
                {newProduct.image ? (
                  <Box
                    component="img"
                    src={newProduct.image}
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
                      Aperçu de l'image
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
              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>Type de produit</InputLabel>
                  <Select
                    value={newProduct.title}
                    label="Type de produit"
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  >
                    {productTypes.map((type) => (
                      <MenuItem key={type.title} value={type.title}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <img src={type.icon} alt="" width="24" height="24" />
                          <span>{type.title}</span>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddDialogOpen(false);
              setNewProduct({
                image: "",
                title: "",
                description: "",
                link: "services-details.html",
              });
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleAddSave}
            variant="contained"
            disabled={
              !newProduct.image || !newProduct.title || !newProduct.description
            }
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est
            irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsListPage;
