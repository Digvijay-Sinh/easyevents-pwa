import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
interface MapsProps {
  selectPosition?: LatLngExpression;
}

const icon = L.icon({
  iconUrl: "http://localhost:5173/placeholder.png",
  iconSize: [38, 38],
});

const position: LatLngExpression = [23.03282845, 72.54671281964617];

function ResetCenterView({
  selectPosition,
}: {
  selectPosition: LatLngExpression;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      console.log("====================================");
      console.log("selectPosition", selectPosition);
      console.log("====================================");
      map.setView(selectPosition, map.getZoom(), {
        animate: true,
      });
    }
  }, [selectPosition, map]);

  return null;
}

export default function Maps({ selectPosition }: MapsProps) {
  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectPosition && (
        <Marker position={selectPosition} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      {selectPosition && <ResetCenterView selectPosition={selectPosition} />}
    </MapContainer>
  );
}
