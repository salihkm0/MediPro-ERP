import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  FileText,
  Receipt,
  Pill,
  Bed,
  Package,
  Shield,
  BarChart3,
  X,
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/patients', icon: Users, label: 'Patients' },
  { path: '/staff', icon: UserCog, label: 'Staff' },
  { path: '/appointments', icon: Calendar, label: 'Appointments' },
  { path: '/records', icon: FileText, label: 'Medical Records' },
  { path: '/billing', icon: Receipt, label: 'Billing' },
  { path: '/pharmacy', icon: Pill, label: 'Pharmacy & Lab' },
  { path: '/wards', icon: Bed, label: 'Wards & Beds' },
  { path: '/inventory', icon: Package, label: 'Inventory' },
  { path: '/insurance', icon: Shield, label: 'Insurance' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">MediTrack Pro</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;