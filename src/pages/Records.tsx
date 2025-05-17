import React, { useState } from 'react';
import { FileText, Search, Filter, Download, X } from 'lucide-react';
import jsPDF from 'jspdf';

function Records() {

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const records = [
    {
      id: 'MR001',
      patientName: 'John Doe',
      dob: '1985-06-15',
      gender: 'Male',
      bloodType: 'A+',
      visitDate: '2024-03-15T09:30:00',
      doctor: 'Dr. Sarah Wilson',
      department: 'Cardiology',
      diagnosis: 'Hypertension',
      symptoms: ['Headache', 'Fatigue'],
      treatment: 'Lifestyle changes and medication',
      prescription: [
        { medication: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' },
        { medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }
      ],
      vitalSigns: {
        bloodPressure: '140/90',
        heartRate: 85,
        temperature: 98.6,
        oxygenSaturation: 97,
        height: '5ft 9in',
        weight: '160lbs',
        bmi: '23.6'
      },
      allergies: [
        { name: 'Penicillin', reaction: 'Rash', severity: 'Mild' }
      ],
      medicalHistory: [
        { condition: 'Diabetes', status: 'Ongoing', diagnosisDate: '2015-09-10' }
      ],
      notes: 'Patient advised to reduce salt intake.'
    },
    {
      id: 'MR002',
      patientName: 'Jane Smith',
      dob: '1990-11-02',
      gender: 'Female',
      bloodType: 'B-',
      visitDate: '2024-03-14T14:00:00',
      doctor: 'Dr. Michael Johnson',
      department: 'Pathology',
      diagnosis: 'Iron deficiency',
      symptoms: ['Fatigue', 'Dizziness'],
      treatment: 'Iron supplements',
      prescription: [
        { medication: 'Ferrous sulfate', dosage: '325mg', frequency: 'Twice daily' }
      ],
      vitalSigns: {
        bloodPressure: '110/70',
        heartRate: 78,
        temperature: 98.2,
        oxygenSaturation: 99,
        height: '5ft 5in',
        weight: '130lbs',
        bmi: '21.6'
      },
      allergies: [],
      medicalHistory: [],
      notes: 'Recommended dietary changes rich in iron.'
    },
    {
      id: 'MR003',
      patientName: 'Robert Brown',
      dob: '1978-02-20',
      gender: 'Male',
      bloodType: 'O+',
      visitDate: '2024-03-13T08:00:00',
      doctor: 'Dr. Emily Davis',
      department: 'Surgery',
      diagnosis: 'Appendicitis',
      symptoms: ['Abdominal pain', 'Nausea'],
      treatment: 'Appendectomy',
      prescription: [
        { medication: 'Ibuprofen', dosage: '400mg', frequency: 'Every 6 hours as needed' }
      ],
      vitalSigns: {
        bloodPressure: '120/80',
        heartRate: 90,
        temperature: 99.1,
        oxygenSaturation: 98,
        height: '6ft',
        weight: '180lbs',
        bmi: '24.4'
      },
      allergies: [
        { name: 'Latex', reaction: 'Hives', severity: 'Moderate' }
      ],
      medicalHistory: [
        { condition: 'Asthma', status: 'Controlled', diagnosisDate: '2000-06-01' }
      ],
      notes: 'Post-surgery recovery progressing well.'
    }
  ];
  

  const exportToPDF = (record: typeof records[0]) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 7;
    let yPos = 30;
  
    // Add MediTrack Pro header
    pdf.setFontSize(20);
    pdf.setTextColor(0, 87, 183);
    pdf.text('MediTrack Pro Medical Record', pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
  
    // Add patient info header
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Patient: ${record.patientName} | ID: ${record.id}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;
  
    // Main record details
    const details = [
      ['Record ID:', record.id],
      ['Patient Name:', record.patientName],
      ['Date of Birth:', record.dob || 'N/A'],
      ['Gender:', record.gender || 'N/A'],
      ['Blood Type:', record.bloodType || 'N/A'],
      ['Visit Date:', new Date(record.visitDate).toLocaleString()],
      ['Doctor:', record.doctor],
      ['Department:', record.department || 'N/A'],
      ['Diagnosis:', record.diagnosis || 'N/A'],
      ['Symptoms:', record.symptoms?.join(', ') || 'None reported'],
      ['Treatment:', record.treatment || 'N/A'],
      ['Prescription:', record.prescription?.map(p => 
        `${p.medication} (${p.dosage}, ${p.frequency})`).join('\n') || 'None'],
      ['Vital Signs:', record.vitalSigns ? 
        `BP: ${record.vitalSigns.bloodPressure || 'N/A'} | HR: ${record.vitalSigns.heartRate || 'N/A'} bpm\n` +
        `Temp: ${record.vitalSigns.temperature || 'N/A'}°F | SpO2: ${record.vitalSigns.oxygenSaturation || 'N/A'}%\n` +
        `Height: ${record.vitalSigns.height || 'N/A'} | Weight: ${record.vitalSigns.weight || 'N/A'}\n` +
        `BMI: ${record.vitalSigns.bmi || 'N/A'}`
        : 'Not recorded'],
      ['Allergies:', record.allergies?.map(a => 
        `${a.name} (${a.reaction}, ${a.severity})`).join(', ') || 'None known'],
      ['Medical History:', record.medicalHistory?.map(mh => 
        `${mh.condition} (${mh.status}, since ${mh.diagnosisDate})`).join('\n') || 'None recorded'],
      ['Notes:', record.notes || 'No additional notes']
    ];
  
    // Format details with proper text wrapping
    pdf.setFontSize(11);
    details.forEach(([label, value]) => {
      // Label
      pdf.setFont('helvetica', 'bold');
      pdf.text(label, margin, yPos);
      
      // Value with text wrapping
      pdf.setFont('helvetica', 'normal');
      const splitText = pdf.splitTextToSize(value, pageWidth - margin - 50);
      pdf.text(splitText, margin + 45, yPos);
      
      yPos += Math.max(10, splitText.length * lineHeight);
      
      // Add small space between sections
      yPos += 3;
    });
  
    // Add page border
    pdf.setDrawColor(200, 200, 200);
    pdf.rect(margin - 5, 15, pageWidth - margin * 2 + 10, yPos + 20);
  
    // Footer with MediTrack Pro info
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.text('MediTrack Pro Hospital ERP - Confidential Medical Record', pageWidth / 2, 285, { align: 'center' });
    pdf.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, pageWidth / 2, 290, { align: 'center' });
  
    // Save PDF
    pdf.save(`MediTrack_Record_${record.patientName.replace(' ', '_')}_${record.id}.pdf`);
  };


  // const exportToPDF = (record: typeof records[0]) => {
  //   const pdf = new jsPDF();
  //   const pageWidth = pdf.internal.pageSize.getWidth();
  //   const margin = 20;
  //   let yPos = 30;
  
  //   // Set default font
  //   pdf.setFont('helvetica');
  
  //   // Add header with blue background
  //   pdf.setFillColor(0, 87, 183);
  //   pdf.rect(0, 0, pageWidth, 30, 'F');
  //   pdf.setTextColor(255, 255, 255);
  //   pdf.setFontSize(16);
  //   pdf.text('Medical Record Details', margin, 20);
  
  //   // Add patient info section
  //   pdf.setTextColor(0, 0, 0);
  //   pdf.setFontSize(12);
  //   pdf.setFont('helvetica', 'bold');
  //   pdf.text('Patient Information', margin, yPos);
  //   pdf.setFont('helvetica', 'normal');
  //   yPos += 7;
  
  //   const patientInfo = [
  //     `Name: ${record.patientName}`,
  //     `DOB: ${record.dob}`,
  //     `Gender: ${record.gender}`,
  //     `Blood Type: ${record.bloodType}`
  //   ];
  
  //   patientInfo.forEach(info => {
  //     pdf.text(info, margin, yPos);
  //     yPos += 7;
  //   });
  
  //   // Add visit info section
  //   yPos += 5;
  //   pdf.setFont('helvetica', 'bold');
  //   pdf.text('Visit Information', margin, yPos);
  //   pdf.setFont('helvetica', 'normal');
  //   yPos += 7;
  
  //   const visitInfo = [
  //     `Date: ${new Date(record.visitDate).toLocaleString()}`,
  //     `Doctor: ${record.doctor}`,
  //     `Department: ${record.department}`,
  //     `Diagnosis: ${record.diagnosis}`
  //   ];
  
  //   visitInfo.forEach(info => {
  //     pdf.text(info, margin, yPos);
  //     yPos += 7;
  //   });
  
  //   // Add clinical details section
  //   yPos += 10;
  //   pdf.setFont('helvetica', 'bold');
  //   pdf.text('Clinical Details', margin, yPos);
  //   pdf.setFont('helvetica', 'normal');
  //   yPos += 7;
  
  //   // Symptoms
  //   pdf.text('Symptoms:', margin, yPos);
  //   yPos += 7;
  //   if (record.symptoms?.length > 0) {
  //     record.symptoms.forEach(symptom => {
  //       pdf.text(`• ${symptom}`, margin + 5, yPos);
  //       yPos += 7;
  //     });
  //   } else {
  //     pdf.text('None reported', margin + 5, yPos);
  //     yPos += 7;
  //   }
  
  //   // Treatment
  //   pdf.text('Treatment:', margin, yPos);
  //   yPos += 7;
  //   pdf.text(record.treatment || 'Not specified', margin + 5, yPos);
  //   yPos += 10;
  
  //   // Vital signs in cards
  //   pdf.setFont('helvetica', 'bold');
  //   pdf.text('Vital Signs', margin, yPos);
  //   pdf.setFont('helvetica', 'normal');
  //   yPos += 7;
  
  //   const vitalSigns = [
  //     { label: 'Blood Pressure', value: record.vitalSigns?.bloodPressure || 'N/A' },
  //     { label: 'Heart Rate', value: record.vitalSigns?.heartRate ? `${record.vitalSigns.heartRate} bpm` : 'N/A' },
  //     { label: 'Temperature', value: record.vitalSigns?.temperature ? `${record.vitalSigns.temperature}°F` : 'N/A' },
  //     { label: 'SpO2', value: record.vitalSigns?.oxygenSaturation ? `${record.vitalSigns.oxygenSaturation}%` : 'N/A' }
  //   ];
  
  //   // Draw vital signs cards
  //   const cardWidth = 40;
  //   const cardHeight = 20;
  //   const cardMargin = 5;
    
  //   vitalSigns.forEach((sign, index) => {
  //     const x = margin + (index % 2) * (cardWidth + cardMargin);
  //     const y = yPos + Math.floor(index / 2) * (cardHeight + cardMargin);
      
  //     // Card background
  //     pdf.setFillColor(240, 240, 240);
  //     pdf.roundedRect(x, y, cardWidth, cardHeight, 3, 3, 'F');
      
  //     // Card content
  //     pdf.setFontSize(9);
  //     pdf.text(sign.label, x + 3, y + 7);
  //     pdf.setFontSize(10);
  //     pdf.setFont('helvetica', 'bold');
  //     pdf.text(sign.value, x + 3, y + 14);
  //     pdf.setFont('helvetica', 'normal');
  //   });
  
  //   yPos += (Math.ceil(vitalSigns.length / 2) * (cardHeight + cardMargin)) + 10;
  
  //   // Prescriptions table
  //   pdf.setFont('helvetica', 'bold');
  //   pdf.text('Prescriptions', margin, yPos);
  //   pdf.setFont('helvetica', 'normal');
  //   yPos += 7;
  
  //   if (record.prescription?.length > 0) {
  //     // Table header
  //     pdf.setFillColor(240, 240, 240);
  //     pdf.rect(margin, yPos, pageWidth - margin * 2, 10, 'F');
  //     pdf.setFont('helvetica', 'bold');
  //     pdf.text('Medication', margin + 2, yPos + 7);
  //     pdf.text('Dosage', margin + 70, yPos + 7);
  //     pdf.text('Frequency', margin + 120, yPos + 7);
  //     yPos += 10;
  
  //     // Table rows
  //     pdf.setFont('helvetica', 'normal');
  //     record.prescription.forEach(prescription => {
  //       pdf.text(prescription.medication, margin + 2, yPos + 7);
  //       pdf.text(prescription.dosage, margin + 70, yPos + 7);
  //       pdf.text(prescription.frequency, margin + 120, yPos + 7);
  //       yPos += 10;
  //     });
  //   } else {
  //     pdf.text('No prescriptions', margin, yPos + 7);
  //     yPos += 10;
  //   }
  
  //   yPos += 10;
  
  //   // Allergies and Medical History side by side
  //   const columnWidth = (pageWidth - margin * 3) / 2;
    
  //   // Allergies
  //   pdf.setFont('helvetica', 'bold');
  //   pdf.text('Allergies', margin, yPos);
  //   pdf.setFont('helvetica', 'normal');
  //   yPos += 7;
  
  //   if (record.allergies?.length > 0) {
  //     record.allergies.forEach(allergy => {
  //       pdf.text(`• ${allergy.name}: ${allergy.reaction} (${allergy.severity})`, margin, yPos);
  //       yPos += 7;
  //     });
  //   } else {
  //     pdf.text('No known allergies', margin, yPos);
  //     yPos += 7;
  //   }
  
  //   // Medical History (right column)
  //   let historyY = yPos - 7 - (record.allergies?.length || 1) * 7;
  //   pdf.setFont('helvetica', 'bold');
  //   pdf.text('Medical History', margin + columnWidth + margin, historyY);
  //   pdf.setFont('helvetica', 'normal');
  //   historyY += 7;
  
  //   if (record.medicalHistory?.length > 0) {
  //     record.medicalHistory.forEach(history => {
  //       pdf.text(`• ${history.condition}: ${history.status} (since ${history.diagnosisDate})`, 
  //                margin + columnWidth + margin, historyY);
  //       historyY += 7;
  //     });
  //   } else {
  //     pdf.text('No significant history', margin + columnWidth + margin, historyY);
  //     historyY += 7;
  //   }
  
  //   yPos = Math.max(yPos, historyY) + 10;
  
  //   // Notes section
  //   pdf.setFont('helvetica', 'bold');
  //   pdf.text('Notes', margin, yPos);
  //   pdf.setFont('helvetica', 'normal');
  //   yPos += 7;
  
  //   // Notes with background
  //   pdf.setFillColor(240, 240, 240);
  //   pdf.rect(margin, yPos, pageWidth - margin * 2, 20, 'F');
  //   const notes = pdf.splitTextToSize(record.notes || 'No additional notes', pageWidth - margin * 2 - 4);
  //   pdf.text(notes, margin + 2, yPos + 7);
  
  //   // Footer
  //   pdf.setFontSize(10);
  //   pdf.setTextColor(100, 100, 100);
  //   pdf.text('MediTrack Pro Hospital ERP - Confidential Medical Record', pageWidth / 2, 285, { align: 'center' });
  //   pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, 290, { align: 'center' });
  
  //   // Save PDF
  //   pdf.save(`Medical_Record_${record.patientName.replace(' ', '_')}_${record.id}.pdf`);
  // };



  const viewRecord = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };




  // Modal component
  const RecordModal = ({ record, onClose }) => {
    if (!record) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              Medical Record: {record.id}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-blue-600">Patient Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {record.patientName}</p>
                  <p><span className="font-medium">DOB:</span> {record.dob}</p>
                  <p><span className="font-medium">Gender:</span> {record.gender}</p>
                  <p><span className="font-medium">Blood Type:</span> {record.bloodType}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-blue-600">Visit Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Date:</span> {new Date(record.visitDate).toLocaleString()}</p>
                  <p><span className="font-medium">Doctor:</span> {record.doctor}</p>
                  <p><span className="font-medium">Department:</span> {record.department}</p>
                  <p><span className="font-medium">Diagnosis:</span> {record.diagnosis}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600">Clinical Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Symptoms</h4>
                  <ul className="list-disc pl-5">
                    {record.symptoms?.length > 0 ? (
                      record.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))
                    ) : (
                      <p>None reported</p>
                    )}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Treatment</h4>
                  <p>{record.treatment || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600">Vital Signs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Blood Pressure</p>
                  <p className="font-medium">{record.vitalSigns?.bloodPressure || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Heart Rate</p>
                  <p className="font-medium">{record.vitalSigns?.heartRate || 'N/A'} bpm</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Temperature</p>
                  <p className="font-medium">{record.vitalSigns?.temperature || 'N/A'}°F</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">SpO2</p>
                  <p className="font-medium">{record.vitalSigns?.oxygenSaturation || 'N/A'}%</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-600">Prescriptions</h3>
              {record.prescription?.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {record.prescription.map((med, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{med.medication}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.dosage}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No prescriptions</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-blue-600">Allergies</h3>
                {record.allergies?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {record.allergies.map((allergy, index) => (
                      <li key={index}>
                        <span className="font-medium">{allergy.name}</span>: {allergy.reaction} ({allergy.severity})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No known allergies</p>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-blue-600">Medical History</h3>
                {record.medicalHistory?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {record.medicalHistory.map((history, index) => (
                      <li key={index}>
                        <span className="font-medium">{history.condition}</span>: {history.status} (since {history.diagnosisDate})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No significant medical history</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-blue-600">Notes</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{record.notes || 'No additional notes'}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end p-6 border-t space-x-3">
            <button
              onClick={() => {
                exportToPDF(record);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export All Records
          </button>
        </div>
      </div>
  
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search medical records..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.visitDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.recordType || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      record.status === 'Complete'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                    <button
                      onClick={() => viewRecord(record)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View
                    </button>
                    <button
                      onClick={() => exportToPDF(record)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Export PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add this at the end of your component */}
      {isModalOpen && (
        <RecordModal 
          record={selectedRecord} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
  
  
}

export default Records;