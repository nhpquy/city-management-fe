import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAreaTrends } from '../../services/ElectricityService';
import { CardContent, Typography } from '@mui/material';

const TrendsAnalysis = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAreaTrends();
        setTrends(response);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: trends.map((trend) => trend.area),
    datasets: [
      {
        label: 'Total Consumption',
        data: trends.map((trend) => trend.consumptionKwh),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <CardContent>
      <Typography variant='h6' align='center'>Area Consumption Trend</Typography>
      {chartData ? <Bar data={chartData} /> : <Typography>No data available</Typography>}
    </CardContent>
  );
};

export default TrendsAnalysis;
