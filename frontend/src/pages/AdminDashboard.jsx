import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut,
  Map,
  Activity,
  Settings,
  X,
  Save,
  Phone,
  Globe,
  BarChart2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [managingIssue, setManagingIssue] = useState(null);

  const fetchIssues = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/issues");
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchIssues();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleUpdateIssue = async (e) => {
    e.preventDefault();
    try {
      await fetch(`https://greenmap-backend-jwnf.onrender.com`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(managingIssue),
      });
      setManagingIssue(null);
      fetchIssues();
    } catch (error) {
      console.error(error);
    }
  };

  const pendingCount = issues.filter(
    (i) => (i.status || "Pending") === "Pending",
  ).length;
  const inProgressCount = issues.filter(
    (i) => i.status === "In Progress",
  ).length;
  const resolvedCount = issues.filter((i) => i.status === "Resolved").length;

  const chartData = [
    { name: "Pending", count: pendingCount, color: "#842029" },
    { name: "In Progress", count: inProgressCount, color: "#856404" },
    { name: "Resolved", count: resolvedCount, color: "#0f5132" },
  ];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#FAF9F6",
        padding: "2rem 5%",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2.5rem",
            backgroundColor: "#ffffff",
            padding: "1.5rem 2.5rem",
            borderRadius: "1.5rem",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
            border: "2px solid #ECF39E",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 900,
                color: "#31572C",
                margin: 0,
              }}
            >
              Dashboard Overview
            </h1>
            <p
              style={{
                color: "#40916C",
                fontWeight: 600,
                margin: "0.25rem 0 0 0",
              }}
            >
              Manage and resolve civic issues.
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#f8d7da",
              color: "#842029",
              border: "none",
              borderRadius: "0.75rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem",
              borderRadius: "1.5rem",
              border: "3px solid #90A955",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#ECF39E",
                borderRadius: "1rem",
              }}
            >
              <Activity size={32} color="#31572C" />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "#31572C",
                  margin: 0,
                }}
              >
                {issues.length}
              </h3>
              <p
                style={{
                  color: "#666",
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Total Reports Received
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem",
              borderRadius: "1.5rem",
              border: "3px solid #90A955",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#f8d7da",
                borderRadius: "1rem",
              }}
            >
              <Map size={32} color="#842029" />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "#842029",
                  margin: 0,
                }}
              >
                {pendingCount + inProgressCount}
              </h3>
              <p
                style={{
                  color: "#666",
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Active Issues Requiring Action
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "1.5rem",
            marginBottom: "2.5rem",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
            border: "2px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "2rem",
            }}
          >
            <BarChart2 size={28} color="#31572C" />
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 900,
                color: "#31572C",
                margin: 0,
              }}
            >
              Issue Status Breakdown
            </h2>
          </div>

          <div style={{ height: "300px", width: "100%" }}>
            {loading ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                  fontWeight: "bold",
                }}
              >
                Loading chart...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontWeight: "bold",
                      fill: "#4b5563",
                      fontSize: "14px",
                    }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                    tick={{ fontWeight: "bold", fill: "#4b5563" }}
                  />
                  <ChartTooltip
                    cursor={{ fill: "#f3f4f6" }}
                    contentStyle={{
                      borderRadius: "12px",
                      fontWeight: "bold",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 8, 8]} barSize={80}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "1.5rem",
            overflow: "hidden",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
            border: "2px solid #e5e7eb",
          }}
        >
          {loading ? (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "#31572C",
                fontWeight: "bold",
                fontSize: "1.25rem",
              }}
            >
              Loading data...
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead style={{ backgroundColor: "#31572C", color: "#ffffff" }}>
                  <tr>
                    <th
                      style={{
                        padding: "1.25rem 1.5rem",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Issue Title
                    </th>
                    <th
                      style={{
                        padding: "1.25rem 1.5rem",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Category
                    </th>
                    <th
                      style={{
                        padding: "1.25rem 1.5rem",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        padding: "1.25rem 1.5rem",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Date Reported
                    </th>
                    <th
                      style={{
                        padding: "1.25rem 1.5rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr
                      key={issue._id}
                      style={{ borderBottom: "1px solid #e5e7eb" }}
                    >
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          fontWeight: "bold",
                          color: "#1f2937",
                        }}
                      >
                        {issue.title}
                      </td>
                      <td style={{ padding: "1.25rem 1.5rem" }}>
                        <span
                          style={{
                            backgroundColor: "#ECF39E",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "999px",
                            fontSize: "0.85rem",
                            fontWeight: "bold",
                            color: "#31572C",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {issue.category}
                        </span>
                      </td>
                      <td style={{ padding: "1.25rem 1.5rem" }}>
                        <span
                          style={{
                            backgroundColor:
                              issue.status === "Resolved"
                                ? "#d1e7dd"
                                : issue.status === "In Progress"
                                  ? "#fff3cd"
                                  : "#f8d7da",
                            color:
                              issue.status === "Resolved"
                                ? "#0f5132"
                                : issue.status === "In Progress"
                                  ? "#856404"
                                  : "#842029",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "999px",
                            fontSize: "0.85rem",
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {issue.status || "Pending"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          color: "#6b7280",
                          fontSize: "0.9rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {new Date(
                          issue.createdAt || Date.now(),
                        ).toLocaleDateString()}
                      </td>
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          textAlign: "center",
                        }}
                      >
                        <button
                          onClick={() => setManagingIssue(issue)}
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#31572C",
                            color: "white",
                            border: "none",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontWeight: "bold",
                          }}
                        >
                          <Settings size={16} /> Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

      {managingIssue && (
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
            }}
          >
            <button
              onClick={() => setManagingIssue(null)}
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
              Manage Issue
            </h2>

            <form
              onSubmit={handleUpdateIssue}
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
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Phone size={18} /> Official Helpline Number
                </label>
                <input
                  type="text"
                  placeholder="e.g., 1800-233-1234"
                  value={managingIssue.helpline || ""}
                  onChange={(e) =>
                    setManagingIssue({
                      ...managingIssue,
                      helpline: e.target.value,
                    })
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
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Globe size={18} /> Official Website Link
                </label>
                <input
                  type="url"
                  placeholder="e.g., https://pmc.gov.in"
                  value={managingIssue.website || ""}
                  onChange={(e) =>
                    setManagingIssue({
                      ...managingIssue,
                      website: e.target.value,
                    })
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
                  Update Status
                </label>
                <select
                  value={managingIssue.status || "Pending"}
                  onChange={(e) =>
                    setManagingIssue({
                      ...managingIssue,
                      status: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #90A955",
                    outline: "none",
                    backgroundColor: "#fff",
                    fontWeight: "bold",
                    color:
                      managingIssue.status === "Resolved"
                        ? "#0f5132"
                        : managingIssue.status === "In Progress"
                          ? "#856404"
                          : "#842029",
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
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
                  marginTop: "1rem",
                }}
              >
                <Save size={20} /> Update Issue & Resources
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
