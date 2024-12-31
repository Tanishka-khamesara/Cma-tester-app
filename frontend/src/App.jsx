import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ConfirmDetails from './components/ConfirmDetails';
import Terms from './components/Terms';
import Introduction from './components/Introduction';
import Test from './components/Test';
import "./App.css"
import Finish from './components/Finish';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if the page was refreshed
    const navigationType = window.performance.getEntriesByType('navigation')[0]?.type;

    if (navigationType === 'reload' && location.pathname !== '/') {
      // Redirect to the login page only on refresh
      window.location.href = '/';
    }
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/confirm" element={<ConfirmDetails />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/test" element={<Test />} />
        <Route path="/finish" element={<Finish/>}/>
        <Route path="*" element={<Navigate to="/" />} /> {/* Fallback for unmatched routes */}
      </Routes>
    </div>
  );
};

export default App;
