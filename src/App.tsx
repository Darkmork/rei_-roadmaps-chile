
import React from "react";
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoadmapDetailPage from './pages/RoadmapDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RoadmapItemDetailPage from './pages/RoadmapItemDetailPage';
import TechnicalTestPage from './pages/TechnicalTestPage'; // Nueva página
import { useAppContext } from './contexts/AppContext';


const App: React.FC = () => {
  const { darkMode } = useAppContext();

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-rei-bg-light dark:bg-rei-bg-dark text-rei-text-light dark:text-rei-text-dark">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/roadmap/:roadmapId" element={<RoadmapDetailPage />} />
            <Route path="/roadmap/:roadmapId/module/:moduleId/item/:itemId" element={<RoadmapItemDetailPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/pruebas-tecnicas" element={<TechnicalTestPage />} /> {/* Nueva ruta */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
