import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin,
  Megaphone,
  Trash2,
  Users,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

const SplitEarth = () => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Left Half: Clean & Lush Green/Blue Earth */}
      <Sphere args={[1.75, 64, 64, 0, Math.PI]}>
        <meshStandardMaterial color="#2d6a4f" roughness={0.4} metalness={0.1} />
      </Sphere>

      {/* Right Half: Polluted & Smokey Brown Earth */}
      <Sphere args={[1.75, 64, 64, Math.PI, Math.PI]}>
        <meshStandardMaterial color="#4a3f35" roughness={0.9} metalness={0.0} />
      </Sphere>

      {/* Tech Wireframe Atmosphere */}
      <Sphere args={[1.95, 32, 32]}>
        <meshBasicMaterial
          color="#ECF39E"
          wireframe={true}
          transparent
          opacity={0.12}
        />
      </Sphere>
    </group>
  );
};

export default function LandingPage() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#FAF9F6",
        overflowX: "hidden",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* HERO SECTION: Strict 50/50 Split with Exact Padding */}
      <section
        style={{
          width: "100%",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem 5%",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1600px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "4rem",
          }}
        >
          {/* LEFT COLUMN: Exactly 50% Width */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
              zIndex: 10,
            }}
          >
            <h1
              style={{
                fontSize: "clamp(3rem, 5vw, 5.5rem)",
                fontWeight: 900,
                color: "#31572C",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              Heal the <br />
              <span style={{ color: "#40916C" }}>Planet.</span>
            </h1>

            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#40916C",
                marginBottom: "1rem",
              }}
            >
              Pune's Civic Action Platform
            </p>

            <p
              style={{
                fontSize: "1.125rem",
                color: "#4b5563",
                marginBottom: "2.5rem",
                lineHeight: 1.7,
                fontWeight: 500,
                maxWidth: "600px",
              }}
            >
              Our planet is at a tipping point. The interactive globe on the
              right represents our critical choice: a polluted, neglected
              environment or a lush, sustainable ecosystem. Track and report
              local issues to turn the map green.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1.5rem",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/map"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  backgroundColor: "#31572C",
                  color: "#FAF9F6",
                  padding: "1rem 2rem",
                  borderRadius: "1rem",
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                }}
              >
                <MapPin size={24} />
                <span>View Live Map</span>
              </Link>

              <Link
                to="/report"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  backgroundColor: "#ECF39E",
                  color: "#31572C",
                  padding: "1rem 2rem",
                  borderRadius: "1rem",
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                }}
              >
                <Megaphone size={24} />
                <span>Report an Issue</span>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Exactly 50% Width with 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              width: "50%",
              height: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Status Badges */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: "rgba(49, 87, 44, 0.1)",
                color: "#31572C",
                border: "1px solid rgba(49, 87, 44, 0.2)",
                padding: "0.5rem 1rem",
                borderRadius: "0.75rem",
                fontWeight: "bold",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backdropFilter: "blur(4px)",
                zIndex: 10,
              }}
            >
              <ShieldCheck size={16} /> Clean & Lush
            </div>
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "rgba(74, 63, 53, 0.1)",
                color: "#4a3f35",
                border: "1px solid rgba(74, 63, 53, 0.2)",
                padding: "0.5rem 1rem",
                borderRadius: "0.75rem",
                fontWeight: "bold",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backdropFilter: "blur(4px)",
                zIndex: 10,
              }}
            >
              <AlertTriangle size={16} /> Polluted
            </div>

            <Canvas
              camera={{ position: [0, 0, 8], fov: 45 }}
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
            >
              <ambientLight intensity={1.8} />
              <directionalLight position={[10, 10, 5]} intensity={2.5} />
              <SplitEarth />
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.8}
              />
            </Canvas>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        style={{
          width: "100%",
          backgroundColor: "#31572C",
          padding: "6rem 5%",
          borderTop: "8px solid #ECF39E",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "3rem",
                fontWeight: 900,
                color: "#FAF9F6",
                marginBottom: "1rem",
              }}
            >
              How GreenMap Works
            </h2>
            <p
              style={{ color: "#ECF39E", fontSize: "1.25rem", fontWeight: 500 }}
            >
              Bridging the gap between citizens and solutions.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.5rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#FAF9F6",
                padding: "3rem",
                borderRadius: "2rem",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  backgroundColor: "#ECF39E",
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Trash2 size={28} color="#31572C" />
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  color: "#31572C",
                  marginBottom: "1rem",
                }}
              >
                1. Identify
              </h3>
              <p
                style={{
                  color: "#4b5563",
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                Notice an overflowing garbage bin, a polluted water source, or
                illegal dumping? Snap a picture and open GreenMap.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#FAF9F6",
                padding: "3rem",
                borderRadius: "2rem",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  backgroundColor: "#ECF39E",
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                }}
              >
                <MapPin size={28} color="#31572C" />
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  color: "#31572C",
                  marginBottom: "1rem",
                }}
              >
                2. Map It
              </h3>
              <p
                style={{
                  color: "#4b5563",
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                Submit a report with exact GPS coordinates. Your issue instantly
                appears as a marker on the public live map.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#FAF9F6",
                padding: "3rem",
                borderRadius: "2rem",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  backgroundColor: "#ECF39E",
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Users size={28} color="#31572C" />
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  color: "#31572C",
                  marginBottom: "1rem",
                }}
              >
                3. Resolve
              </h3>
              <p
                style={{
                  color: "#4b5563",
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                Authorities and community groups use the admin dashboard to
                track open cases, deploy resources, and mark the area clean.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
