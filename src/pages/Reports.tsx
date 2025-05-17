import React from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';

function Reports() {
  const reports = [
    {
      id: 1,
      title: 'Monthly Patient Statistics',
      category: 'Patient Care',
      generatedDate: '2024-03-15',
      status: 'Generated'
    },
    {
      id: 2,
      title: 'Revenue Analysis Q1 2024',
      category: 'Financial',
      generatedDate: '2024-03-14',
      status: 'Processing'
    },
    {
      id: 3,
      title: 'Staff Performance Review',
      category: 'HR',
      generatedDate: '2024-03-13',
      status: 'Generated'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        </div>
        <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-blue-600">
            <TrendingUp className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Total Reports</h3>
          </div>
          <p className="text-2xl font-bold mt-2">156</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-green-600">
            <BarChart3 className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Generated Today</h3>
          </div>
          <p className="text-2xl font-bold mt-2">12</p>
          <p className="text-sm text-gray-500">+3 from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-yellow-600">
            <BarChart3 className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Pending Reports</h3>
          </div>
          <p className="text-2xl font-bold mt-2">5</p>
          <p className="text-sm text-gray-500">Processing</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Recent Reports</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.generatedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      report.status === 'Generated' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-800">Download</button>
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

export default Reports;