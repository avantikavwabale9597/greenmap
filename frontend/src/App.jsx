import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import MapView from "./pages/MapView";
import ReportIssue from "./pages/ReportIssue";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Status from "./pages/Status";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen flex flex-col m-0 p-0">
        <Navbar />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/admin" element={<Navigate to="/admin/login" />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/status/:id" element={<Status />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
