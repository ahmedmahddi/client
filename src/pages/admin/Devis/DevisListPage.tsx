import { useState, ChangeEvent, useCallback, useMemo, ReactElement } from 'react';
import {
  Box,
  Stack,
  Paper,
  TextField,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import CustomPagination from 'components/common/CustomPagination';
import CustomNoResultsOverlay from 'components/common/CustomNoResultsOverlay';

interface DevisData {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  projectType: string;
  otherProjectType?: string;
  estimateBudget: string;
  maxTimeProject: string;
  companyName?: string;
  country: string;
  message: string;
  file?: string;
  createdAt: string;
  status: 'pending' | 'processed' | 'rejected';
}

const mockDevis: DevisData[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+216 12 345 678',
    email: 'john@example.com',
    projectType: 'Fenêtres',
    estimateBudget: '5000',
    maxTimeProject: '2 mois',
    companyName: 'ABC Corp',
    country: 'Tunis',
    message: 'Je souhaite installer des fenêtres en PVC...',
    createdAt: '2024-12-30T12:00:00.000Z',
    status: 'pending',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+216 12 345 678',
    email: 'john@example.com',
    projectType: 'Fenêtres',
    estimateBudget: '5000',
    maxTimeProject: '2 mois',
    companyName: 'ABC Corp',
    country: 'Tunis',
    message: 'Je souhaite installer des fenêtres en PVC...',
    createdAt: '2024-12-30T12:00:00.000Z',
    status: 'pending',
  },
  {
    id: 3,
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+216 12 345 678',
    email: 'john@example.com',
    projectType: 'Fenêtres',
    estimateBudget: '5000',
    maxTimeProject: '2 mois',
    companyName: 'ABC Corp',
    country: 'Tunis',
    message: 'Je souhaite installer des fenêtres en PVC...',
    createdAt: '2024-12-30T12:00:00.000Z',
    status: 'pending',
  },
  {
    id: 4,
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+216 12 345 678',
    email: 'john@example.com',
    projectType: 'Fenêtres',
    estimateBudget: '5000',
    maxTimeProject: '2 mois',
    companyName: 'ABC Corp',
    country: 'Tunis',
    message: 'Je souhaite installer des fenêtres en PVC...',
    createdAt: '2024-12-30T12:00:00.000Z',
    status: 'pending',
  },
];

const DevisListPage = (): ReactElement => {
  const [search, setSearch] = useState('');
  const [devis, setDevis] = useState<DevisData[]>(mockDevis);
  const [selectedDevis, setSelectedDevis] = useState<DevisData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<DevisData['status']>('pending');

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  }, []);

  const handleViewDetails = useCallback((devis: DevisData) => {
    setSelectedDevis(devis);
    setNewStatus(devis.status);
    setDialogOpen(true);
  }, []);

  const handleDelete = useCallback((id: number) => {
    setDevis((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleStatusChange = useCallback(
    (event: SelectChangeEvent<DevisData['status']>) => {
      setNewStatus(event.target.value as DevisData['status']);
    },
    []
  );

  const handleUpdateStatus = useCallback(() => {
    if (selectedDevis) {
      setDevis((prev) =>
        prev.map((item) =>
          item.id === selectedDevis.id ? { ...item, status: newStatus } : item
        )
      );
      setDialogOpen(false);
    }
  }, [selectedDevis, newStatus]);

  const columns: GridColDef<DevisData>[] = useMemo(
    () => [
      {
        field: 'fullName',
        headerName: 'Nom Complet',
        flex: 1,
        minWidth: 180,
        renderCell: (params: GridRenderCellParams<DevisData>) => (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2">
              {`${params.row.firstName} ${params.row.lastName}`}
            </Typography>
          </Stack>
        ),
      },
      {
        field: 'phoneNumber',
        headerName: 'Téléphone',
        flex: 1,
        minWidth: 130,
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'projectType',
        headerName: 'Type de Projet',
        flex: 1,
        minWidth: 150,
        renderCell: (params: GridRenderCellParams<DevisData>) => (
          <Typography variant="body2">
            {params.row.projectType === 'autre' && params.row.otherProjectType
              ? params.row.otherProjectType
              : params.row.projectType}
          </Typography>
        ),
      },
      {
        field: 'estimateBudget',
        headerName: 'Budget',
        flex: 1,
        minWidth: 120,
      },
      {
        field: 'country',
        headerName: 'Gouvernorat',
        flex: 1,
        minWidth: 130,
      },
      {
        field: 'status',
        headerName: 'Statut',
        flex: 1,
        minWidth: 120,
        renderCell: (params: GridRenderCellParams<DevisData>) => {
          const statusColors: Record<DevisData['status'], string> = {
            pending: '#FFA500',
            processed: '#4CAF50',
            rejected: '#F44336',
          };
          const statusLabels: Record<DevisData['status'], string> = {
            pending: 'En attente',
            processed: 'Traité',
            rejected: 'Rejeté',
          };
          return (
            <Typography
              variant="body2"
              sx={{
                color: statusColors[params.row.status],
                fontWeight: 'bold',
              }}
            >
              {statusLabels[params.row.status]}
            </Typography>
          );
        },
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        flex: 1,
        minWidth: 120,
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
    [handleViewDetails, handleDelete]
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
            Liste des Devis
          </Typography>
          <TextField
            variant="filled"
            placeholder="Rechercher..."
            value={search}
            onChange={handleChange}
            sx={{
              width: { xs: 1, sm: 'auto' },
              '& .MuiFilledInput-input': {
                py: 2,
              },
            }}
          />
        </Stack>

        <Box sx={{ height: 1 }}>
          <DataGrid
            rows={devis}
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
        <DialogTitle>Détails du Devis</DialogTitle>
        <DialogContent>
          {selectedDevis && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Nom Complet
                </Typography>
                <Typography variant="body1">
                  {`${selectedDevis.firstName} ${selectedDevis.lastName}`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {selectedDevis.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Téléphone
                </Typography>
                <Typography variant="body1">
                  {selectedDevis.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Type de Projet
                </Typography>
                <Typography variant="body1">
                  {selectedDevis.projectType === 'autre' &&
                  selectedDevis.otherProjectType
                    ? selectedDevis.otherProjectType
                    : selectedDevis.projectType}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Budget Estimé
                </Typography>
                <Typography variant="body1">
                  {selectedDevis.estimateBudget}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Délai Maximum
                </Typography>
                <Typography variant="body1">
                  {selectedDevis.maxTimeProject}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Entreprise
                </Typography>
                <Typography variant="body1">
                  {selectedDevis.companyName ?? 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Gouvernorat
                </Typography>
                <Typography variant="body1">
                  {selectedDevis.country}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Message
                </Typography>
                <Typography variant="body1">
                  {selectedDevis.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Statut</InputLabel>
                  <Select
                    value={newStatus}
                    label="Statut"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="pending">En attente</MenuItem>
                    <MenuItem value="processed">Traité</MenuItem>
                    <MenuItem value="rejected">Rejeté</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button
            onClick={handleUpdateStatus}
            variant="contained"
            color="primary"
          >
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DevisListPage;
