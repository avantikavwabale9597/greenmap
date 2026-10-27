import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Send, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";
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

function LocationSelector({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

export default function ReportIssue() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState([18.5204, 73.8567]);

  const [formData, setFormData] = useState({
    title: "",
    category: "Waste Management",
    description: "",
    image: "",
    userEmail: "",
  });

  const handleGetGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          alert("GPS location acquired successfully!");
        },
        () => {
          alert("Unable to retrieve GPS. Please click directly on the map.");
        },
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...formData,
      lat: position[0],
      lng: position[1],
    };

    try {
      const response = await fetch(
        "https://greenmap-backend-jwnf.onrender.com/api/issues",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("Server connection failed.");
      }

      setSuccess(true);
      setTimeout(() => navigate("/map"), 1500);
    } catch (err) {
      setError(err.message || "Failed to connect to the database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "90vh",
        backgroundColor: "#FAF9F6",
        padding: "4rem 5%",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: "950px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              color: "#31572C",
              marginBottom: "1rem",
            }}
          >
            Report an Issue
          </h1>
          <p
            style={{ fontSize: "1.125rem", color: "#40916C", fontWeight: 600 }}
          >
            Help keep Pune clean by reporting issues.
          </p>
        </div>

        {success && (
          <div
            style={{
              backgroundColor: "#d1e7dd",
              color: "#0f5132",
              padding: "1.5rem",
              borderRadius: "1rem",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontSize: "1.125rem",
              fontWeight: "bold",
            }}
          >
            <CheckCircle2 size={28} /> Issue successfully saved! Redirecting to
            map...
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#842029",
              padding: "1.5rem",
              borderRadius: "1rem",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontSize: "1.125rem",
              fontWeight: "bold",
            }}
          >
            <AlertCircle size={28} /> {error}
          </div>
        )}

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "3.5rem",
            borderRadius: "2.5rem",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            border: "4px solid #ECF39E",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#31572C",
                  marginBottom: "0.75rem",
                }}
              >
                Issue Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "1.25rem 1.5rem",
                  backgroundColor: "#FAF9F6",
                  border: "2px solid #90A955",
                  borderRadius: "1rem",
                  fontSize: "1.125rem",
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#31572C",
                    marginBottom: "0.75rem",
                  }}
                >
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "1.25rem 1.5rem",
                    backgroundColor: "#FAF9F6",
                    border: "2px solid #90A955",
                    borderRadius: "1rem",
                    fontSize: "1.125rem",
                    outline: "none",
                  }}
                >
                  <option value="Waste Management">Waste Management</option>
                  <option value="Water Pollution">Water Pollution</option>
                  <option value="Air Quality">Air Quality</option>
                  <option value="Deforestation">Deforestation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#31572C",
                    marginBottom: "0.75rem",
                  }}
                >
                  Email Address (For Updates)
                </label>
                <input
                  type="tel"
                  placeholder="abc@gmail.com"
                  value={formData.userEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, userEmail: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "1.25rem 1.5rem",
                    backgroundColor: "#FAF9F6",
                    border: "2px solid #90A955",
                    borderRadius: "1rem",
                    fontSize: "1.125rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#31572C",
                  marginBottom: "0.75rem",
                }}
              >
                Location Pin-point
              </label>
              <button
                type="button"
                onClick={handleGetGPS}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  padding: "1.25rem 1.5rem",
                  backgroundColor: "#ECF39E",
                  color: "#31572C",
                  fontWeight: "bold",
                  borderRadius: "1rem",
                  fontSize: "1.125rem",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: "1rem",
                }}
              >
                <MapPin size={24} /> Use Device GPS
              </button>
              <div
                style={{
                  height: "350px",
                  width: "100%",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  border: "3px solid #90A955",
                }}
              >
                <MapContainer
                  center={position}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationSelector
                    position={position}
                    setPosition={setPosition}
                  />
                </MapContainer>
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#31572C",
                  marginBottom: "0.75rem",
                }}
              >
                Description
              </label>
              <textarea
                rows="3"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "1.25rem 1.5rem",
                  backgroundColor: "#FAF9F6",
                  border: "2px solid #90A955",
                  borderRadius: "1rem",
                  fontSize: "1.125rem",
                  outline: "none",
                  resize: "none",
                }}
              ></textarea>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#31572C",
                  marginBottom: "0.75rem",
                }}
              >
                Upload Image / Evidence
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .svg"
                onChange={handleImageUpload}
                style={{
                  width: "100%",
                  padding: "1rem 1.5rem",
                  backgroundColor: "#FAF9F6",
                  border: "2px dashed #90A955",
                  borderRadius: "1rem",
                  fontSize: "1.125rem",
                  outline: "none",
                  cursor: "pointer",
                }}
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{
                    marginTop: "1.5rem",
                    width: "100%",
                    maxWidth: "300px",
                    borderRadius: "1rem",
                    border: "3px solid #ECF39E",
                  }}
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                backgroundColor: "#31572C",
                color: "#FAF9F6",
                padding: "1.25rem",
                borderRadius: "1rem",
                fontSize: "1.25rem",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Send size={26} /> {loading ? "Saving..." : "Submit Report"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
