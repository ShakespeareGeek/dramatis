import React, { useState } from 'react';
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import PlayList from './components/PlayList';
import PlayDetails from './components/PlayDetails';
import CharacterDetails from './components/CharacterDetails';
import CharacterList from './components/CharacterList';
import { useLocation, useNavigate } from "react-router-dom";
import useGoogleAnalytics from "./hooks/useGoogleAnalytics";
import useAdSense from "./hooks/useAdSense";

function TrailingSlashHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.endsWith("/") && location.pathname !== "/") {
      navigate(location.pathname.slice(0, -1));
    }
  }, [location, navigate]);

  return null; // This component only handles logic
}

function App() {
  const base = import.meta.env.BASE_URL || ""; // Fallback to an empty string if BASE_URL is undefined
  
  useGoogleAnalytics();
  useAdSense();
  
  return (
    <Router basename={base}>
      <TrailingSlashHandler />
      <div className="min-h-screen bg-gray-50 pb-16"> {/* Add padding to avoid content overlap */}
        <Menu />
        <Routes>
          <Route path="/" element={<PlayList />} />
          <Route
            path="shakespeare_plays"
            element={
              <PlayList
              />
            }
          />
          <Route
            path="shakespeare_plays/:short_name.html"
            element={
              <PlayDetails
              />
            }
          />
          <Route
          path="shakespeare_characters"
          element={
            <CharacterList />
          }
          />
          <Route
            path="shakespeare_characters/:slug.html"
            element={
              <CharacterDetails
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
