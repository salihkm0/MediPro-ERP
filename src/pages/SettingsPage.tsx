import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Bell,
  Database,
  Globe,
  FileText,
  HelpCircle,
  LogOut,
  Building,
  MapPin,
  Phone,
  Globe as GlobeIcon,
  ClipboardList,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import BillingPage from "../components/Billing";
import LegalSettingsPage from "./LegalSettingsPage";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("hospital");
  const [formData, setFormData] = useState({
    notifications: true,
    twoFactorAuth: false,
    cardNumber: "•••• •••• •••• 4242",
    cardExpiry: "12/25",
    cardName: "Sarah Johnson",
    plan: "Professional",
    storage: "150GB of 200GB used",
    hospitalName: "MediTrack General Hospital",
    hospitalAddress: "123 Medical Drive, Boston, MA 02115",
    hospitalPhone: "+1 (617) 555-0123",
    hospitalEmail: "info@meditrackhospital.com",
    hospitalWebsite: "www.meditrackhospital.com",
    hospitalLicense: "HSP-789456123",
    language: "en",
    theme: "light",
    billingCycle: "Monthly",
    billingDate: "1st of every month",
    billingHistory: [
      { month: "January 2025", amount: "₹499", status: "Paid" },
      { month: "February 2025", amount: "₹499", status: "Paid" },
      { month: "March 2025", amount: "₹499", status: "Paid" },
      { month: "April 2025", amount: "₹499", status: "Paid" },
      { month: "May 2025", amount: "₹499", status: "Paid" },
    ],
  });

  const upiId = "yourupiid@upi";
  const payeeName = "Your Business Name";
  const amount = "499";
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&cu=INR`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field: string) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const settingsTabs = [
    { id: "hospital", icon: Building, label: "Hospital Details" },
    { id: "billing", icon: CreditCard, label: "Billing & Plans" },
    { id: "security", icon: Shield, label: "Security" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "storage", icon: Database, label: "Storage" },
    { id: "preferences", icon: Globe, label: "Preferences" },
    { id: "legal", icon: FileText, label: "Legal" },
    { id: "help", icon: HelpCircle, label: "Help" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "hospital":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">
                Hospital Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Number
                  </label>
                  <input
                    type="text"
                    name="hospitalLicense"
                    value={formData.hospitalLicense}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="hospitalAddress"
                    value={formData.hospitalAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="hospitalPhone"
                    value={formData.hospitalPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="hospitalEmail"
                    value={formData.hospitalEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    name="hospitalWebsite"
                    value={formData.hospitalWebsite}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Hospital Details
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">
                Hospital Departments
              </h3>
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Active Departments</h4>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    + Add Department
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    "Cardiology",
                    "Pediatrics",
                    "Neurology",
                    "Orthopedics",
                    "Emergency",
                  ].map((dept) => (
                    <div
                      key={dept}
                      className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
                    >
                      <span>{dept}</span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "billing":
        return <BillingPage />;

      case "security":
        return <LegalSettingsPage />

      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">
              {settingsTabs.find((tab) => tab.id === activeTab)?.label} Settings
            </h3>
            <p className="text-gray-500">
              Configure your {activeTab} settings here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <button className="mr-4 p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                <span>{tab.label}</span>
              </button>
            ))}
            <button className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 border-t border-gray-200 mt-2">
              <LogOut className="w-5 h-5 mr-3 text-red-500" />
              <span className="text-red-500">Log Out</span>
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
