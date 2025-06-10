
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { GlassmorphismProvider } from './contexts/GlassmorphismContext';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import FeedPage from './pages/FeedPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ChallengesPage from './pages/ChallengesPage';
import MemeGeneratorPage from './pages/MemeGeneratorPage';
import TeamsListPage from './pages/TeamsListPage';
import TeamDetailPage from './pages/TeamDetailPage'; 
import ProfilePage from './pages/ProfilePage';
import Header from './components/shared/Header';
import FloatingButtonsContainer from './components/shared/FloatingButtonsContainer';
import HelpPage from './pages/HelpPage'; // Import new HelpPage

const AppContent: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
        <div className="glass animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-DEFAULT"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 bg-fixed">
        {currentUser && <Header />}
        <main className="flex-grow pt-16"> {/* Add padding-top to prevent content from being hidden behind sticky header */}
          <Routes>
            <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/welcome" />} /> {/* Changed redirect to /welcome */}
            <Route path="/welcome" element={currentUser ? <WelcomePage /> : <Navigate to="/login" />} />
            <Route path="/help" element={currentUser ? <HelpPage /> : <Navigate to="/login" />} />
            <Route path="/" element={currentUser ? <FeedPage /> : <Navigate to="/login" />} />
            <Route path="/announcements" element={currentUser ? <AnnouncementsPage /> : <Navigate to="/login" />} />
            <Route path="/challenges" element={currentUser ? <ChallengesPage /> : <Navigate to="/login" />} />
            <Route path="/meme-generator" element={currentUser ? <MemeGeneratorPage /> : <Navigate to="/login" />} />
            <Route path="/teams" element={currentUser ? <TeamsListPage /> : <Navigate to="/login" />} />
            <Route path="/teams/:teamId" element={currentUser ? <TeamDetailPage /> : <Navigate to="/login" />} /> 
            <Route path="/profile/:userId" element={currentUser ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} />} /> {/* Default logged-in page remains / (Feed) after initial welcome */}
          </Routes>
        </main>
        {currentUser && <FloatingButtonsContainer />} {/* Show FABs only if logged in */}
      </div>
  );
};

const App: React.FC = () => {
  return (
    <GlassmorphismProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </GlassmorphismProvider>
  );
};

export default App;
