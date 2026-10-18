import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold text-greenmap-forest mb-6"
      >
        Welcome to GreenMap
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-2xl text-greenmap-grass mb-10 max-w-2xl"
      >
        Empowering citizens to track, report, and resolve local environmental
        issues together.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="space-x-4"
      >
        <Link
          to="/map"
          className="bg-greenmap-grass text-greenmap-white px-8 py-3 rounded-full font-semibold hover:bg-greenmap-forest transition-colors shadow-lg"
        >
          View Map
        </Link>
        <Link
          to="/report"
          className="bg-greenmap-leaf text-greenmap-forest px-8 py-3 rounded-full font-semibold hover:bg-greenmap-moss transition-colors shadow-lg"
        >
          Report Issue
        </Link>
      </motion.div>
    </div>
  );
}
