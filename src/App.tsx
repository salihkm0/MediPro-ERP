import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Staff from './pages/Staff';
import Appointments from './pages/Appointments';
import Records from './pages/Records';
import Billing from './pages/Billing';
import Pharmacy from './pages/Pharmacy';
import Wards from './pages/Wards';
import Inventory from './pages/Inventory';
import Insurance from './pages/Insurance';
import Reports from './pages/Reports';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import HospitalLoginPage from './pages/LoginPage';
import PatientViewPage from './components/PatientViewPage';
import CalendarView from './components/CalendarView';

function Layout({ children, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-20 bg-white p-2 rounded-lg shadow-md"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {children}
      </main>
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  if (isLoginPage) {
    return <HospitalLoginPage />;
  }

  return (
    <Layout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patient/:id" element={<PatientViewPage />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/records" element={<Records />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/wards" element={<Wards />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/appointments/calendar" element={<CalendarView />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
