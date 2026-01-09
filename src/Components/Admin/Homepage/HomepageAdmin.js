import { useEffect, useState } from "react";
import "./HomepageAdmin.css";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
const HomepageAdmin = () => {
  const navigate = useNavigate();
  const [totalPatients, setTotalpatients] = useState(0);
  const [patientThisMonth, setPatientThisMonth] = useState(0);
  const [patientToday, setPatientToday] = useState(0);
  const [nearTime, setNearTime] = useState(null);
  const [noappointments, setNoAppointments] = useState(true);
  const [pendingapp,setPendingApp] = useState(0);
  const [pendingreports, setPendingReports] = useState(0);
  const [appData,setAppData] = useState([]);

  useEffect(() => {
    const checktoken = async () => {
      const tokendata = await axiosInstance.get("/user/check-admin-token", {
        withCredentials: true,
      });

      if (tokendata.data.success === false) {
        navigate("/login");
      }

      console.log(".......................",tokendata.data);
    };
    checktoken();

    adminData();
  }, []);

  const calculatepercentage = (thismonth, lastmonth) => {
    if (lastmonth === 0) {
      lastmonth = 1;
    }

    return (thismonth / lastmonth) * 100;
  };
  const adminData = async () => {
    try {
      const data = await axiosInstance.get("/user/all-admin-data", {
        withCredentials: true,
      });
      console.log(data.data.data.appointmentdata);
      setAppData(data.data.data.appointmentdata);
      setTotalpatients(data.data.data.totalpatientdata.length);
      setPendingReports(data.data.data.appointmentdata.length);

      //map appointments to get today's appointments
      var todayappointments = 0;

      // Example date string (replace with your dynamic date)
      const date = new Date();

      // Function to format the date to 12-hour format with AM/PM
      function formatTo12Hour(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";

        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'

        // Pad minutes with leading zero if needed
        minutes = minutes < 10 ? "0" + minutes : minutes;

        // Construct the formatted time
        const formattedTime = hours + ":" + minutes + " " + ampm;
        return formattedTime;
      }

      // Format the specific date into 12-hour format
      const formattedTime = formatTo12Hour(date);

      console.log(formattedTime); // Output: "2:46 PM"

      var temptime = data.data.data.appointmentdata[0]?.time;
      let pending = 0;
      data.data.data.appointmentdata.map((item) => {
        if(new Date(item.date).getDate() === new Date().getDate()){
          if (item.time > formattedTime) {
            pending++;

          }
         
        }else if(new Date(item.date).getDate() > new Date().getDate()){

          pending++;
        }
        if (new Date(item.date).getDate() === new Date().getDate()) {
          todayappointments++;

          if (temptime > item.time && item.time > formattedTime) {
            temptime = item.time;
          }
        }
      });
      console.log(temptime);

      if (temptime < formattedTime) {
        setNoAppointments(true);
      }else if(todayappointments){
        setNoAppointments(false);
      }
      setNearTime(temptime);
      setPendingApp(pending);

      setPatientToday(todayappointments);

      if (patientToday > 0) {
        setNoAppointments(true);
      }

      let thismonthpatienttemp = 0;

      data.data.data.totalpatientdata.forEach((item) => {
        if (new Date(item.createdAt).getMonth() === new Date().getMonth()) {
          thismonthpatienttemp++;
        }
      });

      const lastmonthpatienttemp = 0;
      data.data.data.totalpatientdata.map((item) => {
        if (new Date(item.createdAt).getMonth() === new Date().getMonth() - 1) {
          lastmonthpatienttemp++;
        }
      });
      const ans = calculatepercentage(
        thismonthpatienttemp,
        lastmonthpatienttemp
      );
      setPatientThisMonth(ans);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section id="doctor_dashboard" className="dashboard-section">
      <h1 className="dashboard">Doctor Dashboard</h1>
      <div className="overview-grid">
        <div className="overview-card">
          <div className="card-header">
            <div className="icon-bg-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon-blue"
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
            <span className="text-neutral">Total Patients</span>
          </div>
          <h3 className="card-title">{totalPatients}</h3>
          <p className="text-green">+{patientThisMonth}% from last month</p>
        </div>

        <div className="overview-card">
          <div className="card-header">
            <div className="icon-bg-green">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon-green"
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
            <span className="text-neutral">Today's Appointments</span>
          </div>
          <h3 className="card-title">{patientToday}</h3>
          {noappointments ? (
            <p className="text-green">No appointments left for today</p>
          ) : (
            <p className="text-green">Next at {nearTime}</p>
          )}
        </div>

        <div className="overview-card">
          <div className="card-header">
            <div className="icon-bg-purple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon-purple"
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
            <span className="text-neutral">Pending Consultations</span>
          </div>
          <h3 className="card-title">{pendingapp}</h3>
          <p className="text-orange">0 urgent requests</p>
        </div>

        <div className="overview-card">
          <div className="card-header">
            <div className="icon-bg-rose">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon-rose"
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
            <span className="text-neutral">Pending Reports</span>
          </div>
          <h3 className="card-title">{pendingreports}</h3>
          <p className="text-rose">Due within 24 hours</p>
        </div>
      </div>

      <div className="upcoming-appointments">
        <div className="appointments-header">
          <h2 className="appointments-title">Upcoming Appointments</h2>
        </div>
        <div className="table-container">
          <table className="appointments-table">
            <thead className="table-header">
              <tr>
                <th className="table-cell">Patient</th>
                <th className="table-cell">Time</th>
                <th className="table-cell">Type</th>
                <th className="table-cell">Status</th>
                <th className="table-cell">Action</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {/* <tr>
                <td className="table-data">
                  <div className="patient-info">
                    <img
                      src="https://avatar.iran.liara.run/public"
                      alt="Patient"
                      className="patient-avatar"
                    />
                    <div className="patient-details">
                      <div className="patient-name">Sarah Johnson</div>
                      <div className="patient-condition">Depression</div>
                    </div>
                  </div>
                </td>
                <td className="table-data">2:00 PM</td>
                <td className="table-data">
                  <span className="badge-blue">Video Call</span>
                </td>
                <td className="table-data">
                  <span className="badge-green">Confirmed</span>
                </td>
                <td className="table-data">
                  <button className="action-button">View Details</button>
                </td>
              </tr> */}

              {appData?.map((item) => ((
(new Date(item.date).getDate() > new Date().getDate())?<tr key={item._id}>
  <td className="table-data">
    <div className="patient-info">
      <img
        src="https://avatar.iran.liara.run/public"
        alt="Patient"
        className="patient-avatar"
      />
      <div className="patient-details">
        <div className="patient-name">{item.user.name}</div>
        <div className="patient-condition">General Checkup</div>
      </div>
    </div>
  </td>
  <td className="table-data">{item.time}</td>
  <td className="table-data">
    <span className="badge-blue">videoCall</span>
  </td>
  <td className="table-data">
    <span className="badge-green">Confirmed</span>
  </td>
  <td className="table-data">
    <button className="action-button">View Details</button>
  </td>
  </tr>:null

         )     ))}
              <tr>
                <td className="table-data">
                  <div className="patient-info">
                    <img
                      src="https://avatar.iran.liara.run/public"
                      alt="Patient"
                      className="patient-avatar"
                    />
                    <div className="patient-details">
                      <div className="patient-name">Michael Brown</div>
                      <div className="patient-condition">Anxiety</div>
                    </div>
                  </div>
                </td>
                <td className="table-data">3:30 PM</td>
                <td className="table-data">
                  <span className="badge-purple">In Person</span>
                </td>
                <td className="table-data">
                  <span className="badge-yellow">Pending</span>
                </td>
                <td className="table-data">
                  <button className="action-button">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="activity-actions-grid">
        <div className="recent-activity">
          <div className="activity-header">
            <h2 className="activity-title">Recent Activity</h2>
          </div>
          <div className="activity-content">
            <div className="activity-item">
              <div className="icon-bg-blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-blue"
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
              <div className="activity-details">
                <p className="activity-description">
                  Medical report updated for Sarah Johnson
                </p>
                <p className="activity-time">10 minutes ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="icon-bg-green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-green"
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
              <div className="activity-details">
                <p className="activity-description">
                  New appointment scheduled with Michael Brown
                </p>
                <p className="activity-time">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <div className="actions-header">
            <h2 className="actions-title">Quick Actions</h2>
          </div>
          <div className="actions-content">
            <button className="action-button-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Appointment
            </button>
            <button className="action-button-neutral">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon3"
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
            <button className="action-button-neutral">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon3"
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
  );  
}

export default HomepageAdmin;