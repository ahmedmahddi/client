import { useState, useCallback, useMemo, ReactElement } from 'react';
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

interface MessageData {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'processed' | 'rejected';
}

const mockMessages: MessageData[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+216 12 345 678',
    subject: 'Question sur les services',
    message: 'Je souhaite en savoir plus sur vos services...',
    createdAt: '2024-12-30T12:00:00.000Z',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+216 98 765 432',
    subject: 'Demande de rendez-vous',
    message: 'Je voudrais prendre un rendez-vous pour discuter...',
    createdAt: '2024-12-29T15:30:00.000Z',
    status: 'processed',
  },
];

const MessagesListPage = (): ReactElement => {

  const [messages, setMessages] = useState<MessageData[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<MessageData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<MessageData['status']>('pending');


  const handleViewDetails = useCallback((message: MessageData) => {
    setSelectedMessage(message);
    setNewStatus(message.status);
    setDialogOpen(true);
  }, []);

  const handleDelete = useCallback((id: number) => {
    setMessages((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleStatusChange = useCallback(
    (event: SelectChangeEvent<MessageData['status']>) => {
      setNewStatus(event.target.value as MessageData['status']);
    },
    []
  );

  const handleUpdateStatus = useCallback(() => {
    if (selectedMessage) {
      setMessages((prev) =>
        prev.map((item) =>
          item.id === selectedMessage.id ? { ...item, status: newStatus } : item
        )
      );
      setDialogOpen(false);
    }
  }, [selectedMessage, newStatus]);

  const columns: GridColDef<MessageData>[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Nom',
        flex: 1,
        minWidth: 180,
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'phone',
        headerName: 'Téléphone',
        flex: 1,
        minWidth: 130,
      },
      {
        field: 'subject',
        headerName: 'Sujet',
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'status',
        headerName: 'Statut',
        flex: 1,
        minWidth: 120,
        renderCell: (params: GridRenderCellParams<MessageData>) => {
          const statusColors: Record<MessageData['status'], string> = {
            pending: '#FFA500',
            processed: '#4CAF50',
            rejected: '#F44336',
          };
          const statusLabels: Record<MessageData['status'], string> = {
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
            Liste des Messages
          </Typography>
          
        </Stack>

        <Box sx={{ height: 1 }}>
          <DataGrid
            rows={messages}
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
        <DialogTitle className='text-white'>Détails du Message</DialogTitle>
        <DialogContent>
          {selectedMessage && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Nom
                </Typography>
                <Typography variant="body1">
                  {selectedMessage.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {selectedMessage.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Téléphone
                </Typography>
                <Typography variant="body1">
                  {selectedMessage.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Sujet
                </Typography>
                <Typography variant="body1">
                  {selectedMessage.subject}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Message
                </Typography>
                <Typography variant="body1">
                  {selectedMessage.message}
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

export default MessagesListPage;
