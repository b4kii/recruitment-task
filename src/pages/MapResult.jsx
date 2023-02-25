import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";

import Routing from "../components/Routing";

export default function MapResult() {
  const data = useLoaderData();
  const [fromData, toData, error] = data;
  const navigate = useNavigate();
  console.log(fromData, toData);

  useEffect(() => {
    if (error || fromData === undefined || toData === undefined) {
      navigate("/");
    }
  }, []);

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
        <Routing from={coordiantesFrom} to={coordiantesTo} />
      </MapContainer>
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
