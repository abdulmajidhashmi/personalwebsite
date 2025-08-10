import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Eye, Calendar, User, Phone, Mail, MapPin } from 'lucide-react';

const DoctorWebsite = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);

  // Sample patient data
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      phone: '+91 9876543210',
      email: 'john.smith@email.com',
      address: '123 Main St, Nagpur',
      bloodGroup: 'A+',
      diseases: ['Hypertension', 'Type 2 Diabetes'],
      treatments: [
        { date: '2025-01-15', treatment: 'Blood pressure medication adjustment', status: 'ongoing' },
        { date: '2025-01-10', treatment: 'Diabetes management consultation', status: 'completed' }
      ],
      nextAppointment: '2025-01-25',
      medicalHistory: 'Previous heart surgery in 2020, family history of diabetes'
    },
    {
      id: 2,
      name: 'Mary Johnson',
      age: 32,
      phone: '+91 9876543211',
      email: 'mary.j@email.com',
      address: '456 Park Ave, Nagpur',
      bloodGroup: 'O-',
      diseases: ['Migraine', 'Anxiety'],
      treatments: [
        { date: '2025-01-12', treatment: 'Migraine prevention therapy', status: 'ongoing' },
        { date: '2025-01-08', treatment: 'Anxiety counseling session', status: 'ongoing' }
      ],
      nextAppointment: '2025-01-28',
      medicalHistory: 'Chronic migraines since 2018, stress-related anxiety'
    },
    {
      id: 3,
      name: 'Robert Wilson',
      age: 58,
      phone: '+91 9876543212',
      email: 'r.wilson@email.com',
      address: '789 Oak St, Nagpur',
      bloodGroup: 'B+',
      diseases: ['Arthritis', 'High Cholesterol'],
      treatments: [
        { date: '2025-01-14', treatment: 'Joint pain management', status: 'ongoing' },
        { date: '2025-01-11', treatment: 'Cholesterol medication review', status: 'completed' }
      ],
      nextAppointment: '2025-01-30',
      medicalHistory: 'Arthritis diagnosis in 2019, lifestyle-related cholesterol issues'
    }
  ]);

  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    bloodGroup: '',
    diseases: '',
    medicalHistory: ''
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diseases.some(disease => disease.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddPatient = (e) => {
    e.preventDefault();
    const patient = {
      id: patients.length + 1,
      ...newPatient,
      age: parseInt(newPatient.age),
      diseases: newPatient.diseases.split(',').map(d => d.trim()),
      treatments: [],
      nextAppointment: null
    };
    setPatients([...patients, patient]);
    setNewPatient({
      name: '',
      age: '',
      phone: '',
      email: '',
      address: '',
      bloodGroup: '',
      diseases: '',
      medicalHistory: ''
    });
    setShowAddPatient(false);
  };

  const DashboardView = () => (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <div className="stat-number">{patients.length}</div>
        </div>
        <div className="stat-card">
          <h3>Active Treatments</h3>
          <div className="stat-number">
            {patients.reduce((acc, patient) => 
              acc + patient.treatments.filter(t => t.status === 'ongoing').length, 0
            )}
          </div>
        </div>
        <div className="stat-card">
          <h3>Upcoming Appointments</h3>
          <div className="stat-number">
            {patients.filter(p => p.nextAppointment).length}
          </div>
        </div>
      </div>

      <div className="recent-patients">
        <h3>Recent Patients</h3>
        <div className="patient-list">
          {patients.slice(0, 3).map(patient => (
            <div key={patient.id} className="patient-item" onClick={() => {
              setSelectedPatient(patient);
              setCurrentView('patient-detail');
            }}>
              <div className="patient-info">
                <h4>{patient.name}</h4>
                <p>Age: {patient.age} | Blood Group: {patient.bloodGroup}</p>
                <p className="diseases">Conditions: {patient.diseases.join(', ')}</p>
              </div>
              <div className="patient-actions">
                <button className="btn-view">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PatientsView = () => (
    <div className="patients-view">
      <div className="patients-header">
        <div className="search-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search patients by name or condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowAddPatient(true)}
        >
          <Plus size={20} />
          Add Patient
        </button>
      </div>

      <div className="patients-grid">
        {filteredPatients.map(patient => (
          <div key={patient.id} className="patient-card">
            <div className="patient-header">
              <h3>{patient.name}</h3>
              <span className="patient-age">Age: {patient.age}</span>
            </div>
            <div className="patient-details">
              <p><Phone size={16} /> {patient.phone}</p>
              <p><Mail size={16} /> {patient.email}</p>
              <p className="blood-group">Blood Group: {patient.bloodGroup}</p>
              <div className="diseases-list">
                <strong>Conditions:</strong>
                <div className="disease-tags">
                  {patient.diseases.map((disease, index) => (
                    <span key={index} className="disease-tag">{disease}</span>
                  ))}
                </div>
              </div>
              {patient.nextAppointment && (
                <p className="next-appointment">
                  <Calendar size={16} />
                  Next: {new Date(patient.nextAppointment).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="patient-actions">
              <button 
                className="btn-view"
                onClick={() => {
                  setSelectedPatient(patient);
                  setCurrentView('patient-detail');
                }}
              >
                <Eye size={16} />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PatientDetailView = () => (
    <div className="patient-detail">
      <div className="detail-header">
        <button 
          className="btn-back"
          onClick={() => setCurrentView('patients')}
        >
          ← Back to Patients
        </button>
        <h2>{selectedPatient.name}</h2>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Age:</label>
              <span>{selectedPatient.age} years</span>
            </div>
            <div className="info-item">
              <label>Blood Group:</label>
              <span>{selectedPatient.bloodGroup}</span>
            </div>
            <div className="info-item">
              <label>Phone:</label>
              <span>{selectedPatient.phone}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{selectedPatient.email}</span>
            </div>
            <div className="info-item full-width">
              <label>Address:</label>
              <span>{selectedPatient.address}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Current Conditions</h3>
          <div className="conditions-list">
            {selectedPatient.diseases.map((disease, index) => (
              <div key={index} className="condition-item">
                <span className="condition-name">{disease}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Treatment History</h3>
          <div className="treatments-list">
            {selectedPatient.treatments.map((treatment, index) => (
              <div key={index} className="treatment-item">
                <div className="treatment-date">
                  {new Date(treatment.date).toLocaleDateString()}
                </div>
                <div className="treatment-info">
                  <p>{treatment.treatment}</p>
                  <span className={`status ${treatment.status}`}>
                    {treatment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Medical History</h3>
          <p className="medical-history">{selectedPatient.medicalHistory}</p>
        </div>

        {selectedPatient.nextAppointment && (
          <div className="detail-section">
            <h3>Next Appointment</h3>
            <p className="next-appointment-date">
              {new Date(selectedPatient.nextAppointment).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const AddPatientModal = () => (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Add New Patient</h3>
          <button 
            className="modal-close"
            onClick={() => setShowAddPatient(false)}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleAddPatient} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={newPatient.name}
                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={newPatient.age}
                onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Blood Group</label>
              <select
                value={newPatient.bloodGroup}
                onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})}
                required
              >
                <option value="">Select</option>
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
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={newPatient.email}
              onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              value={newPatient.address}
              onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
              rows="2"
              required
            />
          </div>
          <div className="form-group">
            <label>Current Conditions (comma-separated)</label>
            <input
              type="text"
              value={newPatient.diseases}
              onChange={(e) => setNewPatient({...newPatient, diseases: e.target.value})}
              placeholder="e.g., Hypertension, Diabetes"
            />
          </div>
          <div className="form-group">
            <label>Medical History</label>
            <textarea
              value={newPatient.medicalHistory}
              onChange={(e) => setNewPatient({...newPatient, medicalHistory: e.target.value})}
              rows="3"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => setShowAddPatient(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="doctor-website">
      <style jsx>{`
        .doctor-website {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f8fafc;
          min-height: 100vh;
        }

        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem 0;
          text-align: center;
        }

        .header h1 {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 700;
        }

        .header p {
          margin: 0.5rem 0 0 0;
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .nav {
          background: white;
          padding: 1rem 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 2rem;
          padding: 0 2rem;
        }

        .nav-item {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          color: #64748b;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .nav-item.active {
          background: #667eea;
          color: white;
        }

        .nav-item:hover {
          background: #f1f5f9;
          color: #334155;
        }

        .nav-item.active:hover {
          background: #5a67d8;
        }

        .main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        /* Dashboard Styles */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .stat-card h3 {
          margin: 0 0 0.5rem 0;
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .recent-patients {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .recent-patients h3 {
          margin: 0 0 1rem 0;
          color: #1e293b;
        }

        /* Patients View Styles */
        .patients-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .search-container {
          display: flex;
          align-items: center;
          background: white;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          border: none;
          outline: none;
          margin-left: 0.5rem;
          font-size: 1rem;
          width: 100%;
        }

        .patients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .patient-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .patient-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .patient-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .patient-header h3 {
          margin: 0;
          color: #1e293b;
        }

        .patient-age {
          color: #64748b;
          font-size: 0.9rem;
        }

        .patient-details p {
          margin: 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
        }

        .blood-group {
          font-weight: 600;
          color: #dc2626;
        }

        .diseases-list {
          margin: 1rem 0;
        }

        .disease-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .disease-tag {
          background: #fef3c7;
          color: #92400e;
          padding: 0.25rem 0.75rem;
          border-radius: 16px;
          font-size: 0.85rem;
        }

        .next-appointment {
          background: #dbeafe;
          padding: 0.5rem;
          border-radius: 6px;
          font-weight: 500;
          color: #1d4ed8;
        }

        .patient-actions {
          margin-top: 1rem;
          display: flex;
          gap: 0.5rem;
        }

        /* Patient Detail Styles */
        .detail-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .btn-back {
          background: #f1f5f9;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          color: #475569;
        }

        .detail-header h2 {
          margin: 0;
          color: #1e293b;
        }

        .detail-content {
          display: grid;
          gap: 2rem;
        }

        .detail-section {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .detail-section h3 {
          margin: 0 0 1rem 0;
          color: #1e293b;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-item.full-width {
          grid-column: 1 / -1;
        }

        .info-item label {
          font-weight: 600;
          color: #64748b;
          font-size: 0.9rem;
        }

        .info-item span {
          color: #1e293b;
        }

        .conditions-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .condition-item {
          background: #fee2e2;
          color: #991b1b;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-weight: 500;
        }

        .treatments-list {
          display: grid;
          gap: 1rem;
        }

        .treatment-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }

        .treatment-date {
          font-weight: 600;
          color: #475569;
          min-width: 120px;
        }

        .treatment-info {
          flex: 1;
        }

        .treatment-info p {
          margin: 0 0 0.5rem 0;
          color: #1e293b;
        }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 16px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status.ongoing {
          background: #fef3c7;
          color: #92400e;
        }

        .status.completed {
          background: #d1fae5;
          color: #065f46;
        }

        .medical-history {
          color: #475569;
          line-height: 1.6;
          margin: 0;
        }

        .next-appointment-date {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1d4ed8;
          background: #dbeafe;
          padding: 1rem;
          border-radius: 8px;
          margin: 0;
          text-align: center;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h3 {
          margin: 0;
          color: #1e293b;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-form {
          padding: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #374151;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }

        /* Button Styles */
        .btn-primary {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #5a67d8;
        }

        .btn-secondary {
          background: #f1f5f9;
          color: #475569;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        .btn-view {
          background: #e0f2fe;
          color: #0369a1;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background 0.2s;
        }

        .btn-view:hover {
          background: #bae6fd;
        }

        .patient-list {
          display: grid;
          gap: 1rem;
        }

        .patient-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .patient-item:hover {
          background: #e2e8f0;
        }

        .patient-info h4 {
          margin: 0 0 0.25rem 0;
          color: #1e293b;
        }

        .patient-info p {
          margin: 0.25rem 0;
          color: #64748b;
          font-size: 0.9rem;
        }

        .diseases {
          font-weight: 500;
        }

        /* Appointments View Styles */
        .appointments-view {
          max-width: 1000px;
        }

        .appointments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .appointments-header h2 {
          margin: 0;
          color: #1e293b;
        }

        .appointments-list {
          display: grid;
          gap: 1.5rem;
        }

        .appointment-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: transform 0.2s;
        }

        .appointment-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .appointment-date {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          min-width: 100px;
        }

        .date-display {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .time-display {
          font-size: 1.1rem;
          font-weight: 700;
          margin-top: 0.25rem;
        }

        .appointment-details {
          flex: 1;
        }

        .appointment-details h4 {
          margin: 0 0 0.5rem 0;
          color: #1e293b;
          font-size: 1.1rem;
        }

        .appointment-details p {
          margin: 0.25rem 0;
          color: #64748b;
          font-size: 0.9rem;
        }

        .appointment-reason {
          font-weight: 500;
          color: #475569;
        }

        .appointment-conditions {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .condition-tag {
          background: #fef3c7;
          color: #92400e;
          padding: 0.25rem 0.75rem;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .appointment-actions {
          display: flex;
          gap: 0.75rem;
          flex-direction: column;
        }
          .patients-header {
            flex-direction: column;
            align-items: stretch;
          }

          .search-container {
            max-width: none;
          }

          .patients-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .nav-container {
            flex-wrap: wrap;
            justify-content: center;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .treatment-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .treatment-date {
            min-width: auto;
          }
        }
      `}</style>

      <div className="header">
        <h1>Dr. Medical Practice</h1>
        <p>Comprehensive Patient Care & Medical Records Management</p>
      </div>

      <nav className="nav">
        <div className="nav-container">
          <button 
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-item ${currentView === 'patients' ? 'active' : ''}`}
            onClick={() => setCurrentView('patients')}
          >
            Patients
          </button>
          <button 
            className={`nav-item ${currentView === 'appointments' ? 'active' : ''}`}
            onClick={() => setCurrentView('appointments')}
          >
            Appointments
          </button>
        </div>
      </nav>

      <main className="main">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'patients' && <PatientsView />}
        {currentView === 'patient-detail' && selectedPatient && <PatientDetailView />}
        {currentView === 'appointments' && <AppointmentsView />}
      </main>

      {showAddPatient && <AddPatientModal />}
    </div>
  );

  const AppointmentsView = () => (
    <div className="appointments-view">
      <div className="appointments-header">
        <h2>Upcoming Appointments</h2>
        <button className="btn-primary">
          <Plus size={20} />
          Schedule Appointment
        </button>
      </div>
      
      <div className="appointments-list">
        {patients.filter(p => p.nextAppointment).map(patient => (
          <div key={patient.id} className="appointment-card">
            <div className="appointment-date">
              <div className="date-display">
                {new Date(patient.nextAppointment).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="time-display">10:00 AM</div>
            </div>
            <div className="appointment-details">
              <h4>{patient.name}</h4>
              <p>Age: {patient.age} | Blood Group: {patient.bloodGroup}</p>
              <p className="appointment-reason">Follow-up consultation</p>
              <div className="appointment-conditions">
                {patient.diseases.slice(0, 2).map((disease, index) => (
                  <span key={index} className="condition-tag">{disease}</span>
                ))}
              </div>
            </div>
            <div className="appointment-actions">
              <button className="btn-view">View Patient</button>
              <button className="btn-secondary">Reschedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DoctorWebsite;