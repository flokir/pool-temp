import { getEndpointUrl } from "@/utils/api-utils";
import { useEffect, useState } from "react";

async function fetchSensors() {
  const res = await fetch(getEndpointUrl("/api/v1/sensors"));
  if (res.ok) {
    const jsonBody = await res.json();
    return jsonBody.items.map((item: { id: string; name: string }) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
  }
  return [];
}

async function createSensor(name?: string) {
  if (name) {
    const res = await fetch(getEndpointUrl("/api/v1/sensors"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    if (res.ok) {
      return true;
    }
  }
  return false;
}

export default function Sensors() {
  const [createdCount, setCreatedCount] = useState(0);
  const [displayAdd, setDisplayAdd] = useState(false);
  const [sensorName, setSensorName] = useState<string | undefined>(undefined);
  const [sensors, setSensors] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  useEffect(() => {
    fetchSensors().then((sensors) => {
      setSensors(sensors);
    });
  }, [createdCount]);
  return (
    <>
      <div className="mx-4 text-white mb-8">
        <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto mt-8">
          {sensors.map((sensor) => (
            <div className="bg-emerald-600 rounded-lg p-4" key={sensor.id}>
              <h1 className="text-2xl">{sensor.name}</h1>
              <p>{sensor.id}</p>
            </div>
          ))}
          {displayAdd && (
            <div className="bg-emerald-600 rounded-lg px-4 py-2 flex items-center">
              <input
                type="text"
                className="bg-black text-white px-2 py-1 text-2xl w-full"
                minLength={3}
                onChange={(e) => setSensorName(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 ml-4 align-middle"
                onClick={async () => {
                  const created = await createSensor(sensorName);
                  if (created) {
                    setCreatedCount(createdCount + 1);
                    setDisplayAdd(false);
                    setSensorName(undefined);
                  }
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 ml-4 align-middle"
                onClick={() => setDisplayAdd(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
          {!displayAdd && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
              className="w-10 h-10 mx-auto"
              onClick={() => setDisplayAdd(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}
