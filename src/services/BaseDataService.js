import axios from 'axios';

export const RecordType = {
  CITY: 'city',
  ELECTRICITY: 'electricity',
  WATER_SUPPLY: 'water-supply',
  WASTE: 'waste'
};

const API_URL = 'http://localhost:8080/api';

export const getAllRecords = async (recordType) => {
  const response = await axios.get(`${API_URL}/${recordType}`);
  return response.data;
};

export const getRecordById = async (recordType, id) => {
  const response = await axios.get(`${API_URL}/${recordType}/${id}`);
  return response.data;
};

export const addRecord = async (recordType, record) => {
  const response = await axios.post(`${API_URL}/${recordType}`, record);
  return response.data;
};

export const updateRecord = async (recordType, id, record) => {
  const response = await axios.put(`${API_URL}/${recordType}/${id}`, record);
  return response.data;
};

export const deleteRecord = async (recordType, id) => {
  await axios.delete(`${API_URL}/${recordType}/${id}`);
};

export const handleFileRecordUpload = async (recordType, cityId, file) => {
  if (!file) {
    alert('Please select a file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    await axios.post(`${API_URL}/${recordType}/city/${cityId}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('File uploaded successfully!');
  } catch (err) {
    console.error(err);
    alert('Error uploading file.');
  }
};
