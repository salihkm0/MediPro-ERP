import React from 'react';
import { Pill, Search, Plus, Package, AlertCircle } from 'lucide-react';

function Pharmacy() {
  const medications = [
    {
      id: 'MED001',
      name: 'Amoxicillin',
      category: 'Antibiotics',
      stock: 500,
      unit: 'tablets',
      supplier: 'PharmaCorp',
      status: 'In Stock',
      expiryDate: '2025-03-20'
    },
    {
      id: 'MED002',
      name: 'Ibuprofen',
      category: 'Pain Relief',
      stock: 200,
      unit: 'tablets',
      supplier: 'MediSupply',
      status: 'Low Stock',
      expiryDate: '2025-06-15'
    },
    {
      id: 'MED003',
      name: 'Insulin',
      category: 'Diabetes',
      stock: 100,
      unit: 'vials',
      supplier: 'BioMed Inc',
      status: 'In Stock',
      expiryDate: '2024-12-31'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Pill className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy Management</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Medication
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-blue-600">
            <Package className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Total Medications</h3>
          </div>
          <p className="text-2xl font-bold mt-2">1,234</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-yellow-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Low Stock Items</h3>
          </div>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Expiring Soon</h3>
          </div>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search medications..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Categories</option>
                <option value="antibiotics">Antibiotics</option>
                <option value="painRelief">Pain Relief</option>
                <option value="diabetes">Diabetes</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Status</option>
                <option value="inStock">In Stock</option>
                <option value="lowStock">Low Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {medications.map((medication) => (
                <tr key={medication.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{medication.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medication.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medication.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {medication.stock} {medication.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medication.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      medication.status === 'In Stock' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {medication.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medication.expiryDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
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

export default Pharmacy;