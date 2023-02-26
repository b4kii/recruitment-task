import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";

import Routing from "../components/Routing";
import ErrorMessage from "../components/ErrorMessage";

export default function MapResult() {
  const data = useLoaderData();
  const [fromData, toData, errorData] = data;
  const navigate = useNavigate();

  const [costPerKm, setCostPerKm] = useState(0);
  const [distance, setDistance] = useState(0);
  const [days, setDays] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (errorData || fromData === undefined || toData === undefined) {
      setError(true);
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const totalDays = 2000 / 800;
    setDays(Math.round(totalDays));
  }, [distance]);

  useEffect(() => {
    const cost = distance * costPerKm * 1.1 * days;
    setTotalCost(cost.toFixed(2));
  }, [distance, costPerKm, days]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const coordiantesFrom = [fromData?.position.lat, fromData?.position.lng];
  const coordiantesTo = [toData?.position.lat, toData?.position.lng];

  return (
    <>
      <MapContainer
        center={[50.064651, 19.944981]}
        zoom={12}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Routing
          from={coordiantesFrom}
          to={coordiantesTo}
          setDistance={setDistance}
        />
      </MapContainer>
      <div className="mt-4 flex flex-col gap-4">
        <label htmlFor="rate">
          <span className="mr-4 font-bold">Cost per km</span>
          <input
            type="text"
            id="rate"
            className="w-10 outline-none text-center"
            value={costPerKm}
            onChange={(event) => {
              setCostPerKm(event.target.value);
            }}
          />
        </label>
        <p>
          <span className="font-bold">Total distance </span>
          {distance} km
        </p>
        <p>
          <span className="font-bold">Days </span>
          {days}
        </p>
        <p>
          <span className="font-bold">Total cost </span>
          {totalCost}
        </p>
      </div>
      {error && <ErrorMessage error={error} message="No data found! Redirecting..." />}
    </>
  );
}

export const mapResultLoaderData = async ({ request }) => {
  const from = new URL(request.url).searchParams.get("from");
  const to = new URL(request.url).searchParams.get("to");

  try {
    const request1 = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${from}&apiKey=xubEW4OMIUsraTtYqak5OoFXNL-dqPNgnk6mUf_1YEU`
    );
    const request2 = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${to}&apiKey=xubEW4OMIUsraTtYqak5OoFXNL-dqPNgnk6mUf_1YEU`
    );

    return [request1.data.items[0], request2.data.items[0], null];
  } catch (error) {
    console.log("error", error);
    return [null, null, error];
  }
};
