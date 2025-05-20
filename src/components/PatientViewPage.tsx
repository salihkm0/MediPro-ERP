import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { 
  User, Calendar, Phone, Mail, MapPin, Droplet, HeartPulse, ClipboardList, 
  AlertTriangle, Stethoscope, Pill, Syringe, FileText, Clock, ChevronDown, ChevronUp
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Patient } from '../type';
import PrintableInvoice from './PrintableInvoiceProps';

const PatientViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showInvoice, setShowInvoice] = React.useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    personalInfo: true,
    contactInfo: true,
    medicalHistory: false,
    insurance: false,
    appointments: false,
    prescriptions: false
  });

  // Mock patient data - replace with actual API call
  const patient: Patient = {
    id: id || '12345',
    registrationId: 'OP NO.108',
    recNo: 'RecNo 930',
    firstName: 'John',
    lastName: 'Doe',
    dob: '1985-04-23',
    age: 38,
    gender: 'Male',
    bloodType: 'A+',
    mobileNo: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    medicalHistory: [
      {
        condition: 'Hypertension',
        diagnosisDate: '2018-03-15',
        status: 'Controlled',
        notes: 'On medication, last BP reading 120/80'
      },
      {
        condition: 'Type 2 Diabetes',
        diagnosisDate: '2020-07-22',
        status: 'Managed',
        notes: 'A1C at 6.2, following diet and exercise plan'
      }
    ],
    allergies: [
      {
        name: 'Penicillin',
        reaction: 'Rash',
        severity: 'Moderate'
      }
    ],
    insurance: {
      companyName: 'Blue Cross Blue Shield',
      policyCardId: 'BCBS123456789',
      tpaName: 'HealthCare TPA',
      periodFrom: '2023-01-01',
      periodTo: '2023-12-31'
    },
    appointments: [
      {
        id: '1',
        date: '2023-06-15',
        time: '10:30 AM',
        doctor: 'Dr. Smith',
        reason: 'Annual Checkup',
        status: 'Completed'
      },
      {
        id: '2',
        date: '2023-07-20',
        time: '2:15 PM',
        doctor: 'Dr. Johnson',
        reason: 'Follow-up on bloodwork',
        status: 'Scheduled'
      }
    ],
    prescriptions: [
      {
        id: '1',
        medication: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        prescribedDate: '2023-01-10',
        prescribedBy: 'Dr. Smith',
        status: 'Active'
      },
      {
        id: '2',
        medication: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        prescribedDate: '2023-01-10',
        prescribedBy: 'Dr. Smith',
        status: 'Active'
      }
    ],
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    },
    createdAt: '2023-05-18T13:39:00Z'
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Patient Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white text-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4">
                {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {patient.firstName} {patient.lastName}
                </h1>
                <p className="text-blue-100">
                  Patient ID: {patient.id} | {patient.gender}, {patient.age} years
                </p>
              </div>
            </div>
            <div className="bg-blue-700 rounded-lg p-3 text-sm">
              <div className="flex items-center">
                <HeartPulse className="mr-2" size={18} />
                <span>Blood Type: {patient.bloodType || 'Not specified'}</span>
              </div>
              <div className="flex items-center mt-1">
                <Calendar className="mr-2" size={18} />
                <span>Last Visit: {formatDate(patient.appointments[0]?.date)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Personal Information Section */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('personalInfo')}
            >
              <h2 className="text-xl font-semibold flex items-center">
                <User className="mr-2 text-blue-600" size={20} />
                Personal Information
              </h2>
              {expandedSections.personalInfo ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSections.personalInfo && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Registration ID</h3>
                  <p className="text-gray-900">{patient.registrationId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Record Number</h3>
                  <p className="text-gray-900">{patient.recNo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h3>
                  <p className="text-gray-900">{formatDate(patient.dob)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Gender</h3>
                  <p className="text-gray-900">{patient.gender}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Age</h3>
                  <p className="text-gray-900">{patient.age}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Created At</h3>
                  <p className="text-gray-900">{formatDateTime(patient.createdAt)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information Section */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('contactInfo')}
            >
              <h2 className="text-xl font-semibold flex items-center">
                <Phone className="mr-2 text-blue-600" size={20} />
                Contact Information
              </h2>
              {expandedSections.contactInfo ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSections.contactInfo && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
                  <p className="text-gray-900">{patient.mobileNo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                  <p className="text-gray-900">{patient.email}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                  <p className="text-gray-900">
                    {patient.address.street}<br />
                    {patient.address.city}, {patient.address.state} {patient.address.zip}<br />
                    {patient.address.country}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Emergency Contact</h3>
                  <p className="text-gray-900">
                    {patient.emergencyContact.name}<br />
                    {patient.emergencyContact.relationship}<br />
                    {patient.emergencyContact.phone}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Medical History Section */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('medicalHistory')}
            >
              <h2 className="text-xl font-semibold flex items-center">
                <ClipboardList className="mr-2 text-blue-600" size={20} />
                Medical History
              </h2>
              {expandedSections.medicalHistory ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSections.medicalHistory && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Conditions</h3>
                <div className="space-y-4">
                  {patient.medicalHistory.map((condition, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{condition.condition}</h4>
                          <p className="text-sm text-gray-500">
                            Diagnosed: {formatDate(condition.diagnosisDate)} | Status: {condition.status}
                          </p>
                        </div>
                      </div>
                      {condition.notes && (
                        <p className="mt-2 text-gray-700 text-sm">{condition.notes}</p>
                      )}
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Allergies</h3>
                {patient.allergies.length > 0 ? (
                  <div className="space-y-4">
                    {patient.allergies.map((allergy, index) => (
                      <div key={index} className="bg-red-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-red-900">{allergy.name}</h4>
                            <p className="text-sm text-red-700">
                              Reaction: {allergy.reaction} | Severity: {allergy.severity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No known allergies</p>
                )}
              </div>
            )}
          </div>

          {/* Insurance Information Section */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('insurance')}
            >
              <h2 className="text-xl font-semibold flex items-center">
                <FileText className="mr-2 text-blue-600" size={20} />
                Insurance Information
              </h2>
              {expandedSections.insurance ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSections.insurance && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Company Name</h3>
                  <p className="text-gray-900">{patient.insurance.companyName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Policy Card ID</h3>
                  <p className="text-gray-900">{patient.insurance.policyCardId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">TPA Name</h3>
                  <p className="text-gray-900">{patient.insurance.tpaName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Coverage Period</h3>
                  <p className="text-gray-900">
                    {formatDate(patient.insurance.periodFrom)} to {formatDate(patient.insurance.periodTo)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Appointments Section */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('appointments')}
            >
              <h2 className="text-xl font-semibold flex items-center">
                <Calendar className="mr-2 text-blue-600" size={20} />
                Appointments
              </h2>
              {expandedSections.appointments ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSections.appointments && (
              <div className="mt-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {patient.appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(appointment.date)}</div>
                            <div className="text-sm text-gray-500">{appointment.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{appointment.doctor}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{appointment.reason}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              appointment.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {appointment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Prescriptions Section */}
          <div className="mb-8">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('prescriptions')}
            >
              <h2 className="text-xl font-semibold flex items-center">
                <Pill className="mr-2 text-blue-600" size={20} />
                Prescriptions
              </h2>
              {expandedSections.prescriptions ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedSections.prescriptions && (
              <div className="mt-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescribed On</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">By</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {patient.prescriptions.map((prescription) => (
                        <tr key={prescription.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{prescription.medication}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{prescription.dosage}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{prescription.frequency}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(prescription.prescribedDate)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{prescription.prescribedBy}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              prescription.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {prescription.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
    <button 
      onClick={() => {
        setShowInvoice(true);
        setTimeout(handlePrint, 500); // Small delay to ensure component renders
      }}
      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50"
    >
      Print Invoice
    </button>
    <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700">
      Edit Patient
    </button>
  </div>
  {showInvoice && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-h-screen overflow-auto">
        <PrintableInvoice
          patient={patient} 
          onClose={() => setShowInvoice(false)} 
          ref={invoiceRef}
        />
      </div>
    </div>
  )}
      </div>
    </div>
  );
};

export default PatientViewPage;