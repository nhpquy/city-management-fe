const { groupBy } = require('./BaseDataService');

export function compareProductionConsumption(data, groupByKey) {
  const grouped = groupBy(data, groupByKey);
  return Object.entries(grouped).map(([group, records]) => ({
    [groupByKey]: group,
    production: records.reduce((acc, curr) => acc + curr.productionLiters, 0),
    consumption: records.reduce((acc, curr) => acc + curr.consumptionLiters, 0),
  }));
}
export const aggregateWaterSupplyData = (data, key) => {
  let totalConsumption = {};
  data.forEach(record => {
    if (!totalConsumption[record.city.name]) {
      totalConsumption[record.city.name] = 0;
    }
    totalConsumption[record.city.name] += record[key];
  });
  return totalConsumption;
};

export const averageWaterSupplyData = (data, key) => {
  let sum = {}, count = {};
  data.forEach(record => {
    if (!sum[record.city.name]) {
      sum[record.city.name] = 0;
      count[record.city.name] = 0;
    }
    sum[record.city.name] += record[key];
    count[record.city.name] += 1;
  });
  let averages = {};
  for (let area in sum) {
    averages[area] = sum[area] / count[area];
  }
  return averages;
};

export function aggregateReservoirLevels(data, groupByKey) {
  const grouped = groupBy(data, groupByKey);
  return Object.entries(grouped).map(([group, records]) => ({
    [groupByKey]: group,
    reservoirLevel: records.reduce((acc, curr) => acc + curr.reservoirLevelPercentage, 0) / records.length,
  }));
}

export function monthlyTrend(data, key) {
  const trends = {};

  data.forEach((record) => {
    const cityName = record.city.name;
    const month = new Date(record.date).toISOString().slice(0, 7); // Extract YYYY-MM

    // Initialize city trends if not present
    if (!trends[cityName]) {
      trends[cityName] = {};
    }

    // Initialize month consumption if not present
    if (!trends[cityName][month]) {
      trends[cityName][month] = 0;
    }

    // Add consumption liters for the city and month
    trends[cityName][month] += record[key];
  });

  // Convert trends object into the desired array format
  return Object.entries(trends).map(([cityName, monthlyData]) => ({
    cityName,
    trends: Object.entries(monthlyData).map(([month, total]) => ({
      month,
      total,
    })),
  }));
}


export function monthlyConsumptionTrend(data) {
  const result = monthlyTrend(data, 'consumptionLiters');
  console.log(result);
  return result
}

export function monthlyRainfallTrend(data) {
  return monthlyTrend(data, 'rainfallMm');
}

