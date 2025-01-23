import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import {
  aggregateElectricData,
  averageElectricConsumption,
  monthlyTrend,
  outageReasonData,
} from '../services/ElectricityService';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import TrendsAnalysis from './electricity/TrendsAnalysis';
import {
  prepareChartData,
  prepareMonthlyTrendChartData,
  prepareOutageDurationScatterData, prepareReservoirLevelsChartData,
  prepareWaterSupplyComparisonChartData,
} from '../services/ChartDataService';
import { getAllRecords, RecordType } from '../services/BaseDataService';
import {
  aggregateWaterSupplyData,
  averageWaterSupplyData,
  monthlyConsumptionTrend,
  monthlyRainfallTrend,
} from '../services/WaterSupplyService';

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [cityCount, setCityCount] = useState(0);
  const [totalElectricConsumption, setTotalElectricConsumption] = useState(0);
  const [totalWaterSupplyConsumption, setTotalWaterSupplyConsumption] = useState(0);

  //Electric
  const [totalElectricConsumptionData, setTotalElectricConsumptionData] = useState({});
  const [averageElectricConsumptionData, setAverageElectricConsumptionData] = useState({});
  const [outageReasonDataState, setOutageReasonDataState] = useState({});
  const [monthlyTrendElectricData, setMonthlyTrendElectricData] = useState({});
  const [outageImpactData, setOutageImpactData] = useState({});

  //Water supply
  const [totalWaterSupplyConsumptionData, setTotalWaterSupplyConsumptionData] = useState({});
  const [averageWaterSupplyConsumptionData, setAverageWaterSupplyConsumptionData] = useState({});
  const [compareWaterSupplyData, setCompareWaterSupplyData] = useState({});
  const [reservoirLevelsData, setReservoirLevelsData] = useState({});
  const [monthlyTrendWaterSupplyData, setMonthlyTrendWaterSupplyData] = useState({});
  const [monthlyTrendRainfallData, setMonthlyTrendRainfallData] = useState({});

  // Water Supply
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      const cities = await getAllRecords(RecordType.CITY);
      const electricityRecords = await getAllRecords(RecordType.ELECTRICITY);
      const waterSupplyRecords = await getAllRecords(RecordType.WATER_SUPPLY);

      setCityCount(cities.length);
      setTotalElectricConsumption(electricityRecords.reduce((sum, record) => sum + record.consumptionKwh, 0).toFixed(2));
      setTotalWaterSupplyConsumption(waterSupplyRecords.reduce((sum, record) => sum + record.consumptionLiters, 0).toFixed(2));

      //Electric
      setTotalElectricConsumptionData(prepareChartData(aggregateElectricData(electricityRecords), 'Total Consumption', 'bar'));
      setAverageElectricConsumptionData(prepareChartData(averageElectricConsumption(electricityRecords), 'Average Consumption', 'bar'));
      setOutageReasonDataState(prepareChartData(outageReasonData(electricityRecords), 'Outage Reasons', 'pie'));
      setMonthlyTrendElectricData(prepareChartData(monthlyTrend(electricityRecords), 'Monthly Consumption', 'line'));
      setOutageImpactData(prepareOutageDurationScatterData(electricityRecords, 'Outage Impact'));

      //Water Supply
      setTotalWaterSupplyConsumptionData(prepareChartData(aggregateWaterSupplyData(waterSupplyRecords, 'consumptionLiters'), 'Total Consumption', 'bar'));
      setAverageWaterSupplyConsumptionData(prepareChartData(averageWaterSupplyData(waterSupplyRecords, 'consumptionLiters'), 'Average Consumption', 'bar'));
      setCompareWaterSupplyData(prepareWaterSupplyComparisonChartData(waterSupplyRecords));
      setReservoirLevelsData(prepareReservoirLevelsChartData(waterSupplyRecords));
      setMonthlyTrendWaterSupplyData(prepareMonthlyTrendChartData(monthlyConsumptionTrend(waterSupplyRecords)));
      setMonthlyTrendRainfallData(prepareMonthlyTrendChartData(monthlyRainfallTrend(waterSupplyRecords)));
      setLoading(false); // Set loading to false when data is fetched
    };
    fetchData();
  }, []);

  const animationStyle = {
    animation: 'dropDown 0.8s ease forwards',
    opacity: 0,
    '@keyframes dropDown': {
      '0%': { transform: 'translateY(-20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
  };


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

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Typography variant='h4' component='h1' sx={{ marginBottom: '1rem', textAlign: 'center', fontWeight: 600 }}>
        Overview Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Metric Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' textAlign='center'>
                Total Cities
              </Typography>
              <Typography variant='h4' textAlign='center'>
                {cityCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' textAlign='center'>
                Electric Consumption (KWh)
              </Typography>
              <Typography variant='h4' textAlign='center'>
                {totalElectricConsumption}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' textAlign='center'>
                Water Consumption (L)
              </Typography>
              <Typography variant='h4' textAlign='center'>
                {totalWaterSupplyConsumption}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      {/* Electricity Chart Cards */}
      <Typography variant='h4' component='h1'
                  sx={{ marginTop: '1rem', marginBottom: '1rem', textAlign: 'center', fontWeight: 600 }}>
        Electricity Data Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' align='center'>Total Consumption per City </Typography>
              <Bar data={totalElectricConsumptionData}
                   options={{ scales: { y: { beginAtZero: true, suggestedMax: 30 } } }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' align='center'>Average Consumption per City</Typography>
              <Bar data={averageElectricConsumptionData}
                   options={{ scales: { y: { beginAtZero: true, suggestedMax: 30 } } }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' align='center'>Monthly Consumption Trend</Typography>
              <Line data={monthlyTrendElectricData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <TrendsAnalysis />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' align='center'>Outage Duration</Typography>
              <div style={{ height: '300px' }}>
                <Pie data={outageReasonDataState} />
              </div>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' align='center'>Outage Impact</Typography>
              <Scatter data={outageImpactData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      {/* Water Supply Chart Cards */}
      <Typography variant='h4' component='h1'
                  sx={{ marginTop: '1rem', marginBottom: '1rem', textAlign: 'center', fontWeight: 600 }}>
        Water Supply Data Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' align='center'>Total Consumption per City </Typography>
              <Bar data={totalWaterSupplyConsumptionData}
                   options={{ scales: { y: { beginAtZero: true, suggestedMax: 30 } } }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' align='center'>Average Consumption per City</Typography>
              <Bar data={averageWaterSupplyConsumptionData}
                   options={{ scales: { y: { beginAtZero: true, suggestedMax: 30 } } }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' align='center'>Water Supply Comparison</Typography>
              <Bar data={compareWaterSupplyData}
                   options={{ scales: { y: { beginAtZero: true, suggestedMax: 30 } } }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' align='center'>Reservoir Levels per City</Typography>
              <Bar data={reservoirLevelsData}
                   options={{ scales: { y: { beginAtZero: true, suggestedMax: 30 } } }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' align='center'>Monthly Consumption Trend</Typography>
              <Line data={monthlyTrendWaterSupplyData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ ...animationStyle, boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant='h6' align='center'>Monthly Rainfall Trend</Typography>
              <Line data={monthlyTrendRainfallData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
