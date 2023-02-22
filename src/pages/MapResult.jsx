import React from 'react'
import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function MapResult() {
  return (
    <>
      <MapContainer center={[50.064651, 19.944981]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </>
  )
}
