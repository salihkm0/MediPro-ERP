import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  PlusCircle,
  Grid,
  List
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

const CalendarView = () => {
  const location = useLocation();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'agenda'>('week');

  // Get appointments from location state or initialize empty array
  useEffect(() => {
    if (location.state?.appointments) {
      setAppointments(location.state.appointments);
    }
  }, [location.state]);

  // Navigation functions
  const navigateDate = (direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(currentDate);
    
    switch (direction) {
      case 'prev':
        if (viewMode === 'day') newDate.setDate(newDate.getDate() - 1);
        if (viewMode === 'week') newDate.setDate(newDate.getDate() - 7);
        if (viewMode === 'month') newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'next':
        if (viewMode === 'day') newDate.setDate(newDate.getDate() + 1);
        if (viewMode === 'week') newDate.setDate(newDate.getDate() + 7);
        if (viewMode === 'month') newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'today':
        newDate.setTime(Date.now());
        break;
    }
    
    setCurrentDate(newDate);
  };

  // Filter appointments for the current view
  const getFilteredAppointments = () => {
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    if (viewMode === 'day') {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (viewMode === 'week') {
      startDate.setDate(startDate.getDate() - startDate.getDay());
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (viewMode === 'month') {
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

  // Render appointment blocks
  const renderAppointment = (appt: Appointment) => {
    const apptDate = new Date(`${appt.date}T${appt.time}`);
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

  // View renderers
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
              {hourAppts.map(renderAppointment)}
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
                {dayAppts.map(renderAppointment)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    // Simplified month view - would need more complex implementation
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

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Appointment Calendar</h1>
          <Link 
            to="/appointments/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            New Appointment
          </Link>
        </div>
      </div>

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
                ...(viewMode === 'day' && { day: 'numeric' })
              })}
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'day' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            >
              <CalendarIcon className="w-4 h-4 mr-1" /> Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'week' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'month' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('agenda')}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'agenda' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            >
              <List className="w-4 h-4 mr-1 inline" /> Agenda
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        {viewMode === 'day' && renderDayView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'agenda' && renderAgendaView()}
      </div>
    </div>
  );
};

export default CalendarView;