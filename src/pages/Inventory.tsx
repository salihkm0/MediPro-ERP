// import React from 'react';
// import { Package, Search, Filter, AlertCircle, Download } from 'lucide-react';

// function Inventory() {
//   const inventory = [
//     {
//       id: 'MED001',
//       name: 'Surgical Masks',
//       category: 'PPE',
//       quantity: 5000,
//       unit: 'pieces',
//       status: 'In Stock',
//       reorderPoint: 1000,
//       lastUpdated: '2024-03-15'
//     },
//     {
//       id: 'MED002',
//       name: 'Disposable Gloves',
//       category: 'PPE',
//       quantity: 2500,
//       unit: 'pairs',
//       status: 'Low Stock',
//       reorderPoint: 3000,
//       lastUpdated: '2024-03-14'
//     },
//     {
//       id: 'EQP001',
//       name: 'Stethoscope',
//       category: 'Equipment',
//       quantity: 45,
//       unit: 'pieces',
//       status: 'In Stock',
//       reorderPoint: 10,
//       lastUpdated: '2024-03-13'
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <Package className="h-8 w-8 text-blue-600" />
//           <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
//         </div>
//         <div className="flex gap-3">
//           <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Filter className="w-4 h-4 mr-2" />
//             Filter
//           </button>
//           <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
//             <Download className="w-4 h-4 mr-2" />
//             Export Inventory
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-blue-50 p-6 rounded-lg">
//           <h3 className="text-blue-800 font-semibold mb-2">Total Items</h3>
//           <p className="text-3xl font-bold text-blue-900">7,545</p>
//         </div>
//         <div className="bg-yellow-50 p-6 rounded-lg">
//           <h3 className="text-yellow-800 font-semibold mb-2">Low Stock Items</h3>
//           <p className="text-3xl font-bold text-yellow-900">12</p>
//         </div>
//         <div className="bg-red-50 p-6 rounded-lg">
//           <h3 className="text-red-800 font-semibold mb-2">Out of Stock</h3>
//           <p className="text-3xl font-bold text-red-900">3</p>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search inventory..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex gap-4">
//               <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">All Categories</option>
//                 <option value="PPE">PPE</option>
//                 <option value="Equipment">Equipment</option>
//                 <option value="Supplies">Supplies</option>
//               </select>
//               <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">All Status</option>
//                 <option value="in-stock">In Stock</option>
//                 <option value="low-stock">Low Stock</option>
//                 <option value="out-of-stock">Out of Stock</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {inventory.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {item.quantity} {item.unit}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       item.status === 'In Stock' 
//                         ? 'bg-green-100 text-green-800'
//                         : item.status === 'Low Stock'
//                         ? 'bg-yellow-100 text-yellow-800'
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdated}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
//                     <button className="text-blue-600 hover:text-blue-800">View</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="p-4 border-t border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center text-yellow-600">
//               <AlertCircle className="w-5 h-5 mr-2" />
//               <span className="text-sm">3 items are below reorder point</span>
//             </div>
//             <div className="flex gap-2">
//               <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Previous</button>
//               <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Next</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Inventory;



import React, { useState } from 'react';
import { Package, Search, Filter, AlertCircle, Download, Plus, Printer, FileSpreadsheet } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: string;
  reorderPoint: number;
  lastUpdated: string;
  supplier: string;
  location: string;
  cost: number;
}

function Inventory() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Sample inventory data
  const inventory: InventoryItem[] = [
    {
      id: 'MED001',
      name: 'Surgical Masks',
      category: 'PPE',
      quantity: 5000,
      unit: 'pieces',
      status: 'In Stock',
      reorderPoint: 1000,
      lastUpdated: '2024-03-15',
      supplier: 'MedSupply Co.',
      location: 'Warehouse A',
      cost: 0.5
    },
    {
      id: 'MED002',
      name: 'Disposable Gloves',
      category: 'PPE',
      quantity: 2500,
      unit: 'pairs',
      status: 'Low Stock',
      reorderPoint: 3000,
      lastUpdated: '2024-03-14',
      supplier: 'SafetyFirst Ltd.',
      location: 'Warehouse B',
      cost: 0.3
    },
    {
      id: 'EQP001',
      name: 'Stethoscope',
      category: 'Equipment',
      quantity: 45,
      unit: 'pieces',
      status: 'In Stock',
      reorderPoint: 10,
      lastUpdated: '2024-03-13',
      supplier: 'MedTech Inc.',
      location: 'Storage Room 1',
      cost: 80.0
    }
  ];

  // Chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Stock Level',
        data: [4000, 3500, 5000, 4500, 5500, 5000],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Stock Level Trend'
      }
    }
  };

  // Export functions
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Inventory Report', 20, 20);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    
    // Add table headers
    const headers = ['ID', 'Name', 'Category', 'Quantity', 'Status'];
    let y = 40;
    doc.setFontSize(10);
    
    // Add table content
    inventory.forEach((item, index) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      
      doc.text(item.id, 20, y);
      doc.text(item.name, 45, y);
      doc.text(item.category, 100, y);
      doc.text(item.quantity.toString(), 140, y);
      doc.text(item.status, 170, y);
      
      y += 10;
    });
    
    doc.save('inventory-report.pdf');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(inventory);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
    XLSX.writeFile(wb, 'inventory-report.xlsx');
  };

  // Add Item Form Component
  const AddItemForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      category: '',
      quantity: '',
      unit: '',
      reorderPoint: '',
      supplier: '',
      location: '',
      cost: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission
      console.log('Form submitted:', formData);
      setShowAddForm(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Add New Item</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="PPE">PPE</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Supplies">Supplies</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reorder Point
                </label>
                <input
                  type="number"
                  name="reorderPoint"
                  value={formData.reorderPoint}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier
                </label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost per Unit
                </label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Printer className="w-4 h-4 mr-2" />
            Export PDF
          </button>
          <button
            onClick={exportToExcel}
            className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-blue-600">
            <Package className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Total Items</h3>
          </div>
          <p className="text-2xl font-bold mt-2">7,545</p>
          <p className="text-sm text-gray-500">Across all categories</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-yellow-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Low Stock Items</h3>
          </div>
          <p className="text-2xl font-bold mt-2">12</p>
          <p className="text-sm text-gray-500">Below reorder point</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Out of Stock</h3>
          </div>
          <p className="text-2xl font-bold mt-2">3</p>
          <p className="text-sm text-gray-500">Needs immediate attention</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Stock Level Trend</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="PPE">PPE</option>
                <option value="Equipment">Equipment</option>
                <option value="Supplies">Supplies</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'In Stock' 
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-yellow-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">3 items are below reorder point</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Previous</button>
              <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Next</button>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && <AddItemForm />}
    </div>
  );
}

export default Inventory;