import React from 'react';
import Header from '../../components/layout/Header';
import { useTheme } from '../../context/ThemeContext';
import { Outlet, useLocation } from 'react-router';
import { motion } from 'framer-motion';
const Main: React.FC = () => {
  const { darkMode } = useTheme();
  const location = useLocation();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5
        }}
        className="container mx-auto px-4 py-6"
      >
        <Outlet />
      </motion.div>
    </div>
  );
}

export default Main;