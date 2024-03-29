import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import SensorCard from "@/components/sensor-card";
import { getEndpointUrl } from "@/utils/api-utils";

const inter = Inter({ subsets: ["latin"] });

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
export default function Home() {
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
  }, []);
  // <Line data={data}></Line>
  // SensorCard -> Displays the current temperature of a sensor + chart of the last 24h // use getStaticProps to load list of sensors, revalidate every 15s
  return (
    <>
      <Head>
        <title>PoolTemp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-8 text-white">
        <div className="mx-4 grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {sensors.map((sensor) => (
            <SensorCard
              sensorId={sensor.id}
              key={sensor.id}
              name={sensor.name}
            ></SensorCard>
          ))}
        </div>
      </div>
    </>
  );
}
