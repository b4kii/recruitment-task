import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine"
import { useMap } from "react-leaflet";

export default function Routing({from, to}) {
  const map = useMap();

  const [lat1, lng1] = from;
  const [lat2, lng2] = to;

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      // waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
      waypoints: [L.latLng(lat1, lng1), L.latLng(lat2, lng2)],
      routeWhileDragging: true
    })
    .on("routesfound", (e) => {
      // console.log(e.routes[0].summary.totalDistance)
      // console.log(e.routes);
    })
    .addTo(map);


    return () => map.removeControl(routingControl);

  }, [map]);

  return null;
}
