import { useState } from "react";
import Calender from "../Calender/Calender";
import axiosInstance from "../api/axiosInstance";
import "./Appointments.css";
import { Popconfirm ,message} from "antd";
import {useNavigate} from 'react-router-dom';
const Appointments = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();
  const localData = JSON.parse(localStorage.getItem("user"));
  const selectTime = (event) => {
    setCurrentTime(event.target.value);
    const timedivs = document.querySelectorAll(".time-button");

    timedivs.forEach((event) => {
      event.classList.remove("time-select");
    });

    event.target.classList.add("time-select");
  };

  const selectedDate = (val) => {
    setCurrentDate(val.toDateString());
  };
  const bookAppointment = async (event) => {
    const appointmentData = {
      number: localData.number,
      date: currentDate,
      time: currentTime,
    };

    message.loading("Scheduling");
    if (currentDate && currentTime && localData) {
      try {
        const reply = await axiosInstance.post(
          "/patient/appointments",
          appointmentData
        );
        message.destroy();
        message.success("Scheduled Sucessfully");
        navigate('/');
        console.log(appointmentData);
        console.log(reply);
      } catch (err) {
        console.log(err);
        message.error("Retry")
      }
    }
  };
  return (
    <>
      <div id="appointment_manager" className="appointment-manager">
        <div className="grid-container">
          <div className="calendar-section">
            <div className="calendar-header">
              <div>
                <div className="calendar-header-content">
                  <h2 className="calendar-title">Appointment Calendar</h2>
                </div>

                <p>select Date</p>
                <Calender dateval={selectedDate} />
              </div>
              <div className="time-slot-maindiv">
                <p>select time</p>

                <div className="select-time-div">
                  <button
                    className="time-button"
                    value="3:00 PM"
                    onClick={selectTime}
                  >
                    3:00 PM
                  </button>
                  <button
                    className="time-button"
                    value="3:30 PM"
                    onClick={selectTime}
                  >
                    3:30 PM
                  </button>
                  <button
                    className="time-button"
                    value="4:00 PM"
                    onClick={selectTime}
                  >
                    4:00 PM
                  </button>
                  <button
                    className="time-button"
                    value="4:30 PM"
                    onClick={selectTime}
                  >
                    4:30 PM
                  </button>
                </div>
                <Popconfirm
                  title="Schedule the Appointment"
                  description="Are you sure to Schedule the Appointment?"
                  onConfirm={bookAppointment}
                  
                >
                 
                  <button className="book-appointment-button">
                    Book Appointment
                  </button>
                </Popconfirm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
