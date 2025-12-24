import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

const NEXT_PUBLIC_MAPS = "http://192.168.204.100:8533";

// Initialize icon
const cctvIcon = L.icon({
  iconUrl: "/images/map/map_cctv_v3.png",
  iconSize: [40, 40],
});

// Component to set view based on marker
function MapController({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);

  return null;
}

type MapProps = {
  latitude: number;
  longitude: number;
  cctvName: string;
};

export default function MapComponent({ latitude, longitude, cctvName }: Readonly<MapProps>) {
  const [position, setPosition] = useState<LatLngTuple>([latitude, longitude]);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'terrain'>('satellite');

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  // Map tile URLs
  const MAP_TILE_URLS = {
    standard: `${NEXT_PUBLIC_MAPS}/tiles/standard/{z}/{x}/{y}.png`,
    satellite: `${NEXT_PUBLIC_MAPS}/tiles/satellite/{z}/{x}/{y}.jpg`,
    terrain: `${NEXT_PUBLIC_MAPS}/tiles/terrain/{z}/{x}/{y}.jpg`,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      {/* Dropdown for map type selection - BOTTOM LEFT like web */}
      <div style={{ 
        position: "absolute", 
        zIndex: 1000, 
        left: 16, 
        bottom: 16,  // Changed from top to bottom
        background: "white", 
        padding: "8px 12px", 
        borderRadius: 8, 
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)" 
      }}>
        <label htmlFor="mapType" style={{ marginRight: 8 }}>Tipe Peta:</label>
        <select
          id="mapType"
          value={mapType}
          onChange={e => setMapType(e.target.value as 'standard' | 'satellite' | 'terrain')}
          style={{ padding: "4px 8px", borderRadius: 4 }}
        >
          <option value="standard">Standard</option>
          <option value="satellite">Satellite</option>
          <option value="terrain">Terrain</option>
        </select>
      </div>

      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer url={MAP_TILE_URLS[mapType]} />

        {/* Display marker */}
        <Marker
          position={position}
          icon={cctvIcon}
          title={cctvName}
        />

        {/* Controller for auto zoom & center */}
        <MapController position={position} />
      </MapContainer>

      {/* Removed duplicate Leaflet watermark - Leaflet already shows its own */}
    </div>
  );
}
