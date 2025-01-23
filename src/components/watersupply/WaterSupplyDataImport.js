import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { getAllRecords, handleFileRecordUpload, RecordType } from '../../services/BaseDataService';

const CenteredSpinner = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const WaterSupplyDataImport = () => {
  const [file, setFile] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const cityData = await getAllRecords(RecordType.CITY);
        setCities(cityData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching city data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file || !selectedCityId) {
      alert('Please upload a CSV file and select a city.');
      return;
    }

    setIsLoading(true);
    try {
      await handleFileRecordUpload(RecordType.WATER_SUPPLY, selectedCityId, file);
      setIsLoading(false);
      navigate('/water-supply-list');
    } catch (error) {
      console.error('Error saving water supply data:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <CenteredSpinner>
        <CircularProgress />
      </CenteredSpinner>
    );
  }

  return (
    <Box component='form' onSubmit={handleSubmit}
         sx={{ '& .MuiTextField-root': { marginBottom: '1rem', width: '100%' } }}>
      <h2>{'Import Water Supply Data'}</h2>
      <TextField select label='City' name='city.id' value={selectedCityId} onChange={handleCityChange} required>
        <MenuItem value=''>Select City</MenuItem>
        {cities.map(city => (
          <MenuItem key={city.id} value={city.id}>
            {city.name}
          </MenuItem>
        ))}
      </TextField>
      <div>
        <label htmlFor='file'>Upload CSV: </label>
        <input type='file' id='file' accept='.csv' onChange={handleFileChange} />
      </div>
      <Button type='submit' variant='contained' color='primary' sx={{ marginTop: '1rem' }}>
        Import
      </Button>
    </Box>
  );
};

export default WaterSupplyDataImport;
