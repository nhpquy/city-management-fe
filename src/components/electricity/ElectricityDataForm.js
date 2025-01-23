import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { addRecord, getAllRecords, getRecordById, RecordType, updateRecord } from '../../services/BaseDataService';

const CenteredSpinner = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const ElectricityDataForm = () => {
  const [electricity, setElectricity] = useState({
    consumptionKwh: '',
    area: '',
    outageDurationMinutes: '',
    outageReason: 'None',
    date: '',
    cityId: '',
  });
  const [cities, setCities] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const cityData = await getAllRecords(RecordType.CITY);
        setCities(cityData);

        if (id) {
          const electricityData = await getRecordById(RecordType.ELECTRICITY, id);
          if (electricityData) {
            setElectricity({
              consumptionKwh: electricityData.consumptionKwh || '',
              area: electricityData.area || '',
              outageDurationMinutes: electricityData.outageDurationMinutes || '',
              outageReason: electricityData.outageReason || 'None',
              cityId: electricityData.city ? electricityData.city.id : '',
            });
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'city.id') {
      setElectricity({ ...electricity, cityId: value });
    } else {
      setElectricity({
        ...electricity,
        [name]: ['consumptionKwh', 'outageDurationMinutes'].includes(name) ? Number(value) : value, // Convert to number
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await updateRecord(RecordType.ELECTRICITY, id, electricity);
      } else {
        await addRecord(RecordType.ELECTRICITY, electricity);
      }
      setIsLoading(false);
      navigate('/electricity-list');
    } catch (error) {
      console.error('Error saving electricity data:', error);
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
      <h2>{id ? 'Edit Electricity Data' : 'Add Electricity Data'}</h2>
      <TextField select label='City' name='city.id' value={electricity.cityId || ''} onChange={handleChange} required>
        <MenuItem value=''>Select City</MenuItem>
        {cities.map(city => (
          <MenuItem key={city.id} value={city.id}>
            {city.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField label='Area' name='area' value={electricity.area} onChange={handleChange} required />
      <TextField label='Consumption (Kwh)' name='consumptionKwh' type='number' value={electricity.consumptionKwh}
                 onChange={handleChange} required />
      <TextField label='Outage Duration (Minutes)' name='outageDurationMinutes' type='number'
                 value={electricity.outageDurationMinutes} onChange={handleChange} />
      <TextField label='Outage Reason' name='outageReason' value={electricity.outageReason} onChange={handleChange} />
      <TextField label='Date' InputLabelProps={{ shrink: true }} name='date' type='date' value={electricity.date} onChange={handleChange} required />
      <Button type='submit' variant='contained' color='primary' sx={{ marginTop: '1rem' }}>
        Save
      </Button>
    </Box>
  );
};

export default ElectricityDataForm;
