import React from 'react';
import { Shield, Search, Plus, FileText } from 'lucide-react';

function Insurance() {
  const insuranceClaims = [
    {
      id: 'CLM001',
      patientName: 'John Doe',
      provider: 'Blue Cross',
      policyNumber: 'BC123456',
      claimDate: '2024-03-15',
      amount: 1500.00,
      status: 'Pending'
    },
    {
      id: 'CLM002',
      patientName: 'Jane Smith',
      provider: 'Aetna',
      policyNumber: 'AE789012',
      claimDate: '2024-03-14',
      amount: 2500.00,
      status: 'Approved'
    },
    {
      id: 'CLM003',
      patientName: 'Robert Brown',
      provider: 'UnitedHealth',
      policyNumber: 'UH345678',
      claimDate: '2024-03-13',
      amount: 3000.00,
      status: 'Rejected'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Insurance Claims</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          New Claim
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-blue-600">
            <FileText className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Total Claims</h3>
          </div>
          <p className="text-2xl font-bold mt-2">156</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-green-600">
            <FileText className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Approved Claims</h3>
          </div>
          <p className="text-2xl font-bold mt-2">89</p>
          <p className="text-sm text-gray-500">$45,678 total</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-yellow-600">
            <FileText className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Pending Claims</h3>
          </div>
          <p className="text-2xl font-bold mt-2">67</p>
          <p className="text-sm text-gray-500">$32,456 pending</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search claims..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Providers</option>
                <option value="blueCross">Blue Cross</option>
                <option value="aetna">Aetna</option>
                <option value="unitedHealth">UnitedHealth</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {insuranceClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.provider}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.policyNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.claimDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${claim.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      claim.status === 'Approved' 
                        ? 'bg-green-100 text-green-800'
                        : claim.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {claim.status}
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
      </div>
    </div>
  );
}

export default Insurance;