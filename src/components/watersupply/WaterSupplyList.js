import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { deleteRecord, getAllRecords, RecordType } from '../../services/BaseDataService';

const WaterSupplyList = () => {
  const navigate = useNavigate();
  const [waterSupplyRecords, setWaterSupplyRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [deletingWaterSupplyId, setDeletingWaterSupplyId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setShowSnackbar(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await getAllRecords(RecordType.WATER_SUPPLY);
          setWaterSupplyRecords(data);
        } catch (error) {
          console.error('Error fetching water supply data:', error);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isLoggedIn]);

  const handleDelete = async id => {
    setDeletingWaterSupplyId(id);
    try {
      await deleteRecord(RecordType.WATER_SUPPLY, id);
      setWaterSupplyRecords(prevRecords => prevRecords.filter(record => record.id !== id));
    } catch (error) {
      console.error('Error deleting water supply data:', error);
    }
    setDeletingWaterSupplyId(null);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page to 0 whenever search term changes
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const filteredWaterSupplyRecords = waterSupplyRecords.filter(
    record =>
      record.area.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    navigate('/login', { replace: true });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <Box>
      <Snackbar open={showSnackbar} onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ mt: 9 }}>
        <Alert onClose={handleCloseSnackbar} severity='warning' sx={{ width: '100%' }}>
          You must be logged in to access the water supply list.{' '}
          <span
            onClick={handleLoginRedirect}
            style={{
              color: '#3f51b5',
              textDecoration: 'underline',
              cursor: 'pointer',
              transition: 'color 0.1s',
            }}
            onMouseEnter={e => (e.target.style.color = '#f57c00')}
            onMouseLeave={e => (e.target.style.color = '#3f51b5')}
          >
            Login
          </span>
        </Alert>
      </Snackbar>

      <h2>Water Supply Data</h2>
      <Button variant='contained' component={Link} to='/add-water-supply'
              sx={{ marginBottom: '1rem', marginRight: '0.5rem' }}>
        Add Water Supply Data
      </Button>

      <Button variant='contained' component={Link} to='/import-water-supply' sx={{ marginBottom: '1rem' }}>
        Import Data File
      </Button>
      <TextField
        label='Search for an city...'
        variant='outlined'
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: '1rem', width: '100%' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Consumption (L)</TableCell>
              <TableCell>Production (L)</TableCell>
              <TableCell>Reservoir Level (%)</TableCell>
              <TableCell>Rainfall (MM)</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWaterSupplyRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(record => (
              <TableRow key={record.id}>
                <TableCell>{record.city.name}</TableCell>
                <TableCell>{record.area}</TableCell>
                <TableCell>{record.consumptionLiters}</TableCell>
                <TableCell>{record.productionLiters}</TableCell>
                <TableCell>{record.reservoirLevelPercentage}</TableCell>
                <TableCell>{record.rainfallMm}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    component={Link}
                    to={`/edit-water-supply/${record.id}`}
                    sx={{ marginRight: '0.5rem', marginBottom: '0.25rem' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleDelete(record.id)}
                    disabled={deletingWaterSupplyId === record.id}
                    sx={{ marginBottom: '0.25rem' }}
                    startIcon={deletingWaterSupplyId === record.id ? <CircularProgress size={20} /> : null}
                  >
                    {deletingWaterSupplyId === record.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={filteredWaterSupplyRecords.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default WaterSupplyList;
