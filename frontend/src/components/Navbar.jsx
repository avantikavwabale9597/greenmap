import { Link, useLocation } from "react-router-dom";
import { MapPin, FilePlus, ShieldAlert, Leaf } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#31572C] w-full min-h-[12vh] shadow-xl flex items-center border-b-[4px] border-[#ECF39E]">
      <div
        className="w-full max-w-[95%] mx-auto flex items-center justify-between"
        style={{
          flexWrap: "wrap",
          gap: "1.5rem",
          padding: "1rem 0",
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold flex items-center gap-3 transition-colors"
          style={{
            textDecoration: "none",
            color: "#FAF9F6",
            backgroundColor: "transparent",
            whiteSpace: "nowrap", // Prevents the logo from splitting onto two lines
          }}
        >
          <Leaf className="text-[#ECF39E]" size={36} fill="currentColor" />
          <span>GreenMap</span>
        </Link>

        {/* CENTER LINKS (Map & Report) */}
        <div
          className="flex items-center"
          style={{
            gap: "clamp(1.5rem, 5vw, 6rem)", // Smart gap: 6rem on laptop, shrinks on phones
            flex: "1 1 250px", // Wraps to a new line and takes up space on phones
            justifyContent: "center", // Centers the links perfectly when wrapped
          }}
        >
          <Link
            to="/map"
            className="flex items-center gap-3 text-xl font-bold transition-all duration-300"
            style={{
              textDecoration: "none",
              color: isActive("/map") ? "#ECF39E" : "#FAF9F6",
              borderBottom: isActive("/map")
                ? "4px solid #ECF39E"
                : "4px solid transparent",
              paddingBottom: "8px",
              backgroundColor: "transparent",
            }}
          >
            <MapPin size={26} />
            <span>Map</span>
          </Link>

          <Link
            to="/report"
            className="flex items-center gap-3 text-xl font-bold transition-all duration-300"
            style={{
              textDecoration: "none",
              color: isActive("/report") ? "#ECF39E" : "#FAF9F6",
              borderBottom: isActive("/report")
                ? "4px solid #ECF39E"
                : "4px solid transparent",
              paddingBottom: "8px",
              backgroundColor: "transparent",
            }}
          >
            <FilePlus size={26} />
            <span>Report</span>
          </Link>
        </div>

        {/* ADMIN BUTTON */}
        <Link
          to="/admin"
          className="flex items-center gap-3 bg-[#ECF39E] rounded-full text-xl font-extrabold transform hover:scale-98 transition-all shadow-md"
          style={{
            textDecoration: "none",
            color: "#31572C",
            padding: "0.5rem 0.7rem",
            whiteSpace: "nowrap", // Keeps the button text on one line
          }}
        >
          <ShieldAlert size={26} />
          <span>Admin Dashboard</span>
        </Link>
      </div>
    </nav>
  );
}
