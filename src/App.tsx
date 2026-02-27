import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ecommerce" element={<Dashboard />} />
            <Route path="*" element={<div className="p-8 text-center text-slate-500">Page coming soon</div>} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
                                                                  