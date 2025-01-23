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

const ElectricityList = () => {
  const navigate = useNavigate();
  const [electricityRecords, setElectricityRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [deletingElectricityId, setDeletingElectricityId] = useState(null);
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
          const data = await getAllRecords(RecordType.ELECTRICITY);
          setElectricityRecords(data);
        } catch (error) {
          console.error('Error fetching electricity data:', error);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isLoggedIn]);

  const handleDelete = async id => {
    setDeletingElectricityId(id);
    try {
      await deleteRecord(RecordType.ELECTRICITY, id);
      setElectricityRecords(prevElectricityRecords => prevElectricityRecords.filter(record => record.id !== id));
    } catch (error) {
      console.error('Error deleting electricity data:', error);
    }
    setDeletingElectricityId(null);
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

  const filteredElectricityRecords = electricityRecords.filter(
    electricity =>
      electricity.area.toLowerCase().includes(searchTerm.toLowerCase()),
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
          You must be logged in to access the electricity list.{' '}
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

      <h2>Electricity Data</h2>
      <Button variant='contained' component={Link} to='/add-electricity'
              sx={{ marginBottom: '1rem', marginRight: '0.5rem' }}>
        Add Electricity Data
      </Button>

      <Button variant='contained' component={Link} to='/import-electricity' sx={{ marginBottom: '1rem' }}>
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
              <TableCell>Consumption (Kwh)</TableCell>
              <TableCell>Outage Duration (Minutes)</TableCell>
              <TableCell>Outage Reason</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredElectricityRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(record => (
              <TableRow key={record.id}>
                <TableCell>{record.city.name}</TableCell>
                <TableCell>{record.area}</TableCell>
                <TableCell>{record.consumptionKwh}</TableCell>
                <TableCell>{record.outageDurationMinutes}</TableCell>
                <TableCell>{record.outageReason}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    component={Link}
                    to={`/edit-electricity/${record.id}`}
                    sx={{ marginRight: '0.5rem', marginBottom: '0.25rem' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleDelete(record.id)}
                    disabled={deletingElectricityId === record.id}
                    sx={{ marginBottom: '0.25rem' }}
                    startIcon={deletingElectricityId === record.id ? <CircularProgress size={20} /> : null}
                  >
                    {deletingElectricityId === record.id ? 'Deleting...' : 'Delete'}
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
        count={filteredElectricityRecords.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ElectricityList;
