import React from 'react';
import { Receipt, Search, Filter, Download, CreditCard } from 'lucide-react';

function Billing() {
  const bills = [
    {
      id: 'BILL001',
      patientName: 'John Doe',
      date: '2024-03-15',
      amount: 1500.00,
      type: 'Consultation',
      status: 'Paid'
    },
    {
      id: 'BILL002',
      patientName: 'Jane Smith',
      date: '2024-03-14',
      amount: 2500.00,
      type: 'Laboratory',
      status: 'Pending'
    },
    {
      id: 'BILL003',
      patientName: 'Robert Brown',
      date: '2024-03-13',
      amount: 5000.00,
      type: 'Surgery',
      status: 'Overdue'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Receipt className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Billing & Invoicing</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Bills
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-green-600 mb-2">
            <CreditCard className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Total Revenue</h3>
          </div>
          <p className="text-2xl font-bold">$9,000.00</p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-yellow-600 mb-2">
            <Receipt className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Pending Payments</h3>
          </div>
          <p className="text-2xl font-bold">$2,500.00</p>
          <p className="text-sm text-gray-500 mt-1">5 invoices</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-red-600 mb-2">
            <Receipt className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Overdue</h3>
          </div>
          <p className="text-2xl font-bold">$5,000.00</p>
          <p className="text-sm text-gray-500 mt-1">3 invoices</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bills..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bill.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${bill.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      bill.status === 'Paid' 
                        ? 'bg-green-100 text-green-800'
                        : bill.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800">View</button>
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

export default Billing;