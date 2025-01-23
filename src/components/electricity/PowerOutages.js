import React, { useEffect, useState } from 'react';
import { getOutageData } from '../../services/ElectricityService';

const PowerOutages = () => {
  const [outages, setOutages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOutageData();
        setOutages(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Monitor Power Outages</h2>
      <table>
        <thead>
        <tr>
          <th>Area</th>
          <th>Outage Duration (minutes)</th>
          <th>Reason</th>
        </tr>
        </thead>
        <tbody>
        {outages.map((outage) => (
          <tr key={outage.id}>
            <td>{outage.area}</td>
            <td>{outage.outageDurationMinutes}</td>
            <td>{outage.outageReason}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default PowerOutages;
