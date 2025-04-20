// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Web3Provider } from './components/Web3Provider';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ExercisesPage from './pages/ExercisesPage';
import CommunityPage from './pages/CommunityPage';
import ResourcesPage from './pages/ResourcesPage';
import Profile from './pages/Profile';

function App() {
  // Retrieve dark mode preference from local storage (default true for black body)
  const [darkMode, setDarkMode] = useLocalStorage('mindful-dark-mode', true);

  // Update the <html> element for dark mode (Tailwind's "dark" class) on preference changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode state
  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <Web3Provider>
      <Router>
        <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
