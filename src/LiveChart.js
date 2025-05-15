import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from "chart.js";
import { io } from "socket.io-client";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

function LiveChart() {
  const [dataPoints, setDataPoints] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);

  useEffect(() => {
    // This simulates receiving live data
    const socket = io("http://localhost:4000");

    socket.on("data", (data) => {
      const newDataPoint = {
        time: new Date(data.time).toLocaleTimeString(),
        value: data.value,
      };

      setDataPoints((prevData) => [...prevData, newDataPoint.value].slice(-10)); // Keep last 10 values
      setTimeLabels((prevLabels) => [...prevLabels, newDataPoint.time].slice(-10)); // Keep last 10 times
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Chart.js data format
  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Live Data",
        data: dataPoints,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2>Live Data Chart</h2>
      <Line data={chartData} />
    </div>
  );
}

export default LiveChart;
