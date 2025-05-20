// components/PrintableInvoice.tsx
import React from 'react';
import { Patient } from '../types';

interface PrintableInvoiceProps {
  patient: Patient;
  onClose: () => void;
}

const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({ patient, onClose }) => {
  return (
    <div className="p-6 bg-white" style={{ width: '210mm', height: '297mm' }}>
      {/* Clinic Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">DEMO CLINIC</h1>
        <div className="border-t-2 border-b-2 border-gray-300 py-2">
          <h2 className="text-xl font-semibold">Invoice</h2>
        </div>
      </div>

      {/* Patient Information */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-semibold">Registration Id: {patient.registrationId}</p>
            <p><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
            <p><span className="font-semibold">Bill No:</span> INV{Math.floor(1000 + Math.random() * 9000)}</p>
          </div>
          <div>
            <p><span className="font-semibold">Time:</span> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p><span className="font-semibold">Patient Name:</span> {patient.firstName} {patient.lastName}</p>
            <p><span className="font-semibold">Age/Sex:</span> {patient.age}/{patient.gender}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p><span className="font-semibold">Consultant:</span> Dr. {patient.appointments[0]?.doctor || 'Not specified'}</p>
          </div>
          <div>
            <p><span className="font-semibold">Mobile No:</span> {patient.mobileNo || '--'}</p>
          </div>
          <div>
            <p><span className="font-semibold">Department:</span> --</p>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Product name</th>
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">QtyPrice</th>
              <th className="border border-gray-300 p-2">Discount</th>
              <th className="border border-gray-300 p-2">Tax</th>
              <th className="border border-gray-300 p-2">SGST</th>
              <th className="border border-gray-300 p-2">CGST</th>
              <th className="border border-gray-300 p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Consultation Fee</td>
              <td className="border border-gray-300 p-2 text-center">1</td>
              <td className="border border-gray-300 p-2 text-center">500</td>
              <td className="border border-gray-300 p-2 text-center">0</td>
              <td className="border border-gray-300 p-2 text-center">0</td>
              <td className="border border-gray-300 p-2 text-center">0</td>
              <td className="border border-gray-300 p-2 text-center">0</td>
              <td className="border border-gray-300 p-2 text-center">500</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Total: 500.00</p>
          <p className="font-semibold">Discount: 0.00</p>
        </div>
        <div>
          <p className="font-semibold">Due Amount: 500.00</p>
          <p className="font-semibold">Received Amount: 0.00</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-sm">RIMBERIOFRADEL AND SPIES CO</p>
        <p className="text-sm">WWW.REALLYGREATSITE.COM</p>
        <p className="text-sm">HELLOGREALLYGREATSITE.COM</p>
        <p className="text-sm">+123-456-7890</p>
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PrintableInvoice;