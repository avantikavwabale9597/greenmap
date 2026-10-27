import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { motion } from "framer-motion";
import { Edit2, X, Save, PhoneCall, ExternalLink } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView() {
  const punePosition = [18.5204, 73.8567];
  const [issues, setIssues] = useState([]);
  const [editingIssue, setEditingIssue] = useState(null);
  const fallbackImage =
    "https://placehold.co/400x300/e2e8f0/31572C?text=No+Image+Provided";

  const fetchIssues = async () => {
    try {
      const response = await fetch(
        "https://greenmap-backend-jwnf.onrender.com",
      );
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingIssue({ ...editingIssue, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/issues/${editingIssue._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingIssue),
      });
      setEditingIssue(null);
      fetchIssues();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        width: "100%",
        maxWidth: "90%",
        margin: "3rem auto",
        paddingBottom: "3rem",
        position: "relative",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "3.75rem",
            fontWeight: 900,
            color: "#31572C",
            marginBottom: "1rem",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Live Environmental Map
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            color: "#40916C",
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Hover over a pin for a quick preview, or click to edit.
        </p>
      </div>

      <div
        style={{
          height: "70vh",
          width: "100%",
          borderRadius: "2.5rem",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "4px solid #90A955",
        }}
      >
        <MapContainer
          center={punePosition}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {issues
            .filter(
              (issue) =>
                (issue.lat && issue.lng) ||
                (issue.location && issue.location.lat && issue.location.lng),
            )
            .map((issue) => {
              const markerLat = issue.lat || issue.location.lat;
              const markerLng = issue.lng || issue.location.lng;
              const currentStatus = issue.status || "Pending";
              const displayImage = issue.image || fallbackImage;

              return (
                <Marker key={issue._id} position={[markerLat, markerLng]}>
                  <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                    <div
                      style={{
                        width: "200px",
                        fontFamily: "'Poppins', sans-serif",
                        textAlign: "center",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      <img
                        src={displayImage}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "110px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          marginBottom: "8px",
                        }}
                      />
                      <h3
                        style={{
                          margin: "0 0 4px 0",
                          color: "#31572C",
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        {issue.title}
                      </h3>
                      <span
                        style={{
                          backgroundColor: "#ECF39E",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "10px",
                          fontWeight: "bold",
                          color: "#31572C",
                          display: "inline-block",
                          marginBottom: "6px",
                        }}
                      >
                        {issue.category}
                      </span>
                      <p
                        style={{ margin: "0", fontSize: "10px", color: "#666" }}
                      >
                        (Click to view & edit)
                      </p>
                    </div>
                  </Tooltip>

                  <Popup>
                    <div
                      style={{
                        width: "240px",
                        fontFamily: "'Poppins', sans-serif",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      <img
                        src={displayImage}
                        alt="Evidence"
                        style={{
                          width: "100%",
                          height: "140px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "12px",
                        }}
                      />

                      <h3
                        style={{
                          margin: "0 0 8px 0",
                          color: "#31572C",
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                        }}
                      >
                        {issue.title}
                      </h3>

                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          marginBottom: "10px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "#ECF39E",
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: "bold",
                            color: "#31572C",
                          }}
                        >
                          {issue.category}
                        </span>
                        <span
                          style={{
                            backgroundColor:
                              currentStatus === "Resolved"
                                ? "#d1e7dd"
                                : currentStatus === "In Progress"
                                  ? "#fff3cd"
                                  : "#f8d7da",
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: "bold",
                            color:
                              currentStatus === "Resolved"
                                ? "#0f5132"
                                : currentStatus === "In Progress"
                                  ? "#856404"
                                  : "#842029",
                          }}
                        >
                          {currentStatus}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: "13px",
                          color: "#4b5563",
                          margin: "0 0 15px 0",
                          lineHeight: 1.4,
                        }}
                      >
                        {issue.description}
                      </p>

                      {/* ADMIN PROVIDED RESOURCES SECTION */}
                      {(issue.helpline || issue.website) && (
                        <div
                          style={{
                            backgroundColor: "#f0fdf4",
                            border: "2px solid #bbf7d0",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "15px",
                          }}
                        >
                          <h4
                            style={{
                              margin: "0 0 8px 0",
                              fontSize: "11px",
                              color: "#166534",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Official Resources
                          </h4>
                          {issue.helpline && (
                            <p
                              style={{
                                margin: "0 0 6px 0",
                                fontSize: "12px",
                                color: "#15803d",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                fontWeight: "bold",
                              }}
                            >
                              <PhoneCall size={14} /> {issue.helpline}
                            </p>
                          )}
                          {issue.website && (
                            <a
                              href={issue.website}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                fontSize: "12px",
                                color: "#15803d",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                fontWeight: "bold",
                                textDecoration: "none",
                              }}
                            >
                              <ExternalLink size={14} /> Visit Website
                            </a>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => setEditingIssue(issue)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          backgroundColor: "#31572C",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "6px",
                          fontWeight: "bold",
                        }}
                      >
                        <Edit2 size={16} /> Edit Issue
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>

      {editingIssue && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              backgroundColor: "#FAF9F6",
              padding: "2.5rem",
              borderRadius: "1.5rem",
              width: "90%",
              maxWidth: "500px",
              border: "4px solid #ECF39E",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setEditingIssue(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#4b5563",
              }}
            >
              <X size={24} />
            </button>

            <h2
              style={{
                fontSize: "1.8rem",
                color: "#31572C",
                fontWeight: 900,
                marginBottom: "1.5rem",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Edit Issue
            </h2>

            <form
              onSubmit={handleUpdate}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <div>
                <label
                  style={{
                    fontWeight: "bold",
                    color: "#31572C",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={editingIssue.title}
                  onChange={(e) =>
                    setEditingIssue({ ...editingIssue, title: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #90A955",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontWeight: "bold",
                    color: "#31572C",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Category
                </label>
                <select
                  value={editingIssue.category}
                  onChange={(e) =>
                    setEditingIssue({
                      ...editingIssue,
                      category: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #90A955",
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
                    fontWeight: "bold",
                    color: "#31572C",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Description
                </label>
                <textarea
                  rows="3"
                  value={editingIssue.description}
                  onChange={(e) =>
                    setEditingIssue({
                      ...editingIssue,
                      description: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #90A955",
                    outline: "none",
                    resize: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontWeight: "bold",
                    color: "#31572C",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Update Image / Evidence
                </label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .svg"
                  onChange={handleImageUpload}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "2px dashed #90A955",
                    outline: "none",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                  }}
                />
                <img
                  src={editingIssue.image || fallbackImage}
                  alt="Current Evidence"
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                    marginTop: "10px",
                    border: "2px solid #ECF39E",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "1rem",
                  backgroundColor: "#31572C",
                  color: "white",
                  border: "none",
                  borderRadius: "0.75rem",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                <Save size={20} /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
