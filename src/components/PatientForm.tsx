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
};

type Insurance = {
  companyName: string;
  policyCardId: string;
  tpaName: string;
  periodFrom: string;
  periodTo: string;
};

type MedicalHistory = {
  condition: string;
  medication: string;
  medicalReport: boolean;
  hxOperation: boolean;
  expectation: string;
};

type PatientFormData = {
  registrationId: string;
  patientName: string;
  recNo: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  email: string;
  state: string;
  city: string;
  locality: string;
  zip: string;
  address: string;
  dob: string;
  age: string;
  phoneNumber: string;
  opNumber: string;
  gender: string;
  country: string;
  residentId: string;
  medicalHistory: string;
  patientRemarks: string;
  medicalConditions: string;
  patientGroup: string;
  fee: string;
  consultationFee: string;
  type: string;
  underMedication: boolean;
  pregnant: boolean;
  referredBy: string;
  photo: FileList;
  specialization: string;
  insurance: Insurance;
  medicalHistoryDetails: MedicalHistory;
  emergencyContact: EmergencyContact;
  married: boolean;
  vaccination: string;
  parentId: string;
  generalHistory: string;
  nationalId: string;
  hasAllergy: boolean;
  test: string;
  department: string;
  ipNo: string;
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
      registrationId: 'OP NO.108',
      recNo: 'RecNo 930',
      country: 'India',
      underMedication: false,
      pregnant: false,
      medicalReport: false,
      hxOperation: false,
      married: false,
      hasAllergy: false,
    },
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">New Patient</h2>
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
        >
          With Patient
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Info</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Id</label>
              <input
                {...register('registrationId')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <select
                {...register('patientName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option>Please select option</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rec No</label>
              <input
                {...register('recNo')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                {...register('firstName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                {...register('lastName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No</label>
              <input
                {...register('mobileNo')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                {...register('email')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                {...register('state')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                {...register('city')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
              <input
                {...register('locality')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip</label>
              <input
                {...register('zip')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                {...register('address')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                {...register('dob')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                {...register('age')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                {...register('phoneNumber')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OP Number</label>
              <input
                {...register('opNumber')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                {...register('gender')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                {...register('country')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resident Id no</label>
              <input
                {...register('residentId')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Medical History Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Medical History</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
              <input
                {...register('medicalHistory')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient remarks</label>
              <input
                {...register('patientRemarks')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical conditions</label>
              <input
                {...register('medicalConditions')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Group</label>
              <input
                {...register('patientGroup')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fee</label>
              <select
                {...register('fee')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option>Please select</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consultation fee</label>
              <input
                {...register('consultationFee')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                {...register('type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option>Please select option</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient under any medication</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('underMedication')}
                    value="true"
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('underMedication')}
                    value="false"
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Are you pregnant</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('pregnant')}
                    value="true"
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('pregnant')}
                    value="false"
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Other Info Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Other Info</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Referred By</label>
              <select
                {...register('referredBy')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option>--Select--</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
              <div className="flex items-center">
                <input
                  type="file"
                  {...register('photo')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <span className="ml-2 text-sm text-gray-500">No: IL_oven</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <input
                {...register('specialization')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
            <input
              value="2025-05-18 13:39"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {/* Insurance Details Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Insurance Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                {...register('insurance.companyName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Policy Card Id Number</label>
              <input
                {...register('insurance.policyCardId')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TPA Name</label>
              <input
                {...register('insurance.tpaName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period From</label>
              <input
                type="date"
                {...register('insurance.periodFrom')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period To</label>
              <input
                type="date"
                {...register('insurance.periodTo')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Illness</label>
              <input
                {...register('medicalHistoryDetails.condition')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Present Medication Intake</label>
              <input
                {...register('medicalHistoryDetails.medication')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical Report + MRI/CT/XRAY</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('medicalHistoryDetails.medicalReport')}
                    value="true"
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('medicalHistoryDetails.medicalReport')}
                    value="false"
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hx Operation</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('medicalHistoryDetails.hxOperation')}
                    value="true"
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('medicalHistoryDetails.hxOperation')}
                    value="false"
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What conditions need</label>
              <input
                {...register('medicalHistoryDetails.expectation')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expectation for Physiotherapy</label>
              <input
                {...register('medicalHistoryDetails.expectation')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Contact Person in case of emergency */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Person in case of emergency</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                {...register('emergencyContact.name')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
              <input
                {...register('emergencyContact.relationship')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No</label>
              <input
                {...register('emergencyContact.phone')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">are you married</label>
              <input
                {...register('married', { valueAsBoolean: true })}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vaccination</label>
              <select
                {...register('vaccination')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option>Please select option</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Id</label>
              <input
                {...register('parentId')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">general history</label>
              <input
                {...register('generalHistory')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">gene</label>
              <input
                {...register('generalHistory')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">National ID</label>
              <input
                {...register('nationalId')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                value="do not know"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Do you have allergy</label>
              <select
                {...register('hasAllergy', { valueAsBoolean: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">test</label>
              <select
                {...register('test')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option>Please select option</option>
              </select>
            </div>
          </div>
        </div>

        {/* department & specialization */}
        <div className="pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">department & specialization</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">department</label>
              <select
                {...register('department')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option>Please select option</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IP NO</label>
              <input
                {...register('ipNo')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Refered By:</label>
              <select
                {...register('referredBy')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option>Please select option</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="bend"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="bend" className="ml-2 block text-sm text-gray-700">
              bend
            </label>
          </div>
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
            {isSubmitting ? 'Saving...' : 'Save Patient'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;