import React, { useState } from 'react';
import {
  FileText,
  Shield,
  Lock,
  ClipboardList,
  UserCheck,
  Globe,
  Download,
  Check,
  X
} from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF Document Component
const LegalPDF = ({ title, content }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.subheader}>MediTrack Pro - Hospital Management System</Text>
        {content.split('\n').map((paragraph, i) => (
          <Text key={i} style={paragraph.startsWith('### ') ? styles.sectionTitle : styles.text}>
            {paragraph.startsWith('### ') ? paragraph.substring(4) : paragraph}
          </Text>
        ))}
        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString()} - For official use only
        </Text>
      </View>
    </Page>
  </Document>
);

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 12,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
  },
  footer: {
    fontSize: 10,
    marginTop: 40,
    textAlign: 'center',
    color: '#999',
  },
});

const LegalSettingsPage = () => {
  const [activeSection, setActiveSection] = useState('terms');
  const [consentSettings, setConsentSettings] = useState({
    analytics: true,
    marketing: false,
    essential: true,
  });

  const toggleConsent = (setting) => {
    setConsentSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const legalSections = [
    {
      id: 'terms',
      icon: FileText,
      title: 'Terms',
      lastUpdated: '2023-11-15',
      content: `### Terms of Service Agreement

**Last Updated:** November 15, 2023

**1. Acceptance of Terms**
By accessing or using MediTrack Pro services, you agree to be bound by these Terms of Service.

**2. Service Description**
MediTrack Pro provides hospital management software solutions including:
- Patient records management
- Medical billing and invoicing
- Appointment scheduling
- Staff management
- Inventory tracking

**3. User Responsibilities**
As a user of MediTrack Pro, you agree to:
- Maintain accurate account information
- Not share login credentials
- Comply with all applicable healthcare regulations
- Protect patient confidentiality
- Report any security breaches immediately

**4. Prohibited Activities**
Users may not:
- Reverse engineer or decompile the software
- Use the service for illegal purposes
- Violate patient privacy rights (HIPAA, GDPR, etc.)
- Introduce malware or harmful code
- Use automated systems to access the service

**5. Termination**
We reserve the right to terminate accounts for violations of these terms.`
    },
    {
      id: 'privacy',
      icon: Shield,
      title: 'Privacy',
      lastUpdated: '2023-10-20',
      content: `### Privacy Policy

**Last Updated:** October 20, 2023

**1. Information We Collect**
MediTrack Pro collects:
- Personal identification information (name, email, etc.)
- Professional credentials (for medical staff)
- Patient health data (medical records, treatments)
- Usage and analytics data
- Payment and billing information

**2. How We Use Information**
We use collected data to:
- Provide and maintain our service
- Notify you about important changes
- Improve user experience
- Conduct data analysis
- Ensure system security
- Comply with legal obligations

**3. Data Security**
We implement:
- AES-256 encryption for data at rest
- TLS 1.3 encryption for data in transit
- Regular security audits
- Role-based access controls
- Multi-factor authentication options

**4. Data Retention**
We retain personal data only as long as necessary:
- Patient records: 7 years minimum (per HIPAA)
- User accounts: Until deletion request
- Payment information: Only during active subscription`
    },
    {
      id: 'gdpr',
      icon: Globe,
      title: 'GDPR',
      lastUpdated: '2023-09-01',
      content: `### GDPR Compliance Statement

**Last Updated:** September 1, 2023

**1. Data Protection Principles**
We adhere to GDPR principles including:
- Lawfulness, fairness and transparency
- Purpose limitation
- Data minimization
- Accuracy
- Storage limitation
- Integrity and confidentiality
- Accountability

**2. User Rights Under GDPR**
You have the right to:
- Request access to your data
- Correct inaccurate information
- Request deletion of your data
- Restrict processing of your data
- Receive your data in portable format
- Object to certain processing
- Not be subject to automated decision-making

**3. Data Processing Agreements**
We have DPAs with all third-party processors that handle EU personal data.`
    },
    {
      id: 'hipaa',
      icon: Lock,
      title: 'HIPAA',
      lastUpdated: '2023-08-15',
      content: `### HIPAA Compliance Documentation

**Last Updated:** August 15, 2023

**1. Protected Health Information (PHI)**
We safeguard all PHI including:
- Patient names and contact information
- Medical records and history
- Treatment plans and prescriptions
- Billing and insurance information
- Any other health-related data

**2. Security Measures**
Our HIPAA compliance includes:
- Encryption of all PHI
- Regular risk assessments
- Comprehensive employee training
- Business Associate Agreements (BAAs)
- Audit controls and activity logging
- Contingency planning for data breaches

**3. Breach Notification Protocol**
In case of a breach involving PHI:
- We will notify affected parties within 60 days
- Report to HHS as required
- Provide credit monitoring if appropriate
- Conduct root cause analysis
- Implement corrective actions`
    },
    {
      id: 'consent',
      icon: UserCheck,
      title: 'Consent',
      lastUpdated: '2023-11-01',
      content: `### Consent Management

**Last Updated:** November 1, 2023

**1. Consent Preferences**
You can manage your consent for:
- Essential cookies (required for operation)
- Analytics cookies (helps us improve)
- Marketing communications (optional)

**2. How to Update Consent**
- Use the toggles below to change preferences
- Changes take effect immediately
- You can update at any time

**3. Withdrawing Consent**
To completely withdraw consent:
- Submit a request through our support portal
- Note that essential cookies cannot be disabled
- Withdrawal may limit certain features`
    }
  ];

  const currentSection = legalSections.find(s => s.id === activeSection);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Legal Settings</h1>

      {/* Top Navigation Bar */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
        <div className="flex space-x-1 p-1">
          {legalSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors min-w-max ${
                activeSection === section.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <section.icon className="w-4 h-4 mr-2" />
              <span>{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeSection === 'consent' ? (
          <>
            <div className="flex items-center mb-6">
              <UserCheck className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h2 className="text-xl font-semibold">Consent Management</h2>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(currentSection.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              {currentSection.content
                .split('\n')
                .map((paragraph, i) => (
                  <p key={i} className="my-3 text-sm">{paragraph}</p>
                ))}
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Essential Cookies</h3>
                    <p className="text-sm text-gray-500">
                      Required for basic site functionality
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-3">Always Active</span>
                    <div className="w-10 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Analytics Cookies</h3>
                    <p className="text-sm text-gray-500">
                      Help us improve our services
                    </p>
                  </div>
                  <button
                    onClick={() => toggleConsent('analytics')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      consentSettings.analytics ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        consentSettings.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Marketing Cookies</h3>
                    <p className="text-sm text-gray-500">
                      Used to personalize ads
                    </p>
                  </div>
                  <button
                    onClick={() => toggleConsent('marketing')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      consentSettings.marketing ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        consentSettings.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Preferences
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center mb-6">
              {React.createElement(currentSection.icon, { 
                className: "w-6 h-6 text-blue-600 mr-3" 
              })}
              <div>
                <h2 className="text-xl font-semibold">
                  {currentSection.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(currentSection.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="prose max-w-none text-sm mb-6">
              {currentSection.content
                .split('\n')
                .map((paragraph, i) => {
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={i} className="text-lg font-semibold mt-6 mb-3">{paragraph.substring(4)}</h3>;
                  } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <p key={i} className="font-medium my-2">{paragraph.substring(2, paragraph.length - 2)}</p>;
                  } else if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={i} className="list-disc pl-5 my-2">
                        <li>{paragraph.substring(2)}</li>
                      </ul>
                    );
                  } else if (paragraph.trim() === '') {
                    return <br key={i} />;
                  } else {
                    return <p key={i} className="my-3">{paragraph}</p>;
                  }
                })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <PDFDownloadLink
                  document={<LegalPDF title={currentSection.title} content={currentSection.content} />}
                  fileName={`MediTrack_${currentSection.title}_${new Date().toISOString().slice(0,10)}.pdf`}
                >
                  {({ loading }) => (
                    <button 
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center justify-center"
                      disabled={loading}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {loading ? 'Generating PDF...' : 'Download PDF'}
                    </button>
                  )}
                </PDFDownloadLink>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Check className="w-4 h-4 mr-2 inline" />
                    Accept
                  </button>
                  <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 text-sm">
                    <X className="w-4 h-4 mr-2 inline" />
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LegalSettingsPage;