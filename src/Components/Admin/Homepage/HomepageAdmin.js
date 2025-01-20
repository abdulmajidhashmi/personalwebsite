import { useEffect } from 'react';
import './HomepageAdmin.css';
import axiosInstance from '../../api/axiosInstance';
const HomepageAdmin = () =>{
  
useEffect(()=>{


const cookies = document.cookie;
  if(cookies.includes('authToken')){
  
  patientsinfo();
  }

},[])


const patientsinfo  =async()=>{
try{
 const data =  await axiosInstance.post('/user/all',{withCredentials:true});
 console.log(data);
}catch(err){

console.log(err);
}
  
}
    return(


      <section id="doctor_dashboard" class="dashboard-section">
    <h1 className='dashboard'>Doctor Dashboard</h1>
      <div class="overview-grid">
        <div class="overview-card">
          <div class="card-header">
            <div class="icon-bg-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span class="text-neutral">Total Patients</span>
          </div>
          <h3 class="card-title">248</h3>
          <p class="text-green">+12% from last month</p>
        </div>
        
        <div class="overview-card">
          <div class="card-header">
            <div class="icon-bg-green">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span class="text-neutral">Today's Appointments</span>
          </div>
          <h3 class="card-title">12</h3>
          <p class="text-green">Next at 2:00 PM</p>
        </div>
  
        <div class="overview-card">
          <div class="card-header">
            <div class="icon-bg-purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-purple"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span class="text-neutral">Pending Consultations</span>
          </div>
          <h3 class="card-title">8</h3>
          <p class="text-orange">3 urgent requests</p>
        </div>
  
        <div class="overview-card">
          <div class="card-header">
            <div class="icon-bg-rose">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-rose"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span class="text-neutral">Pending Reports</span>
          </div>
          <h3 class="card-title">5</h3>
          <p class="text-rose">Due within 24 hours</p>
        </div>
      </div>
  
      
      <div class="upcoming-appointments">
        <div class="appointments-header">
          <h2 class="appointments-title">Upcoming Appointments</h2>
        </div>
        <div class="table-container">
          <table class="appointments-table">
            <thead class="table-header">
              <tr>
                <th class="table-cell">Patient</th>
                <th class="table-cell">Time</th>
                <th class="table-cell">Type</th>
                <th class="table-cell">Status</th>
                <th class="table-cell">Action</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr>
                <td class="table-data">
                  <div class="patient-info">
                    <img src="https://avatar.iran.liara.run/public" alt="Patient" class="patient-avatar" />
                    <div class="patient-details">
                      <div class="patient-name">Sarah Johnson</div>
                      <div class="patient-condition">Depression</div>
                    </div>
                  </div>
                </td>
                <td class="table-data">2:00 PM</td>
                <td class="table-data">
                  <span class="badge-blue">Video Call</span>
                </td>
                <td class="table-data">
                  <span class="badge-green">Confirmed</span>
                </td>
                <td class="table-data">
                  <button class="action-button">View Details</button>
                </td>
              </tr>
              <tr>
                <td class="table-data">
                  <div class="patient-info">
                    <img src="https://avatar.iran.liara.run/public" alt="Patient" class="patient-avatar" />
                    <div class="patient-details">
                      <div class="patient-name">Michael Brown</div>
                      <div class="patient-condition">Anxiety</div>
                    </div>
                  </div>
                </td>
                <td class="table-data">3:30 PM</td>
                <td class="table-data">
                  <span class="badge-purple">In Person</span>
                </td>
                <td class="table-data">
                  <span class="badge-yellow">Pending</span>
                </td>
                <td class="table-data">
                  <button class="action-button">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
     
      <div class="activity-actions-grid">
        <div class="recent-activity">
          <div class="activity-header">
            <h2 class="activity-title">Recent Activity</h2>
          </div>
          <div class="activity-content">
            <div class="activity-item">
              <div class="icon-bg-blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="activity-details">
                <p class="activity-description">Medical report updated for Sarah Johnson</p>
                <p class="activity-time">10 minutes ago</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="icon-bg-green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div class="activity-details">
                <p class="activity-description">New appointment scheduled with Michael Brown</p>
                <p class="activity-time">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="quick-actions">
          <div class="actions-header">
            <h2 class="actions-title">Quick Actions</h2>
          </div>
          <div class="actions-content">
            <button class="action-button-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              New Appointment
            </button>
            <button class="action-button-neutral">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Start Video Call
            </button>
            <button class="action-button-neutral">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Create Report
            </button>
          </div>
        </div>
      </div>
    </section>

    )
}

export default HomepageAdmin;