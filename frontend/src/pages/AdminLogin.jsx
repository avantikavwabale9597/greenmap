import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, User, Lock, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://greenmap-backend-jwnf.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server connection failed. Ensure backend is running.");
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#ffffff",
          padding: "3.5rem 2.5rem",
          borderRadius: "2rem",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
          border: "4px solid #ECF39E",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Shield size={56} color="#31572C" style={{ marginBottom: "1rem" }} />
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: 900,
              color: "#31572C",
              margin: 0,
            }}
          >
            Admin Portal
          </h1>
          <p style={{ color: "#40916C", fontWeight: 600, marginTop: "0.5rem" }}>
            Authorized Personnel Only
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#842029",
              padding: "1rem",
              borderRadius: "0.75rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: "bold",
            }}
          >
            <AlertCircle size={20} /> {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                color: "#31572C",
                marginBottom: "0.5rem",
              }}
            >
              Username
            </label>
            <div style={{ position: "relative" }}>
              <User
                size={20}
                color="#90A955"
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "1rem 1rem 1rem 3rem",
                  borderRadius: "0.75rem",
                  border: "2px solid #90A955",
                  outline: "none",
                  fontSize: "1.1rem",
                  backgroundColor: "#FAF9F6",
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                color: "#31572C",
                marginBottom: "0.5rem",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={20}
                color="#90A955"
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "1rem 1rem 1rem 3rem",
                  borderRadius: "0.75rem",
                  border: "2px solid #90A955",
                  outline: "none",
                  fontSize: "1.1rem",
                  backgroundColor: "#FAF9F6",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1.25rem",
              backgroundColor: "#31572C",
              color: "white",
              border: "none",
              borderRadius: "0.75rem",
              fontWeight: "bold",
              fontSize: "1.2rem",
              cursor: "pointer",
              marginTop: "1rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            {loading ? "Authenticating..." : "Secure Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
