export const COLORS = [
  'rgba(75,192,192,0.4)',
  'rgba(54,162,235,0.4)',
  'rgba(255,206,86,0.4)',
  'rgba(231,233,237,0.4)',
  'rgba(153,102,255,0.4)',
  'rgba(255,159,64,0.4)',
  'rgba(255,99,132,0.4)',
  'rgba(201,203,207,0.4)',
];

export const BORDER_COLORS = [
  'rgba(75,192,192,1)',
  'rgba(54,162,235,1)',
  'rgba(255,206,86,1)',
  'rgba(231,233,237,1)',
  'rgba(153,102,255,1)',
  'rgba(255,159,64,1)',
  'rgba(255,99,132,1)',
  'rgba(201,203,207,1)',
];

export const prepareChartData = (data, label, setType) => {
  return {
    labels: Object.keys(data),
    datasets: [
      {
        label,
        data: Object.values(data),
        backgroundColor: COLORS.slice(0, Object.keys(data).length),
        borderColor: BORDER_COLORS.slice(0, Object.keys(data).length),
        borderWidth: 1,
      },
    ],
    type: setType,
  };
};

export const prepareOutageDurationScatterData = (data, label) => {
  return {
    datasets: [
      {
        label,
        data: data.map(record => ({
          x: record.consumptionKwh,
          y: record.outageDurationMinutes,
        })),
        backgroundColor: data.map((_, index) => COLORS[index % COLORS.length]),
        borderColor: data.map((_, index) => BORDER_COLORS[index % BORDER_COLORS.length]),
        pointRadius: 5,
      },
    ],
  };
};

export function prepareWaterSupplyComparisonChartData(data) {
  const comparisonData = {};

  data.forEach((item) => {
    const key = item.city?.name; // Explicitly accessing item.city.name
    if (!key) return;

    if (!comparisonData[key]) {
      comparisonData[key] = { consumption: 0, production: 0 };
    }

    comparisonData[key].consumption += item.consumptionLiters || 0;
    comparisonData[key].production += item.productionLiters || 0;
  });

  const labels = Object.keys(comparisonData);
  const consumptionData = labels.map((label) => comparisonData[label].consumption);
  const productionData = labels.map((label) => comparisonData[label].production);

  return {
    labels,
    datasets: [
      {
        label: 'Consumption (Liters)',
        data: consumptionData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Production (Liters)',
        data: productionData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
}


export function prepareMonthlyTrendChartData(trends) {
  const labels = Array.from(
    new Set(trends.flatMap((cityTrend) => cityTrend.trends.map((t) => t.month)))
  ).sort(); // Unique months sorted

  const datasets = trends.map((cityTrend) => ({
    label: cityTrend.cityName,
    data: labels.map((month) => {
      const trend = cityTrend.trends.find((t) => t.month === month);
      return trend ? trend.total : 0;
    }),
    fill: false,
    borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
    tension: 0.1,
  }));

  return { labels, datasets };
}

export function prepareReservoirLevelsChartData(data) {
  const reservoirLevels = {};

  data.forEach((item) => {
    const key = item.city?.name;
    if (!key) return;

    if (!reservoirLevels[key]) {
      reservoirLevels[key] = [];
    }

    // Store reservoir level percentages
    reservoirLevels[key].push(item.reservoirLevelPercentage || 0);
  });

  const labels = Object.keys(reservoirLevels);
  const averageReservoirLevels = labels.map(
    (label) =>
      reservoirLevels[label].reduce((sum, level) => sum + level, 0) /
      reservoirLevels[label].length
  );

  return {
    labels,
    datasets: [
      {
        label: 'Reservoir Levels (%)',
        data: averageReservoirLevels,
        backgroundColor: labels.map(
          (_, index) => COLORS[index % COLORS.length]
        ),
        borderColor: labels.map(
          (_, index) => BORDER_COLORS[index % BORDER_COLORS.length]
        ),
        borderWidth: 1,
      },
    ],
  };
}

