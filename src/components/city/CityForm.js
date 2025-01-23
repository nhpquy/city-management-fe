import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { addRecord, getRecordById, RecordType, updateRecord } from '../../services/BaseDataService'; // Import necessary MUI components

const CityForm = () => {
  const [city, setCity] = useState({ name: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State for loading

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoading(true); // Start loading
        try {
          const cityData = await getRecordById(RecordType.CITY, id);
          setCity(cityData);
        } catch (error) {
          console.error('Error fetching city data:', error);
        } finally {
          setIsLoading(false); // Stop loading
        }
      }
    };
    fetchData();
  }, [id]);

  const handleChange = e => {
    setCity({ ...city, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      if (id) {
        await updateRecord(RecordType.CITY, id, city);
      } else {
        await addRecord(RecordType.CITY, city);
      }
      setIsLoading(false); // Stop loading
      navigate('/cities');
    } catch (error) {
      console.error('Error saving city:', error);
      setIsLoading(false); // Stop loading
    }
  };

  // If loading, show centered spinner
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component='form' onSubmit={handleSubmit}
         sx={{ '& .MuiTextField-root': { marginBottom: '1rem', width: '100%' }, maxWidth: '400px', margin: '0 auto' }}>
      <h2>{id ? 'Edit City' : 'Add City'}</h2>
      <TextField label='City Name' name='name' value={city.name} onChange={handleChange} required fullWidth />
      <TextField label='Country Name' name='country' value={city.country} onChange={handleChange} required fullWidth />
      <Button type='submit' variant='contained' color='primary' sx={{ marginTop: '1rem' }}>
        Save
      </Button>
    </Box>
  );
};

export default CityForm;
