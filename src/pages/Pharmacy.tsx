import React, { useState } from 'react';
import { Pill, Search, Plus, Package, AlertCircle, Edit, Trash2, Eye, X, Check } from 'lucide-react';

function Pharmacy() {
  const [medications, setMedications] = useState([
    {
      id: 'MED001',
      name: 'Amoxicillin',
      category: 'Antibiotics',
      stock: 500,
      unit: 'tablets',
      supplier: 'PharmaCorp',
      status: 'In Stock',
      expiryDate: '2025-03-20',
      description: 'Broad-spectrum antibiotic used to treat various bacterial infections',
      price: 12.99,
      reorderLevel: 100
    },
    {
      id: 'MED002',
      name: 'Ibuprofen',
      category: 'Pain Relief',
      stock: 200,
      unit: 'tablets',
      supplier: 'MediSupply',
      status: 'Low Stock',
      expiryDate: '2025-06-15',
      description: 'Nonsteroidal anti-inflammatory drug (NSAID) used for pain relief and reducing inflammation',
      price: 8.50,
      reorderLevel: 150
    },
    {
      id: 'MED003',
      name: 'Insulin',
      category: 'Diabetes',
      stock: 100,
      unit: 'vials',
      supplier: 'BioMed Inc',
      status: 'In Stock',
      expiryDate: '2024-12-31',
      description: 'Hormone used to control blood sugar levels in diabetes patients',
      price: 45.75,
      reorderLevel: 30
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(null); // 'add', 'view', 'edit', 'stock'
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [stockUpdateAmount, setStockUpdateAmount] = useState('');
  const [newMedication, setNewMedication] = useState({
    name: '',
    category: '',
    stock: '',
    unit: 'tablets',
    supplier: '',
    expiryDate: '',
    description: '',
    price: '',
    reorderLevel: ''
  });

  // Calculate summary stats
  const totalMedications = medications.length;
  const lowStockItems = medications.filter(m => m.status === 'Low Stock').length;
  const expiringSoon = medications.filter(m => {
    const expiryDate = new Date(m.expiryDate);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }).length;

  // Filter medications
  const filteredMedications = medications.filter(medication => {
    const matchesSearch = medication.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         medication.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? medication.category.toLowerCase() === categoryFilter.toLowerCase() : true;
    const matchesStatus = statusFilter ? medication.status.toLowerCase() === statusFilter.toLowerCase() : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Update medication status based on stock levels
  const updateStatus = (medications) => {
    return medications.map(med => {
      let status = 'In Stock';
      if (med.stock <= 0) {
        status = 'Out of Stock';
      } else if (med.stock <= med.reorderLevel) {
        status = 'Low Stock';
      }
      return { ...med, status };
    });
  };

  // Add new medication
  const handleAddMedication = () => {
    const newMed = {
      ...newMedication,
      id: `MED${(medications.length + 1).toString().padStart(3, '0')}`,
      stock: parseInt(newMedication.stock),
      price: parseFloat(newMedication.price),
      reorderLevel: parseInt(newMedication.reorderLevel)
    };
    
    const updatedMeds = [...medications, newMed];
    setMedications(updateStatus(updatedMeds));
    setNewMedication({
      name: '',
      category: '',
      stock: '',
      unit: 'tablets',
      supplier: '',
      expiryDate: '',
      description: '',
      price: '',
      reorderLevel: ''
    });
    setShowModal(null);
  };

  // Update medication
  const handleUpdateMedication = () => {
    const updatedMeds = medications.map(med => 
      med.id === selectedMedication.id ? { ...selectedMedication } : med
    );
    setMedications(updateStatus(updatedMeds));
    setShowModal(null);
  };

  // Delete medication
  const handleDeleteMedication = (id) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      setMedications(medications.filter(med => med.id !== id));
      setShowModal(null);
    }
  };

  // Update stock
  const handleStockUpdate = () => {
    const parsedAmount = parseInt(stockUpdateAmount);
    if (!isNaN(parsedAmount)) {
      const updatedMeds = medications.map(med => 
        med.id === selectedMedication.id ? { ...med, stock: med.stock + parsedAmount } : med
      );
      setMedications(updateStatus(updatedMeds));
      setStockUpdateAmount('');
      setShowModal(null);
    }
  };

  // Open modal with medication data
  const openModal = (modalType, medication = null) => {
    setSelectedMedication(medication);
    setShowModal(modalType);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Pill className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy Management</h1>
        </div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          onClick={() => openModal('add')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Medication
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-blue-600">
            <Package className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Total Medications</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{totalMedications}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-yellow-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Low Stock Items</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{lowStockItems}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Expiring Soon</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{expiringSoon}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search medications..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <select 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Pain Relief">Pain Relief</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Psychiatry">Psychiatry</option>
              </select>
              <select 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Medications Table */}
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
              {filteredMedications.map((medication) => (
                <tr key={medication.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{medication.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medication.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medication.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      {medication.stock} {medication.unit}
                      <button 
                        className="text-blue-600 hover:text-blue-800 text-xs"
                        onClick={() => {
                          setSelectedMedication(medication);
                          setStockUpdateAmount('');
                          setShowModal('stock');
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medication.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      medication.status === 'In Stock' 
                        ? 'bg-green-100 text-green-800'
                        : medication.status === 'Low Stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {medication.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(medication.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-3">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => openModal('view', medication)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-yellow-600 hover:text-yellow-800"
                        onClick={() => openModal('edit', medication)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteMedication(medication.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Medication Modal */}
      {showModal === 'add' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Medication</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowModal(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name*</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newMedication.name}
                    onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category*</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newMedication.category}
                    onChange={(e) => setNewMedication({...newMedication, category: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock*</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newMedication.stock}
                    onChange={(e) => setNewMedication({...newMedication, stock: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit*</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newMedication.unit}
                    onChange={(e) => setNewMedication({...newMedication, unit: e.target.value})}
                  >
                    <option value="tablets">Tablets</option>
                    <option value="vials">Vials</option>
                    <option value="bottles">Bottles</option>
                    <option value="tubes">Tubes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Supplier*</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newMedication.supplier}
                    onChange={(e) => setNewMedication({...newMedication, supplier: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date*</label>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newMedication.expiryDate}
                    onChange={(e) => setNewMedication({...newMedication, expiryDate: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    rows="3"
                    value={newMedication.description}
                    onChange={(e) => setNewMedication({...newMedication, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price*</label>
                  <input
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newMedication.price}
                    onChange={(e) => setNewMedication({...newMedication, price: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reorder Level*</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newMedication.reorderLevel}
                    onChange={(e) => setNewMedication({...newMedication, reorderLevel: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowModal(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleAddMedication}
                >
                  Add Medication
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Medication Modal */}
      {showModal === 'view' && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{selectedMedication.name} Details</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowModal(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900">Basic Information</h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">ID</p>
                      <p className="text-gray-900">{selectedMedication.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="text-gray-900">{selectedMedication.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Supplier</p>
                      <p className="text-gray-900">{selectedMedication.supplier}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Stock Information</h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Current Stock</p>
                      <p className="text-gray-900">{selectedMedication.stock} {selectedMedication.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        selectedMedication.status === 'In Stock' 
                          ? 'bg-green-100 text-green-800'
                          : selectedMedication.status === 'Low Stock'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedMedication.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reorder Level</p>
                      <p className="text-gray-900">{selectedMedication.reorderLevel} {selectedMedication.unit}</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-900">Additional Information</h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-gray-900">{selectedMedication.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-gray-900">${selectedMedication.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expiry Date</p>
                      <p className="text-gray-900">{new Date(selectedMedication.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => setShowModal(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Medication Modal */}
      {showModal === 'edit' && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit {selectedMedication.name}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowModal(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name*</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={selectedMedication.name}
                    onChange={(e) => setSelectedMedication({...selectedMedication, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category*</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={selectedMedication.category}
                    onChange={(e) => setSelectedMedication({...selectedMedication, category: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock*</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={selectedMedication.stock}
                    onChange={(e) => setSelectedMedication({...selectedMedication, stock: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit*</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={selectedMedication.unit}
                    onChange={(e) => setSelectedMedication({...selectedMedication, unit: e.target.value})}
                  >
                    <option value="tablets">Tablets</option>
                    <option value="vials">Vials</option>
                    <option value="bottles">Bottles</option>
                    <option value="tubes">Tubes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Supplier*</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={selectedMedication.supplier}
                    onChange={(e) => setSelectedMedication({...selectedMedication, supplier: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date*</label>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={selectedMedication.expiryDate}
                    onChange={(e) => setSelectedMedication({...selectedMedication, expiryDate: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    rows="3"
                    value={selectedMedication.description}
                    onChange={(e) => setSelectedMedication({...selectedMedication, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price*</label>
                  <input
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={selectedMedication.price}
                    onChange={(e) => setSelectedMedication({...selectedMedication, price: parseFloat(e.target.value) || 0})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reorder Level*</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={selectedMedication.reorderLevel}
                    onChange={(e) => setSelectedMedication({...selectedMedication, reorderLevel: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowModal(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleUpdateMedication}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Stock Modal */}
      {showModal === 'stock' && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Update Stock - {selectedMedication.name}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowModal(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Current Stock</p>
                  <p className="text-xl font-semibold">{selectedMedication.stock} {selectedMedication.unit}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Amount</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      value={stockUpdateAmount}
                      onChange={(e) => setStockUpdateAmount(e.target.value)}
                      placeholder="Enter positive or negative number"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use positive number to add stock, negative to remove
                  </p>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500">New Stock After Adjustment</p>
                  <p className="text-xl font-semibold">
                    {selectedMedication.stock + (parseInt(stockUpdateAmount) || 0)} {selectedMedication.unit}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowModal(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleStockUpdate}
                >
                  Update Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pharmacy;