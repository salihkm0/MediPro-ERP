import React from 'react';
import { User, Calendar, Phone, Mail, MapPin, Droplet, HeartPulse, ClipboardList, AlertTriangle } from 'lucide-react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type EmergencyContact = {
  name: string;
  relationship: string;
  phone: string;
  priority: number;
};

type Insurance = {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  expiryDate: string;
};

type MedicalHistory = {
  condition: string;
  diagnosisDate: string;
  status: string;
  notes: string;
};

type Allergy = {
  name: string;
  reaction: string;
  severity: string;
};

type PatientFormData = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  bloodType: string;
  contact: {
    phone: string;
    email: string;
    address: Address;
  };
  emergencyContacts: EmergencyContact[];
  insurance: Insurance;
  medicalHistory: MedicalHistory[];
  allergies: Allergy[];
};

interface PatientFormProps {
  initialData?: Partial<PatientFormData>;
  onSave: (data: PatientFormData) => Promise<void> | void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ initialData, onSave, onCancel }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      bloodType: '',
      contact: {
        phone: '',
        email: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: '',
          country: '',
        },
      },
      emergencyContacts: [{ name: '', relationship: '', phone: '', priority: 1 }],
      insurance: {
        provider: '',
        policyNumber: '',
        groupNumber: '',
        expiryDate: '',
      },
      medicalHistory: [{ condition: '', diagnosisDate: '', status: '', notes: '' }],
      allergies: [{ name: '', reaction: '', severity: '' }],
    },
  });

  const {
    fields: emergencyContactFields,
    append: appendEmergencyContact,
    remove: removeEmergencyContact,
  } = useFieldArray({
    control,
    name: 'emergencyContacts',
  });

  const {
    fields: medicalHistoryFields,
    append: appendMedicalHistory,
    remove: removeMedicalHistory,
  } = useFieldArray({
    control,
    name: 'medicalHistory',
  });

  const {
    fields: allergyFields,
    append: appendAllergy,
    remove: removeAllergy,
  } = useFieldArray({
    control,
    name: 'allergies',
  });

  const onSubmit = async (data: PatientFormData) => {
    try {
      await onSave(data);
      toast.success('Patient record saved successfully!');
    } catch (error) {
      toast.error('Failed to save patient record. Please try again.');
      console.error('Error saving patient:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <User className="h-5 w-5 text-blue-600" />
        {initialData ? 'Edit Patient Record' : 'Register New Patient'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                {...register('lastName', { required: 'Last name is required' })}
                className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
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
              {errors.dob && (
                <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
              )}
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
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
              <div className="relative">
                <Droplet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select
                  {...register('bloodType')}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Phone className="h-4 w-4 text-blue-600" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="tel"
                  {...register('contact.phone', { required: 'Phone number is required' })}
                  className={`w-full pl-10 px-3 py-2 border ${errors.contact?.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.contact?.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.contact.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="email"
                  {...register('contact.email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`w-full pl-10 px-3 py-2 border ${errors.contact?.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.contact?.email && (
                <p className="mt-1 text-sm text-red-600">{errors.contact.email.message}</p>
              )}
            </div>
          </div>
          <h4 className="text-md font-medium text-gray-900 mt-6 mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            Address
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                {...register('contact.address.street')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                {...register('contact.address.city')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
              <input
                {...register('contact.address.state')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
              <input
                {...register('contact.address.zip')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                {...register('contact.address.country')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contacts Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-blue-600" />
            Emergency Contacts
          </h3>
          {emergencyContactFields.map((field, index) => (
            <div key={field.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-700">Contact #{index + 1}</h4>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEmergencyContact(index)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                  <input
                    {...register(`emergencyContacts.${index}.name`, {
                      required: index === 0 ? 'Emergency contact name is required' : false,
                    })}
                    className={`w-full px-3 py-2 border ${
                      errors.emergencyContacts?.[index]?.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.emergencyContacts?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.emergencyContacts[index]?.name?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship*</label>
                  <input
                    {...register(`emergencyContacts.${index}.relationship`, {
                      required: index === 0 ? 'Relationship is required' : false,
                    })}
                    className={`w-full px-3 py-2 border ${
                      errors.emergencyContacts?.[index]?.relationship ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.emergencyContacts?.[index]?.relationship && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.emergencyContacts[index]?.relationship?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                  <input
                    type="tel"
                    {...register(`emergencyContacts.${index}.phone`, {
                      required: index === 0 ? 'Phone number is required' : false,
                    })}
                    className={`w-full px-3 py-2 border ${
                      errors.emergencyContacts?.[index]?.phone ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.emergencyContacts?.[index]?.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.emergencyContacts[index]?.phone?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendEmergencyContact({ name: '', relationship: '', phone: '', priority: emergencyContactFields.length + 1 })}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            + Add Another Emergency Contact
          </button>
        </div>

        {/* Insurance Information Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-blue-600" />
            Insurance Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
              <input
                {...register('insurance.provider')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
              <input
                {...register('insurance.policyNumber')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Number</label>
              <input
                {...register('insurance.groupNumber')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                {...register('insurance.expiryDate')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Medical History Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-blue-600" />
            Medical History
          </h3>
          {medicalHistoryFields.map((field, index) => (
            <div key={field.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-700">Condition #{index + 1}</h4>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeMedicalHistory(index)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition*</label>
                  <input
                    {...register(`medicalHistory.${index}.condition`, {
                      required: index === 0 ? 'Condition is required' : false,
                    })}
                    className={`w-full px-3 py-2 border ${
                      errors.medicalHistory?.[index]?.condition ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.medicalHistory?.[index]?.condition && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.medicalHistory[index]?.condition?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis Date</label>
                  <input
                    type="date"
                    {...register(`medicalHistory.${index}.diagnosisDate`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    {...register(`medicalHistory.${index}.status`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Chronic">Chronic</option>
                    <option value="Controlled">Controlled</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    {...register(`medicalHistory.${index}.notes`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendMedicalHistory({ condition: '', diagnosisDate: '', status: '', notes: '' })}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            + Add Another Medical Condition
          </button>
        </div>

        {/* Allergies Section */}
        <div className="pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            Allergies
          </h3>
          {allergyFields.map((field, index) => (
            <div key={field.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-700">Allergy #{index + 1}</h4>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeAllergy(index)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allergen*</label>
                  <input
                    {...register(`allergies.${index}.name`, {
                      required: index === 0 ? 'Allergen is required' : false,
                    })}
                    className={`w-full px-3 py-2 border ${
                      errors.allergies?.[index]?.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.allergies?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.allergies[index]?.name?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reaction</label>
                  <input
                    {...register(`allergies.${index}.reaction`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select
                    {...register(`allergies.${index}.severity`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Severity</option>
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                    <option value="Life-threatening">Life-threatening</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendAllergy({ name: '', reaction: '', severity: '' })}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            + Add Another Allergy
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              'Saving...'
            ) : initialData ? (
              'Update Patient'
            ) : (
              'Register Patient'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;