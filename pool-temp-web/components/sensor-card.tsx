import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getEndpointUrl } from "@/utils/api-utils";
import { useEffect, useState } from "react";

async function fetchCurrentTemperature() {
  const res = await fetch(getEndpointUrl("/api/v1/measurements/current"));
  if (res.ok) {
    const measurement = await res.json();
    return {
      temperature: measurement.value,
      timestamp: new Date(Date.parse(measurement.timestamp)),
    };
  }
  return undefined;
}

function calculateMinutesAgo(otherDate: Date): number {
  const currentDate: Date = new Date();
  const difference = currentDate.getTime() - otherDate.getTime();
  return Math.floor(difference / 1000 / 60);
}

export default function SensorCard() {
  const [collapse, setCollapse] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [temperature, setTemperature] = useState<{
    temperature?: number;
    timestamp?: Date;
    minutesAgo: number;
  }>({
    minutesAgo: 0,
  });
  const labels = ["1", "2", "3", "4", "5", "6", "7"];
  useEffect(() => {
    fetchCurrentTemperature().then((currentTemperature) => {
      if (currentTemperature) {
        setTemperature({
          ...currentTemperature,
          minutesAgo: calculateMinutesAgo(currentTemperature.timestamp),
        });
        setIsLoading(false);
      }
    });
  }, []);

  Chart.register([
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  ]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <div
        className="pb-8"
        onClick={() => {
          setCollapse(!collapse);
        }}
      >
        <div className="bg-emerald-600 text-white px-4 py-4 rounded-lg min-h-32">
          <div className="flow-root">
            <h1 className="float-left text-2xl">Sensor 1</h1>
            <p className="float-right">
              {temperature.minutesAgo === 0
                ? "Just now"
                : temperature.minutesAgo < 60
                ? temperature.minutesAgo + " minutes ago"
                : ""}
            </p>
          </div>
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <div>
              <p className="text-xl">
                Current temperature: {temperature.temperature}°C
              </p>
              <p>{temperature.timestamp?.toLocaleString()}</p>
              <div hidden={collapse} className="mt-4">
                <Line data={data}></Line>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
