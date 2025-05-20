import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  PlusCircle,
  Grid,
  List,
  Clock,
  User,
  X,
  ClipboardList,
  AlertCircle,
  Hash,
  CheckCircle
} from 'lucide-react';

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  endTime?: string;
  type: string;
  status: string;
}

const AppointmentsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isExistingPatient, setIsExistingPatient] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [calendarViewMode, setCalendarViewMode] = useState<'day' | 'week' | 'month' | 'agenda'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample data
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

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Smith',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      type: 'General Checkup',
      status: 'Scheduled'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctorName: 'Dr. Michael Johnson',
      date: new Date().toISOString().split('T')[0],
      time: '10:30',
      type: 'Follow-up',
      status: 'Waiting'
    },
    {
      id: 3,
      patientName: 'Robert Brown',
      doctorName: 'Dr. Emily Wilson',
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
      time: '14:00',
      type: 'Consultation',
      status: 'Engaged'
    },
    {
      id: 4,
      patientName: 'Alice Johnson',
      doctorName: 'Dr. Sarah Smith',
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
      time: '11:15',
      type: 'Procedure',
      status: 'Done'
    },
  ]);

  const statusOptions = ['Scheduled', 'Waiting', 'Engaged', 'Done'];

  // Calendar navigation functions
  const navigateDate = (direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(currentDate);
    
    switch (direction) {
      case 'prev':
        if (calendarViewMode === 'day') newDate.setDate(newDate.getDate() - 1);
        if (calendarViewMode === 'week') newDate.setDate(newDate.getDate() - 7);
        if (calendarViewMode === 'month') newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'next':
        if (calendarViewMode === 'day') newDate.setDate(newDate.getDate() + 1);
        if (calendarViewMode === 'week') newDate.setDate(newDate.getDate() + 7);
        if (calendarViewMode === 'month') newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'today':
        newDate.setTime(Date.now());
        break;
    }
    
    setCurrentDate(newDate);
  };

  // Filter appointments for calendar views
  const getFilteredAppointments = () => {
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    if (calendarViewMode === 'day') {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (calendarViewMode === 'week') {
      startDate.setDate(startDate.getDate() - startDate.getDay());
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (calendarViewMode === 'month') {
      startDate.setDate(1);
      endDate.setMonth(startDate.getMonth() + 1);
      endDate.setDate(0);
      endDate.setHours(23, 59, 59, 999);
    }

    return appointments.filter(appt => {
      const apptDate = new Date(`${appt.date}T${appt.time}`);
      return apptDate >= startDate && apptDate <= endDate;
    });
  };

  // Update appointment status
  const updateStatus = (id: number, newStatus: string) => {
    setAppointments(prev => 
      prev.map(appt => 
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  // Appointment Form Component
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
          {/* Form content remains the same as before */}
          {/* ... */}
        </div>
      </div>
    );
  };

  // Status Card Component for List View
  const StatusCard = ({ status, appointments }: { status: string, appointments: Appointment[] }) => {
    const statusColors = {
      Scheduled: 'bg-blue-100 text-blue-800',
      Waiting: 'bg-yellow-100 text-yellow-800',
      Engaged: 'bg-orange-100 text-orange-800',
      Done: 'bg-green-100 text-green-800'
    };

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-medium flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 ${
              status === 'Scheduled' ? 'bg-blue-500' :
              status === 'Waiting' ? 'bg-yellow-500' :
              status === 'Engaged' ? 'bg-orange-500' : 'bg-green-500'
            }`}></span>
            {status} ({appointments.length})
          </h3>
        </div>
        <div className="divide-y">
          {appointments.length > 0 ? (
            appointments.map(appointment => (
              <div key={appointment.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-gray-500">{appointment.doctorName}</p>
                    <p className="text-sm mt-1">
                      <span className="text-gray-500">{appointment.time}</span> • {appointment.type}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {status !== 'Done' && (
                      <button 
                        onClick={() => {
                          const currentIndex = statusOptions.indexOf(appointment.status);
                          if (currentIndex < statusOptions.length - 1) {
                            updateStatus(appointment.id, statusOptions[currentIndex + 1]);
                          }
                        }}
                        className="p-1 rounded-full hover:bg-gray-100"
                        title="Move to next status"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
                    {status === 'Done' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No {status.toLowerCase()} appointments
            </div>
          )}
        </div>
      </div>
    );
  };

  // Calendar View Components
  const renderAppointmentBlock = (appt: Appointment) => {
    const statusColors = {
      Scheduled: 'bg-blue-100 border-blue-200 text-blue-800',
      Waiting: 'bg-yellow-100 border-yellow-200 text-yellow-800',
      Engaged: 'bg-orange-100 border-orange-200 text-orange-800',
      Done: 'bg-green-100 border-green-200 text-green-800'
    };

    return (
      <div 
        key={appt.id}
        className={`p-2 mb-1 rounded border ${statusColors[appt.status as keyof typeof statusColors]}`}
      >
        <div className="font-medium">{appt.patientName}</div>
        <div className="text-sm">{appt.time} - {appt.doctorName}</div>
        <div className="text-xs">{appt.type}</div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const filteredAppts = getFilteredAppointments();

    return (
      <div className="grid grid-cols-1">
        {hours.map(hour => {
          const hourAppts = filteredAppts.filter(appt => {
            return parseInt(appt.time.split(':')[0]) === hour;
          });

          return (
            <div key={hour} className="border-b border-gray-200 min-h-16 p-1">
              <div className="text-xs text-gray-500 mb-1">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              {hourAppts.map(renderAppointmentBlock)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const filteredAppts = getFilteredAppointments();

    return (
      <div className="grid grid-cols-7">
        {days.map((day, dayIndex) => {
          const date = new Date(currentDate);
          date.setDate(date.getDate() - date.getDay() + dayIndex);
          const dateStr = date.toISOString().split('T')[0];
          const dayAppts = filteredAppts.filter(appt => appt.date === dateStr);

          return (
            <div key={day} className="border-r border-gray-200 last:border-r-0">
              <div className="p-2 border-b border-gray-200 text-center font-medium">
                {day}<br />
                <span className={`text-sm ${
                  date.toDateString() === new Date().toDateString() 
                    ? 'bg-blue-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center'
                    : ''
                }`}>
                  {date.getDate()}
                </span>
              </div>
              <div className="p-1 h-96 overflow-y-auto">
                {dayAppts.map(renderAppointmentBlock)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    return (
      <div className="text-center p-4">
        <p>Month view would show a traditional calendar grid here</p>
        <p>Showing {getFilteredAppointments().length} appointments this month</p>
      </div>
    );
  };

  const renderAgendaView = () => {
    const filteredAppts = getFilteredAppointments().sort((a, b) => {
      return new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime();
    });

    return (
      <div className="space-y-2">
        {filteredAppts.map(appt => (
          <div key={appt.id} className="border-b border-gray-200 pb-2">
            <div className="font-medium">{appt.patientName}</div>
            <div className="text-sm">
              {new Date(`${appt.date}T${appt.time}`).toLocaleString()} - {appt.doctorName}
            </div>
            <div className="text-xs">{appt.type} • {appt.status}</div>
          </div>
        ))}
      </div>
    );
  };

  // Main render
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center"
          >
            {viewMode === 'list' ? (
              <>
                <CalendarIcon className="w-5 h-5 mr-2" />
                Calendar View
              </>
            ) : (
              <>
                <List className="w-5 h-5 mr-2" />
                List View
              </>
            )}
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            New Appointment
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statusOptions.map(status => (
              <StatusCard 
                key={status}
                status={status}
                appointments={appointments.filter(a => a.status === status)}
              />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
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
                        <select
                          value={appointment.status}
                          onChange={(e) => updateStatus(appointment.id, e.target.value)}
                          className={`px-2 py-1 text-xs rounded-full border ${
                            appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            appointment.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            appointment.status === 'Engaged' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                            'bg-green-100 text-green-800 border-green-200'
                          }`}
                        >
                          {statusOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4">
          {/* Calendar Controls */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateDate('today')}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  Today
                </button>
                <div className="flex items-center">
                  <button
                    onClick={() => navigateDate('prev')}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigateDate('next')}
                    className="p-1 rounded-full hover:bg-gray-100 ml-2"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold">
                  {currentDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric',
                    ...(calendarViewMode === 'day' && { day: 'numeric' })
                  })}
                </h2>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCalendarViewMode('day')}
                  className={`px-3 py-1 rounded-md text-sm flex items-center ${calendarViewMode === 'day' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  <CalendarIcon className="w-4 h-4 mr-1" /> Day
                </button>
                <button
                  onClick={() => setCalendarViewMode('week')}
                  className={`px-3 py-1 rounded-md text-sm ${calendarViewMode === 'week' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  Week
                </button>
                <button
                  onClick={() => setCalendarViewMode('month')}
                  className={`px-3 py-1 rounded-md text-sm ${calendarViewMode === 'month' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  Month
                </button>
                <button
                  onClick={() => setCalendarViewMode('agenda')}
                  className={`px-3 py-1 rounded-md text-sm ${calendarViewMode === 'agenda' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  <List className="w-4 h-4 mr-1 inline" /> Agenda
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Content */}
          <div className="flex-1 overflow-auto p-4 bg-gray-50">
            {calendarViewMode === 'day' && renderDayView()}
            {calendarViewMode === 'week' && renderWeekView()}
            {calendarViewMode === 'month' && renderMonthView()}
            {calendarViewMode === 'agenda' && renderAgendaView()}
          </div>
        </div>
      )}

      {showForm && <AppointmentForm />}
    </div>
  );
};

export default AppointmentsPage;