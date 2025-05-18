import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar as CalendarIcon, 
  Shield, 
  Briefcase,
  Edit,
  Save,
  X,
  Camera
} from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@meditrack.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Drive, Boston, MA 02115',
    dob: '1985-06-15',
    role: 'Senior Cardiologist',
    department: 'Cardiology',
    licenseNumber: 'MD12345678',
    bio: 'Board-certified cardiologist with 10 years of experience specializing in interventional cardiology and heart failure management.',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center px-4 py-2 rounded-lg ${isEditing ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'} hover:bg-blue-700 transition-colors`}
        >
          {isEditing ? (
            <>
              <X className="w-5 h-5 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="w-5 h-5 mr-2" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-1">
          <div className="bg-blue-600 h-24"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex justify-center -mt-12 mb-4">
              <div className="relative">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-blue-600">{profile.role}</p>
              <p className="text-gray-500">{profile.department}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border rounded"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border rounded"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border rounded"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.address}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <CalendarIcon className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={profile.dob}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border rounded"
                    />
                  ) : (
                    <p className="text-gray-800">{new Date(profile.dob).toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <Shield className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">License Number</p>
                  <p className="text-gray-800">{profile.licenseNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">About</h3>
              {isEditing && (
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
              )}
            </div>
            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border rounded"
              />
            ) : (
              <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
            )}
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="role"
                      value={profile.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border rounded"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.role}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <Shield className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="department"
                      value={profile.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1 border rounded"
                    />
                  ) : (
                    <p className="text-gray-800">{profile.department}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;