import React, { useState } from 'react';
import { UserCog, Search, Plus, Mail, Phone, X, User, Briefcase, ClipboardList, Smartphone, Home, Calendar, Shield, HeartPulse } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type StaffFormData = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  role: string;
  qualification: string;
  joiningDate: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  permissions: string[];
};

const departments = [
  'Medical',
  'Nursing',
  'Administrative',
  'Laboratory',
  'Pharmacy',
  'Radiology',
  'Housekeeping',
  'Security'
];

const roles = {
  Medical: ['Doctor', 'Surgeon', 'Resident', 'Intern'],
  Nursing: ['Head Nurse', 'Nurse', 'Nurse Practitioner'],
  Administrative: ['Manager', 'Receptionist', 'Billing Specialist'],
  Laboratory: ['Lab Technician', 'Pathologist'],
  Pharmacy: ['Pharmacist', 'Pharmacy Technician'],
  Radiology: ['Radiologist', 'Radiology Technician'],
  Housekeeping: ['Supervisor', 'Staff'],
  Security: ['Officer', 'Supervisor']
};

const permissionOptions = [
  'Patient Records',
  'Appointment Scheduling',
  'Billing',
  'Prescription',
  'Lab Results',
  'Inventory',
  'Admin Dashboard'
];

const StaffFormModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (data: StaffFormData) => Promise<void> }) => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<StaffFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedDepartment = watch('department');

  const handleFormSubmit = async (data: StaffFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast.success('Staff member added successfully!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to add staff member. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Add New Staff Member
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User className="h-4 w-4 mr-2 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="date"
                    {...register('dob', { required: 'Date of birth is required' })}
                    className={`w-full pl-10 px-3 py-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                <select
                  {...register('gender', { required: 'Gender is required' })}
                  className={`w-full px-3 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Smartphone className="h-4 w-4 mr-2 text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`w-full pl-10 px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9+\- ]+$/,
                        message: 'Invalid phone number'
                      }
                    })}
                    className={`w-full pl-10 px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    {...register('address', { required: 'Address is required' })}
                    className={`w-full pl-10 px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
                <select
                  {...register('department', { required: 'Department is required' })}
                  className={`w-full px-3 py-2 border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
                <select
                  {...register('role', { required: 'Role is required' })}
                  className={`w-full px-3 py-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  disabled={!selectedDepartment}
                >
                  <option value="">Select Role</option>
                  {selectedDepartment && roles[selectedDepartment as keyof typeof roles]?.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification*</label>
                <input
                  {...register('qualification', { required: 'Qualification is required' })}
                  className={`w-full px-3 py-2 border ${errors.qualification ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.qualification && <p className="mt-1 text-sm text-red-600">{errors.qualification.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date*</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="date"
                    {...register('joiningDate', { required: 'Joining date is required' })}
                    className={`w-full pl-10 px-3 py-2 border ${errors.joiningDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.joiningDate && <p className="mt-1 text-sm text-red-600">{errors.joiningDate.message}</p>}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <HeartPulse className="h-4 w-4 mr-2 text-blue-600" />
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                <input
                  {...register('emergencyContact.name', { required: 'Emergency contact name is required' })}
                  className={`w-full px-3 py-2 border ${errors.emergencyContact?.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.emergencyContact?.name && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship*</label>
                <input
                  {...register('emergencyContact.relationship', { required: 'Relationship is required' })}
                  className={`w-full px-3 py-2 border ${errors.emergencyContact?.relationship ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.emergencyContact?.relationship && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.relationship.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="tel"
                    {...register('emergencyContact.phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9+\- ]+$/,
                        message: 'Invalid phone number'
                      }
                    })}
                    className={`w-full pl-10 px-3 py-2 border ${errors.emergencyContact?.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.emergencyContact?.phone && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.phone.message}</p>}
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-blue-600" />
              System Permissions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {permissionOptions.map(permission => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`permission-${permission}`}
                    value={permission}
                    {...register('permissions')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`permission-${permission}`} className="ml-2 block text-sm text-gray-700">
                    {permission}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Staff Member
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Staff() {
  const [showForm, setShowForm] = useState(false);

  const handleAddStaff = async (data: StaffFormData) => {
    // Here you would typically call your API to add the staff member
    console.log('Adding staff member:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <UserCog className="w-8 h-8 mr-3 text-blue-600" />
          Staff Management
        </h1>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Staff Member
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search staff..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="ml-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Departments</option>
            <option value="medical">Medical</option>
            <option value="nursing">Nursing</option>
            <option value="admin">Administrative</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Contact</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: 'Dr. Sarah Wilson',
                  department: 'Medical',
                  role: 'Senior Doctor',
                  email: 'sarah.wilson@hospital.com',
                  phone: '+1 234 567 890',
                  status: 'Active'
                },
                {
                  name: 'John Smith',
                  department: 'Nursing',
                  role: 'Head Nurse',
                  email: 'john.smith@hospital.com',
                  phone: '+1 234 567 891',
                  status: 'Active'
                },
                {
                  name: 'Emily Brown',
                  department: 'Administrative',
                  role: 'Receptionist',
                  email: 'emily.brown@hospital.com',
                  phone: '+1 234 567 892',
                  status: 'On Leave'
                }
              ].map((staff, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{staff.name}</td>
                  <td className="py-3 px-4">{staff.department}</td>
                  <td className="py-3 px-4">{staff.role}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{staff.email}</span>
                      <Phone className="w-4 h-4 text-gray-400 ml-2" />
                      <span className="text-sm">{staff.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      staff.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <StaffFormModal 
          onClose={() => setShowForm(false)} 
          onSubmit={handleAddStaff} 
        />
      )}
    </div>
  );
}

export default Staff;