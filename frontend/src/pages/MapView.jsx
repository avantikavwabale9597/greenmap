import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView() {
  const punePosition = [18.5204, 73.8567];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[90%] mx-auto mt-12 pb-12"
    >
      <div className="mb-10 text-center">
        <h1 className="text-6xl font-black text-[#31572C] mb-4 tracking-tight drop-shadow-sm">
          Live Environmental Map
        </h1>
        <p className="text-2xl text-[#40916C] font-semibold">
          Tracking real-time civic issues across Pune, Maharashtra
        </p>
      </div>

      <div className="h-[70vh] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-[4px] border-[#90A955]">
        <MapContainer
          center={punePosition}
          zoom={12}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={punePosition}>
            <Popup>
              <div className="text-lg font-bold text-[#31572C]">
                Garbage Dump near College
              </div>
              <div className="text-sm font-medium text-gray-600 mt-1">
                Huge pile of uncollected trash.
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </motion.div>
  );
}
