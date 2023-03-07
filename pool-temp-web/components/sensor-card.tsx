import { getEndpointUrl } from "@/utils/api-utils";
import { useEffect, useState } from "react";
import TemperatureChart from "@/components/temperature-chart";
import {
  ApiState,
  DataState,
  ErrorState,
  LoadingState,
} from "@/common/api-state";

interface HistoryItem {
  value: number;
  timestamp: Date;
}
async function fetchCurrentTemperature(sensorId: string) {
  const res = await fetch(
    getEndpointUrl(`/api/v1/sensors/${sensorId}/measurements/current`)
  );
  if (res.ok) {
    const measurement = await res.json();
    return {
      temperature: measurement.value,
      timestamp: new Date(Date.parse(measurement.timestamp)),
    };
  }
  return undefined;
}

async function fetchTemperatureHistory(
  sensorId: string
): Promise<HistoryItem[]> {
  const res = await fetch(
    getEndpointUrl(`/api/v1/sensors/${sensorId}/measurements`)
  );
  if (res.ok) {
    const json = await res.json();
    return json.items.map((item: { value: number; timestamp: string }) => {
      return {
        value: item.value,
        timestamp: new Date(Date.parse(item.timestamp)),
      };
    });
  } else {
    return [];
  }
}

function calculateMinutesAgo(otherDate: Date): number {
  const currentDate: Date = new Date();
  const difference = currentDate.getTime() - otherDate.getTime();
  return Math.floor(difference / 1000 / 60);
}

export default function SensorCard({
  sensorId,
  name,
}: {
  sensorId: string;
  name: string;
}) {
  const [collapse, setCollapse] = useState(true);
  const [apiState, setApiState] = useState<ApiState>(LoadingState);

  const [temperature, setTemperature] = useState<{
    temperature?: number;
    timestamp?: Date;
    minutesAgo: number;
  }>({
    minutesAgo: 0,
  });

  const [historyApiState, setHistoryApiState] =
    useState<ApiState>(LoadingState);
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [labels, setLabels] = useState<Date[]>([]);

  useEffect(() => {
    if (collapse) {
      fetchCurrentTemperature(sensorId).then((currentTemperature) => {
        if (currentTemperature) {
          setTemperature({
            ...currentTemperature,
            minutesAgo: calculateMinutesAgo(currentTemperature.timestamp),
          });
          setApiState(DataState);
          return;
        }
        setApiState(ErrorState);
      });
    }
    if (!collapse) {
      fetchTemperatureHistory(sensorId).then((history) => {
        setLabels(history.map((item) => item.timestamp));
        setDataPoints(history.map((item) => item.value));
        setHistoryApiState(DataState);
      });
    }
  }, [collapse, sensorId]);

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
            <h1 className="float-left text-2xl">{name}</h1>
            <p className="float-right">
              {temperature.minutesAgo === 0
                ? "Just now"
                : temperature.minutesAgo < 60
                ? temperature.minutesAgo + " minutes ago"
                : ""}
            </p>
          </div>
          {apiState.error && <p>No data</p>}
          {apiState.loading && <p>Loading...</p>}
          {apiState.data && (
            <div>
              <p className="text-xl">
                Current temperature: {temperature.temperature}°C
              </p>
              <p>{temperature.timestamp?.toLocaleString()}</p>
              <div hidden={collapse} className="mt-4">
                {historyApiState.loading && <p>Loading...</p>}
                {historyApiState.data && (
                  <TemperatureChart
                    dataPoints={dataPoints}
                    labels={labels}
                  ></TemperatureChart>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
