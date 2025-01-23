import axios from 'axios';

const API_URL = 'http://localhost:8080/api/electricity';

export const getOutageData = async () => {
  const response = await axios.get(`${API_URL}/outages`);
  return response.data;
};

export const getAreaTrends = async () => {
  const response = await axios.get(`${API_URL}/area-trends`);
  return response.data;
};

export const aggregateElectricData = (data) => {
  let totalConsumption = {};
  data.forEach(record => {
    if (!totalConsumption[record.city.name]) {
      totalConsumption[record.city.name] = 0;
    }
    totalConsumption[record.city.name] += record.consumptionKwh;
  });
  return totalConsumption;
};

export const averageElectricConsumption = (data) => {
  let sum = {}, count = {};
  data.forEach(record => {
    if (!sum[record.city.name]) {
      sum[record.city.name] = 0;
      count[record.city.name] = 0;
    }
    sum[record.city.name] += record.consumptionKwh;
    count[record.city.name] += 1;
  });
  let averages = {};
  for (let area in sum) {
    averages[area] = sum[area] / count[area];
  }
  return averages;
};

export const outageReasonData = (data) => {
  let reasons = {};
  data.forEach(record => {
    if (!reasons[record.outageReason]) {
      reasons[record.outageReason] = 0;
    }
    reasons[record.outageReason] += 1;
  });
  return reasons;
};

export const monthlyTrend = (data) => {
  let monthlyConsumption = {};
  data.forEach(record => {
    const month = record.date.substring(0, 7); // Extract YYYY-MM
    if (!monthlyConsumption[month]) {
      monthlyConsumption[month] = 0;
    }
    monthlyConsumption[month] += record.consumptionKwh;
  });
  return monthlyConsumption;
};
