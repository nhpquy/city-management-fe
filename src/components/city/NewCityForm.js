import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField } from '@mui/material';

const NewCityForm = () => {
  const [city, setCity] = useState({ name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input change for city name
  const handleChange = e => {
    setCity({ ...city, [e.target.name]: e.target.value });
  };

  // Handle form submission to create a new city
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner
    setError(null); // Reset any previous error

    const newCity = {
      // generate random id from 0-9999
      id: Math.floor(Math.random() * 10000),
      name: city.name,
      state: city.state,
      country: city.country,
      waterSupplyData: [],
      electricityData: [],
      wasteData: [],
    };

    try {
      const response = await fetch('http://localhost:8080/api/city', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity), // Send the new city data as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to create city');
      }

      // Navigate to the cities list after successful creation
      navigate('/cities');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create city. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit}
         sx={{ '& .MuiTextField-root': { marginBottom: '1rem', width: '100%' }, maxWidth: '400px', margin: '0 auto' }}>
      <h2>Create New City</h2>
      <TextField label='City Name' name='name' value={city.name} onChange={handleChange} required fullWidth />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type='submit' variant='contained' color='primary' sx={{ marginTop: '1rem' }} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Save'}
      </Button>
    </Box>
  );
};

export default NewCityForm;
