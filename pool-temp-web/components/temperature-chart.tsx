import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

export default function TemperatureChart({
  dataPoints,
  labels,
}: {
  dataPoints: number[];
  labels: Date[];
}) {
  Chart.register([
    CategoryScale,
    LineController,
    TimeScale,
    TimeSeriesScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  ]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: dataPoints,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  Chart.defaults.color = "#FFF";
  return (
    <>
      <Line
        data={data}
        options={{
          scales: {
            x: {
              ticks: {
                stepSize: 1,
              },
              min: Date.now() - 86400000,
              max: Date.now(),
              type: "time",
            },
            y: {
              min: 0,
              max: 40,
            },
          },
        }}
      ></Line>
    </>
  );
}
