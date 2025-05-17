import React from 'react';
import { 
  Users, Calendar, Bed, Activity, Clock, Plus, Stethoscope, Pill, 
  AlertCircle, TrendingUp, FileText, Bell, HeartPulse, Syringe, 
  ClipboardList, UserCog, Thermometer
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function StatCard({ icon: Icon, label, value, color, trend, description }: { 
  icon: any, 
  label: string, 
  value: string, 
  color: string,
  trend?: { value: string, direction: 'up' | 'down' },
  description?: string
}) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={`p-2 sm:p-3 rounded-full ${color} bg-opacity-10 mr-3 sm:mr-4`}>
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
          </div>
          <div>
            <h3 className="text-gray-500 text-xs sm:text-sm">{label}</h3>
            <p className="text-xl sm:text-2xl font-semibold">{value}</p>
            {description && <p className="text-xs text-gray-400 mt-1 hidden sm:block">{description}</p>}
          </div>
        </div>
        {trend && (
          <span className={`text-xs sm:text-sm flex items-center ${trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}

const PatientFlowChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Patients',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Day of Week',
        },
      },
    },
  };

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = {
    labels,
    datasets: [
      {
        label: 'New Patients',
        data: [12, 19, 15, 23, 18, 10, 8],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      {
        label: 'Discharged',
        data: [8, 12, 10, 15, 13, 5, 4],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

const PatientDemographicsChart = () => {
  const data = {
    labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
    datasets: [
      {
        label: 'Patients by Age',
        data: [120, 450, 320, 280, 180],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} options={{ maintainAspectRatio: false }} />;
};

const DepartmentDistributionChart = () => {
  const data = {
    labels: ['Cardiology', 'Pediatrics', 'Neurology', 'Orthopedics', 'Emergency'],
    datasets: [
      {
        label: 'Patients by Department',
        data: [320, 280, 240, 180, 150],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} options={{ maintainAspectRatio: false }} />;
};

const PatientHealthTrendsChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Cases',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Hypertension',
        data: [65, 59, 80, 81, 76, 72, 85],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Diabetes',
        data: [28, 48, 40, 39, 46, 52, 60],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Respiratory',
        data: [45, 25, 35, 51, 44, 36, 30],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

function Dashboard() {
  const recentAlerts = [
    { id: 1, type: 'critical', patient: 'John Smith', message: 'Critical lab results', time: '10 min ago', icon: AlertCircle },
    { id: 2, type: 'medication', patient: 'Sarah Johnson', message: 'Medication overdue', time: '25 min ago', icon: Pill },
    { id: 3, type: 'appointment', patient: 'Michael Brown', message: 'Missed appointment', time: '1 hour ago', icon: Clock },
  ];

  const staffOnDuty = [
    { id: 1, name: 'Dr. Emily Wilson', role: 'Cardiologist', status: 'active', patients: 12, avatar: 'EW' },
    { id: 2, name: 'Dr. James Peterson', role: 'Neurologist', status: 'active', patients: 8, avatar: 'JP' },
    { id: 3, name: 'Dr. Sarah Lee', role: 'Pediatrician', status: 'on break', patients: 5, avatar: 'SL' },
    { id: 4, name: 'Nurse Angela White', role: 'Head Nurse', status: 'active', patients: 18, avatar: 'AW' },
  ];

  const recentPatients = [
    { id: 1, name: 'Robert Johnson', status: 'inpatient', room: '204B', admission: '2 days ago', condition: 'stable', age: 45 },
    { id: 2, name: 'Maria Garcia', status: 'outpatient', admission: '1 day ago', condition: 'improving', age: 32 },
    { id: 3, name: 'David Kim', status: 'inpatient', room: '112A', admission: '3 days ago', condition: 'critical', age: 58 },
    { id: 4, name: 'Lisa Chen', status: 'outpatient', admission: '5 hours ago', condition: 'stable', age: 28 },
  ];

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Smith', patient: 'John Doe', time: '09:00 AM', date: 'Today', type: 'Follow-up' },
    { id: 2, doctor: 'Dr. Johnson', patient: 'Sarah Miller', time: '10:30 AM', date: 'Today', type: 'Consultation' },
    { id: 3, doctor: 'Dr. Williams', patient: 'Michael Brown', time: '01:15 PM', date: 'Today', type: 'Procedure' },
    { id: 4, doctor: 'Dr. Lee', patient: 'Emily Davis', time: '09:30 AM', date: 'Tomorrow', type: 'Check-up' },
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Hospital Dashboard</h1>
          <p className="text-gray-500 text-sm sm:text-base">Overview of hospital operations and patient care</p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
          <button className="flex items-center bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full justify-center sm:w-auto">
            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
            New Patient
          </button>
          <div className="relative">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          icon={Users}
          label="Total Patients"
          value="1,234"
          color="text-blue-600"
          trend={{ value: '12%', direction: 'up' }}
          description="1,024 active, 210 discharged"
        />
        <StatCard
          icon={Calendar}
          label="Today's Appointments"
          value="48"
          color="text-green-600"
          trend={{ value: '3%', direction: 'down' }}
          description="32 completed, 16 pending"
        />
        <StatCard
          icon={Bed}
          label="Bed Occupancy"
          value="81%"
          color="text-purple-600"
          description="97/120 beds occupied"
        />
        <StatCard
          icon={Activity}
          label="Critical Cases"
          value="7"
          color="text-red-600"
          trend={{ value: '2 more', direction: 'up' }}
          description="3 in ICU, 4 in HDU"
        />
      </div>

      {/* Charts Section - Hidden on mobile */}
      <div className="hidden sm:block">
        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Patient Flow Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-semibold">Weekly Patient Flow</h2>
              <select className="bg-gray-100 border border-gray-300 rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-64 sm:h-80">
              <PatientFlowChart />
            </div>
          </div>

          {/* Patient Demographics */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-semibold">Patient Demographics</h2>
              <select className="bg-gray-100 border border-gray-300 rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <option>By Age</option>
                <option>By Gender</option>
                <option>By Insurance</option>
              </select>
            </div>
            <div className="h-64 sm:h-80">
              <PatientDemographicsChart />
            </div>
          </div>
        </div>

        {/* Secondary Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Department Distribution */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-semibold">Department Distribution</h2>
              <select className="bg-gray-100 border border-gray-300 rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <option>Current Month</option>
                <option>Last Month</option>
                <option>Last Quarter</option>
              </select>
            </div>
            <div className="h-64 sm:h-80">
              <DepartmentDistributionChart />
            </div>
          </div>

          {/* Health Trends */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-semibold">Health Condition Trends</h2>
              <select className="bg-gray-100 border border-gray-300 rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <option>Last 7 Months</option>
                <option>Last 12 Months</option>
                <option>Last 3 Years</option>
              </select>
            </div>
            <div className="h-64 sm:h-80">
              <PatientHealthTrendsChart />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts and Staff Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Alerts Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Recent Alerts</h2>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">3 New</span>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="flex items-start p-2 sm:p-3 rounded-lg border border-red-100 bg-red-50">
                <div className={`p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 ${alert.type === 'critical' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  <alert.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">{alert.patient}</p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{alert.message}</p>
                </div>
                <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Recent Admissions</h2>
            <button className="text-blue-600 text-xs sm:text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentPatients.map(patient => (
              <div key={patient.id} className="flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center min-w-0">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center 
                    ${patient.condition === 'critical' ? 'bg-red-100 text-red-600' : 
                       patient.condition === 'stable' ? 'bg-green-100 text-green-600' : 
                       'bg-blue-100 text-blue-600'} text-sm sm:text-base`}>
                    {patient.name.charAt(0)}
                  </div>
                  <div className="ml-2 sm:ml-4 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{patient.name}</p>
                    <div className="flex space-x-1 sm:space-x-2 mt-0.5">
                      <span className={`text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded 
                        ${patient.status === 'inpatient' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                        {patient.status}
                      </span>
                      {patient.room && <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">Room {patient.room}</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <p className="text-xs sm:text-sm font-medium whitespace-nowrap">{patient.admission}</p>
                  <p className="text-xs text-gray-500 whitespace-nowrap">Age: {patient.age}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff On Duty */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Staff On Duty</h2>
            <button className="text-blue-600 text-xs sm:text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {staffOnDuty.map(staff => (
              <div key={staff.id} className="flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center min-w-0">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center 
                    ${staff.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'} text-sm sm:text-base`}>
                    {staff.avatar}
                  </div>
                  <div className="ml-2 sm:ml-4 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{staff.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{staff.role}</p>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <p className="text-xs sm:text-sm font-medium whitespace-nowrap">{staff.patients} patients</p>
                  <p className={`text-xs ${staff.status === 'active' ? 'text-green-500' : 'text-yellow-500'} whitespace-nowrap`}>
                    {staff.status === 'active' ? 'Active' : 'On break'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments and Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Upcoming Appointments</h2>
            <button className="text-blue-600 text-xs sm:text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {upcomingAppointments.map(appt => (
              <div key={appt.id} className="flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="ml-2 sm:ml-4 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{appt.doctor}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{appt.patient} • {appt.type}</p>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <p className="text-xs sm:text-sm font-medium text-blue-600 whitespace-nowrap">{appt.time}</p>
                  <p className="text-xs text-gray-500 whitespace-nowrap">{appt.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-3 sm:space-y-4">
            {[
              { id: 1, icon: ClipboardList, action: 'Patient admission', details: 'John Doe admitted to Ward A', time: '10:30 AM', staff: 'Dr. Smith' },
              { id: 2, icon: Syringe, action: 'Lab results', details: 'Blood test results for Sarah Johnson', time: '09:45 AM', staff: 'Nurse White' },
              { id: 3, icon: Pill, action: 'Prescription', details: 'Medication prescribed for Michael Brown', time: 'Yesterday', staff: 'Dr. Lee' },
              { id: 4, icon: HeartPulse, action: 'Discharge', details: 'Patient Emily Davis discharged', time: 'Yesterday', staff: 'Dr. Wilson' },
            ].map(activity => (
              <div key={activity.id} className="flex items-start p-2 sm:p-3 border-b border-gray-100 last:border-0">
                <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                  <activity.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">{activity.action}</p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{activity.details}</p>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                    <span className="text-xs text-gray-500 truncate ml-2">By {activity.staff}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;