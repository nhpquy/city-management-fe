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

const WaterSupplyDataForm = () => {
  const [waterSupply, setWaterSupply] = useState({
    consumptionLiters: '',
    area: '',
    productionLiters: '',
    reservoirLevelPercentage: '',
    rainfallMm: '',
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
          const waterSupplyData = await getRecordById(RecordType.WATER_SUPPLY, id);
          if (waterSupplyData) {
            setWaterSupply({
              consumptionLiters: waterSupplyData.consumptionLiters || '',
              area: waterSupplyData.area || '',
              productionLiters: waterSupplyData.productionLiters || '',
              reservoirLevelPercentage: waterSupplyData.reservoirLevelPercentage || '',
              rainfallMm: waterSupplyData.rainfallMm || '',
              cityId: waterSupplyData.city ? waterSupplyData.city.id : '',
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
      setWaterSupply({ ...waterSupply, cityId: value });
    } else {
      setWaterSupply({
        ...waterSupply,
        [name]: ['consumptionLiters', 'productionLiters', 'reservoirLevelPercentage', 'rainfallMm'].includes(name) ? Number(value) : value, // Convert to number
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await updateRecord(RecordType.WATER_SUPPLY, id, waterSupply);
      } else {
        await addRecord(RecordType.WATER_SUPPLY, waterSupply);
      }
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
      <h2>{id ? 'Edit Water Supply Data' : 'Add Water Supply Data'}</h2>
      <TextField select label='City' name='city.id' value={waterSupply.cityId || ''} onChange={handleChange} required>
        <MenuItem value=''>Select City</MenuItem>
        {cities.map(city => (
          <MenuItem key={city.id} value={city.id}>
            {city.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField label='Area' name='area' value={waterSupply.area} onChange={handleChange} required />
      <TextField label='Consumption (L)' name='consumptionLiters' type='number' value={waterSupply.consumptionLiters}
                 onChange={handleChange} required />
      <TextField label='Production (L)' name='productionLiters' type='number' value={waterSupply.productionLiters}
                 onChange={handleChange} />
      <TextField label='Reservoir Level (%)' name='reservoirLevelPercentage' type='number'
                 value={waterSupply.reservoirLevelPercentage} onChange={handleChange} />
      <TextField label='Rainfall (MM)' name='rainfallMm' type='number' value={waterSupply.rainfallMm}
                 onChange={handleChange} />
      <TextField label='Date' InputLabelProps={{ shrink: true }} name='date' type='date' value={waterSupply.date} onChange={handleChange} required />
      <Button type='submit' variant='contained' color='primary' sx={{ marginTop: '1rem' }}>
        Save
      </Button>
    </Box>
  );
};

export default WaterSupplyDataForm;
