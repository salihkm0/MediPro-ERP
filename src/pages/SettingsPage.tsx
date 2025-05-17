import React, { useState } from 'react';
import { 
  ArrowLeft,
  User,
  Mail,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Database,
  Globe,
  FileText,
  HelpCircle,
  LogOut,
  Edit
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@meditrack.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: true,
    twoFactorAuth: false,
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/25',
    cardName: 'Sarah Johnson',
    plan: 'Professional',
    storage: '150GB of 200GB used',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const settingsTabs = [
    { id: 'account', icon: User, label: 'Account' },
    { id: 'billing', icon: CreditCard, label: 'Billing & Plans' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'storage', icon: Database, label: 'Storage' },
    { id: 'preferences', icon: Globe, label: 'Preferences' },
    { id: 'legal', icon: FileText, label: 'Legal' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Photo</h3>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
                  />
                  <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 mr-3">
                    Upload New
                  </button>
                  <button className="px-4 py-2 text-red-600 hover:text-red-800">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'billing':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">Payment Method</h3>
              <div className="border border-gray-200 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium">Visa ending in 4242</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Cardholder Name</p>
                    <p>{formData.cardName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expires</p>
                    <p>{formData.cardExpiry}</p>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 w-full">
                + Add New Payment Method
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">Plan Details</h3>
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{formData.plan} Plan</h4>
                    <p className="text-gray-500">Monthly subscription</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h5 className="font-medium mb-2">Features</h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                          ✓
                        </span>
                        Unlimited Patients
                      </li>
                      <li className="flex items-center">
                        <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                          ✓
                        </span>
                        Advanced Analytics
                      </li>
                      <li className="flex items-center">
                        <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                          ✓
                        </span>
                        Priority Support
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Billing</h5>
                    <div className="space-y-2 text-sm">
                      <p>Next billing date: Jan 15, 2024</p>
                      <p>Payment method: Visa •••• 4242</p>
                      <p>Amount: $49.99/month</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Storage</h5>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Used: {formData.storage.split(' of ')[0]}</span>
                        <span>{formData.storage.split(' of ')[1]}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Upgrade Plan
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      // Add cases for other tabs (security, notifications, etc.)
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">{settingsTabs.find(tab => tab.id === activeTab)?.label} Settings</h3>
            <p className="text-gray-500">Configure your {activeTab} settings here.</p>
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
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
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
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;