import "./Appointments.css";
const Appointments = () => {
  return (
    <>
      <div class="appointment-list">
        <div class="appointment-header">
          <h2 class="appointment-title">Today's Schedule</h2>
          <p class="appointment-date">Thursday, September 9</p>
        </div>
        <div class="appointments">
          <div class="appointment-item">
            <div class="avatar">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="Patient"
                class="avatar-img"
              />
            </div>
            <div class="appointment-details">
              <h3 class="patient-name">Sarah Johnson</h3>
              <p class="appointment-time">9:00 AM - 10:00 AM</p>
            </div>
            <button class="start-button">Start</button>
          </div>

          <div class="appointment-item">
            <div class="avatar">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="Patient"
                class="avatar-img"
              />
            </div>
            <div class="appointment-details">
              <h3 class="patient-name">Michael Brown</h3>
              <p class="appointment-time">11:30 AM - 12:30 PM</p>
            </div>
            <span class="appointment-status upcoming">Upcoming</span>
          </div>

          <div class="appointment-item">
            <div class="avatar">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="Patient"
                class="avatar-img"
              />
            </div>
            <div class="appointment-details">
              <h3 class="patient-name">Emma Wilson</h3>
              <p class="appointment-time">2:00 PM - 3:00 PM</p>
            </div>
            <span class="appointment-status upcoming">Upcoming</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
