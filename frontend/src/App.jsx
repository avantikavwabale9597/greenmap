import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import MapView from "./pages/MapView";
import ReportIssue from "./pages/ReportIssue";

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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
