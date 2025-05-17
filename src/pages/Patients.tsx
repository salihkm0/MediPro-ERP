// import React from 'react';
// import { Users } from 'lucide-react';
// import PatientForm from '../components/PatientForm';
// import toast from 'react-hot-toast';

// export default function Patients() {

//   const handleSave = async (data) => {
//     try {
//       // Your save logic here (API call, etc.)
//       console.log('Patient data:', data);
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     } catch (error) {
//       throw error; // Let the form handle the error
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <Users className="h-8 w-8 text-blue-600" />
//           <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
//         </div>
//       </div>
      
//       <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
//         <div className="p-6">
//           <p className="text-gray-500">Patient management interface will be implemented here.</p>
//         </div>
//         <div className="max-w-4xl mx-auto p-4">
//       <PatientForm
//         onSave={handleSave}
//         onCancel={() => toast('Operation canceled')}
//       />
//     </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Users, Search, Plus, FileText, Phone, Mail, Calendar } from 'lucide-react';
import PatientForm from '../components/PatientForm';
import toast from 'react-hot-toast';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  email: string;
  bloodType: string;
  lastVisit: string;
  status: string;
}

function Patients() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const patients: Patient[] = [
    {
      id: 'P001',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      contact: '+1 234 567 890',
      email: 'john.doe@email.com',
      bloodType: 'O+',
      lastVisit: '2024-03-15',
      status: 'Active'
    },
    {
      id: 'P002',
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      contact: '+1 234 567 891',
      email: 'jane.smith@email.com',
      bloodType: 'A+',
      lastVisit: '2024-03-14',
      status: 'Scheduled'
    },
    {
      id: 'P003',
      name: 'Robert Johnson',
      age: 58,
      gender: 'Male',
      contact: '+1 234 567 892',
      email: 'robert.j@email.com',
      bloodType: 'B-',
      lastVisit: '2024-03-10',
      status: 'Inactive'
    }
  ];

  // const AddPatientForm = () => {
  //   const [formData, setFormData] = useState({
  //     name: '',
  //     age: '',
  //     gender: 'Male',
  //     contact: '',
  //     email: '',
  //     bloodType: '',
  //     medicalHistory: ''
  //   });

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     // Handle form submission here
  //     console.log('Form submitted:', formData);
  //     setShowAddForm(false);
  //   };

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  //     const { name, value } = e.target;
  //     setFormData(prev => ({
  //       ...prev,
  //       [name]: value
  //     }));
  //   };

  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  //       <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
  //         <div className="flex justify-between items-center mb-6">
  //           <h2 className="text-2xl font-semibold">Add New Patient</h2>
  //           <button
  //             onClick={() => setShowAddForm(false)}
  //             className="text-gray-500 hover:text-gray-700"
  //           >
  //             ×
  //           </button>
  //         </div>

  //         <form onSubmit={handleSubmit} className="space-y-6">
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Full Name
  //               </label>
  //               <input
  //                 type="text"
  //                 name="name"
  //                 value={formData.name}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                 required
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Age
  //               </label>
  //               <input
  //                 type="number"
  //                 name="age"
  //                 value={formData.age}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                 required
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Gender
  //               </label>
  //               <select
  //                 name="gender"
  //                 value={formData.gender}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               >
  //                 <option value="Male">Male</option>
  //                 <option value="Female">Female</option>
  //                 <option value="Other">Other</option>
  //               </select>
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Blood Type
  //               </label>
  //               <input
  //                 type="text"
  //                 name="bloodType"
  //                 value={formData.bloodType}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                 required
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Contact Number
  //               </label>
  //               <input
  //                 type="tel"
  //                 name="contact"
  //                 value={formData.contact}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                 required
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Email
  //               </label>
  //               <input
  //                 type="email"
  //                 name="email"
  //                 value={formData.email}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                 required
  //               />
  //             </div>
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Medical History
  //             </label>
  //             <textarea
  //               name="medicalHistory"
  //               value={formData.medicalHistory}
  //               onChange={handleChange}
  //               rows={4}
  //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             ></textarea>
  //           </div>

  //           <div className="flex justify-end gap-4">
  //             <button
  //               type="button"
  //               onClick={() => setShowAddForm(false)}
  //               className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               type="submit"
  //               className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
  //             >
  //               Add Patient
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // };

  


  const handleSave = async (data) => {
    try {
      // Your save logic here (API call, etc.)
      console.log('Patient data:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      throw error; // Let the form handle the error
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-blue-600">
            <Users className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Total Patients</h3>
          </div>
          <p className="text-2xl font-bold mt-2">1,234</p>
          <p className="text-sm text-gray-500">+3 this week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-green-600">
            <Calendar className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Appointments Today</h3>
          </div>
          <p className="text-2xl font-bold mt-2">8</p>
          <p className="text-sm text-gray-500">2 completed</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-purple-600">
            <FileText className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Pending Reports</h3>
          </div>
          <p className="text-2xl font-bold mt-2">5</p>
          <p className="text-sm text-gray-500">View all</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age/Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age} / {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {patient.contact}
                      </span>
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {patient.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.bloodType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      patient.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : patient.status === 'Scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing 3 of 1,234 patients</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Previous</button>
              <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Next</button>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && <PatientForm 
      onSave={handleSave}
      onCancel={() => toast('Operation canceled')} />}
    </div>
  );
}

export default Patients;