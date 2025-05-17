import React, { useState } from 'react';
import { Calendar, Clock, User, X, PlusCircle, ClipboardList, AlertCircle, Hash } from 'lucide-react';

function Appointments() {
  const [showForm, setShowForm] = useState(false);
  const [isExistingPatient, setIsExistingPatient] = useState(true);
  const [patients] = useState([
    { id: 1, name: 'John Doe', phone: '555-0101', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', phone: '555-0102', email: 'jane@example.com' },
    { id: 3, name: 'Robert Brown', phone: '555-0103', email: 'robert@example.com' },
  ]);

  const [doctors] = useState([
    { id: 1, name: 'Dr. Sarah Smith', specialization: 'Cardiology' },
    { id: 2, name: 'Dr. Michael Johnson', specialization: 'Neurology' },
    { id: 3, name: 'Dr. Emily Wilson', specialization: 'Pediatrics' },
  ]);

  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Smith',
      date: '2024-03-20',
      time: '09:00 AM',
      type: 'General Checkup',
      status: 'Scheduled'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctorName: 'Dr. Michael Johnson',
      date: '2024-03-20',
      time: '10:30 AM',
      type: 'Follow-up',
      status: 'In Progress'
    },
    {
      id: 3,
      patientName: 'Robert Brown',
      doctorName: 'Dr. Emily Wilson',
      date: '2024-03-20',
      time: '02:00 PM',
      type: 'Consultation',
      status: 'Completed'
    }
  ];

  const AppointmentForm = () => {
    const [formData, setFormData] = useState({
      patientType: 'existing',
      patientId: '',
      newPatientName: '',
      newPatientPhone: '',
      newPatientEmail: '',
      doctorId: '',
      date: '',
      time: '',
      type: 'General Checkup',
      priority: 'Normal',
      tokenNumber: generateTokenNumber(),
      notes: '',
      symptoms: '',
      previousHistory: false,
      referral: ''
    });

    function generateTokenNumber() {
      return Math.floor(1000 + Math.random() * 9000).toString();
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setShowForm(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handlePatientTypeChange = (type: string) => {
      setIsExistingPatient(type === 'existing');
      setFormData(prev => ({
        ...prev,
        patientType: type
      }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <ClipboardList className="w-5 h-5 mr-2 text-blue-600" />
              New Appointment
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Patient Information Section */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Patient Information
              </h3>
              
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => handlePatientTypeChange('existing')}
                  className={`px-4 py-2 rounded-md ${isExistingPatient ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  Existing Patient
                </button>
                <button
                  type="button"
                  onClick={() => handlePatientTypeChange('new')}
                  className={`px-4 py-2 rounded-md ${!isExistingPatient ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  New Patient
                </button>
              </div>

              {isExistingPatient ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Patient*
                  </label>
                  <select
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} ({patient.phone})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      name="newPatientName"
                      value={formData.newPatientName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={!isExistingPatient}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      name="newPatientPhone"
                      value={formData.newPatientPhone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={!isExistingPatient}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="newPatientEmail"
                      value={formData.newPatientEmail}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Appointment Details Section */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Appointment Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Doctor*
                  </label>
                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} ({doctor.specialization})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Token Number
                  </label>
                  <div className="flex items-center">
                    <Hash className="w-4 h-4 mr-2 text-gray-400" />
                    <input
                      type="text"
                      name="tokenNumber"
                      value={formData.tokenNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date*
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time*
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Type*
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="General Checkup">General Checkup</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Procedure">Procedure</option>
                    <option value="Test">Test</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority*
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
                Medical Information
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Symptoms
                  </label>
                  <textarea
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the patient's symptoms"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="previousHistory"
                    id="previousHistory"
                    checked={formData.previousHistory}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      previousHistory: e.target.checked
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="previousHistory" className="ml-2 block text-sm text-gray-700">
                    Previous history with this condition
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Referral (if any)
                  </label>
                  <input
                    type="text"
                    name="referral"
                    value={formData.referral}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Referring doctor or clinic"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any additional information about the appointment"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Schedule Appointment
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
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-blue-600">
            <Calendar className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Today's Schedule</h3>
          </div>
          <p className="text-2xl font-bold mt-2">8 Appointments</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-green-600">
            <Clock className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">Completed Today</h3>
          </div>
          <p className="text-2xl font-bold mt-2">3 Appointments</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center text-purple-600">
            <User className="w-5 h-5 mr-2" />
            <h3 className="font-semibold">New Patients</h3>
          </div>
          <p className="text-2xl font-bold mt-2">2 Patients</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.doctorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      appointment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
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
      {showForm && <AppointmentForm />}
    </div>
  );
}

export default Appointments;