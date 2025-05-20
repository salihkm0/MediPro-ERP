// src/types.ts

export type Address = {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  
  export type EmergencyContact = {
    name: string;
    relationship: string;
    phone: string;
  };
  
  export type Insurance = {
    companyName: string;
    policyCardId: string;
    tpaName: string;
    periodFrom: string;
    periodTo: string;
  };
  
  export type MedicalCondition = {
    condition: string;
    diagnosisDate: string;
    status: string;
    notes?: string;
  };
  
  export type Allergy = {
    name: string;
    reaction: string;
    severity: string;
  };
  
  export type Appointment = {
    id: string;
    date: string;
    time: string;
    doctor: string;
    reason: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show';
  };
  
  export type Prescription = {
    id: string;
    medication: string;
    dosage: string;
    frequency: string;
    prescribedDate: string;
    prescribedBy: string;
    status: 'Active' | 'Completed' | 'Cancelled';
  };
  
  export type Patient = {
    id: string;
    registrationId: string;
    recNo: string;
    firstName: string;
    lastName: string;
    dob: string;
    age: number;
    gender: string;
    bloodType?: string;
    mobileNo: string;
    email?: string;
    address: Address;
    medicalHistory: MedicalCondition[];
    allergies: Allergy[];
    insurance: Insurance;
    appointments: Appointment[];
    prescriptions: Prescription[];
    emergencyContact: EmergencyContact;
    createdAt: string;
    // Additional fields from your form
    locality?: string;
    residentId?: string;
    patientRemarks?: string;
    medicalConditions?: string;
    patientGroup?: string;
    underMedication?: boolean;
    pregnant?: boolean;
    referredBy?: string;
    photo?: string;
    specialization?: string;
    married?: boolean;
    vaccination?: string;
    parentId?: string;
    generalHistory?: string;
    nationalId?: string;
    hasAllergy?: boolean;
    department?: string;
    ipNo?: string;
  };