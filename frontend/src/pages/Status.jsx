import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Status() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://greenmap-backend-jwnf.onrender.com/api/issues/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIssue(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching issue:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          padding: "80px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          color: "#6b7280",
        }}
      >
        Loading issue details...
      </div>
    );
  }

  if (!issue) {
    return (
      <div
        style={{
          padding: "80px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          color: "#ef4444",
        }}
      >
        <h2>Issue Not Found</h2>
        <p>The report you are looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f3f4f6",
        minHeight: "90vh",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Main Card Container */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            backgroundColor: "#15803d",
            color: "#ffffff",
            padding: "24px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <span
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "bold",
              }}
            >
              {issue.category || "Civic Issue"}
            </span>
            <h1
              style={{
                margin: "10px 0 0 0",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              {issue.title}
            </h1>
          </div>
          <div
            style={{
              backgroundColor: "#ffffff",
              color: "#15803d",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            ● {issue.status || "Pending"}
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: "30px" }}>
          {/* Description Section */}
          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                color: "#9ca3af",
                letterSpacing: "0.5px",
                marginBottom: "8px",
              }}
            >
              Description
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "#374151",
                lineHeight: "1.6",
                backgroundColor: "#f9fafb",
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #f3f4f6",
                margin: "0",
              }}
            >
              {issue.description}
            </p>
          </div>

          {/* Official Resources Box (Helpline & Website) */}
          {(issue.helpline || issue.website) && (
            <div
              style={{
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "25px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "15px",
                  color: "#166534",
                  fontWeight: "bold",
                }}
              >
                🏛️ Official Action & Resources Provided by Admin
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "10px",
                }}
              >
                {issue.helpline && (
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      border: "1px solid #dcfce7",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>📞</span>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          fontWeight: "600",
                        }}
                      >
                        HELPLINE NUMBER
                      </div>
                      <a
                        href={`tel:${issue.helpline}`}
                        style={{
                          fontSize: "14px",
                          color: "#15803d",
                          fontWeight: "bold",
                          textDecoration: "none",
                        }}
                      >
                        {issue.helpline}
                      </a>
                    </div>
                  </div>
                )}
                {issue.website && (
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      border: "1px solid #dcfce7",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>🌐</span>
                    <div style={{ overflow: "hidden" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          fontWeight: "600",
                        }}
                      >
                        OFFICIAL PORTAL LINK
                      </div>
                      <a
                        href={issue.website}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: "14px",
                          color: "#2563eb",
                          fontWeight: "bold",
                          textDecoration: "underline",
                          wordBreak: "break-all",
                        }}
                      >
                        {issue.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Evidence Image */}
          {issue.image && (
            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  color: "#9ca3af",
                  letterSpacing: "0.5px",
                  marginBottom: "10px",
                }}
              >
                Photographic Evidence
              </h3>
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#000000",
                  display: "flex",
                  justifyContent: "center",
                  maxHeight: "350px",
                }}
              >
                <img
                  src={issue.image}
                  alt="Evidence"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    maxHeight: "350px",
                  }}
                />
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div
            style={{
              borderTop: "1px solid #f3f4f6",
              paddingTop: "15px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              color: "#9ca3af",
            }}
          >
            <span>GreenMap Pune Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
