import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Dashboard from './components/Dashboard';
import ElectricityList from './components/electricity/ElectricityList';
import CityList from './components/city/CityList';
import CityForm from './components/city/CityForm';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Profile from './components/auth/Profile';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import VerifyUsername from './components/VerifyUsername';
import NotFoundPage from './components/NotFoundPage';
import ElectricityDataForm from './components/electricity/ElectricityDataForm';
import ElectricityDataImport from './components/electricity/ElectricityDataImport';
import WaterSupplyList from './components/watersupply/WaterSupplyList';
import WaterSupplyDataForm from './components/watersupply/WaterSupplyDataForm';
import WaterSupplyDataImport from './components/watersupply/WaterSupplyDataImport';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container maxWidth='lg' style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/electricity-list' element={<ElectricityList />} />
          <Route path='/add-electricity' element={<ElectricityDataForm />} />
          <Route path='/edit-electricity/:id' element={<ElectricityDataForm />} />
          <Route path='/import-electricity' element={<ElectricityDataImport />} />

          <Route path='/water-supply-list' element={<WaterSupplyList />} />
          <Route path='/add-water-supply' element={<WaterSupplyDataForm />} />
          <Route path='/edit-water-supply/:id' element={<WaterSupplyDataForm />} />
          <Route path='/import-water-supply' element={<WaterSupplyDataImport />} />

          <Route path='/add-city' element={<CityForm />} />
          <Route path='/edit-city/:id' element={<CityForm />} />
          <Route path='/cities' element={<CityList />} />

          <Route path='/verify-username' element={<VerifyUsername />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
