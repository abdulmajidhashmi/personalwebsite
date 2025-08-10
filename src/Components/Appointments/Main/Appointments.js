// import { useEffect, useState } from "react";
// import Calender from "../../Calender/Calender";
// import axiosInstance from "../../api//axiosInstance";
// import "./Appointments.css";
// import Features from "../Features/Features";
// import { Popconfirm, message } from "antd";
// import { useNavigate } from 'react-router-dom';
// import Testimonials from "../Testimonials/Testimonials";
// import Pricing from "../Pricing/Pricing";
// const Appointments = () => {
//   const [currentDate, setCurrentDate] = useState("");
//   const [currentTime, setCurrentTime] = useState("");
//   const navigate = useNavigate();
//   const [localData, setLocalData] = useState(null);

//   useEffect(() => {

//     const checktoken = async () => {

//       const tokendata = await axiosInstance.get('/user/check-token', { withCredentials: true });

//       if (tokendata.data.success === false) {

//         navigate("/login");
//       }
//     }
//     checktoken();
//     userDetails();

//   }, [])


//   const userDetails = async () => {

//     try {

//       const userData = await axiosInstance.get("/user/self-detail", { withCredentials: true });

//       setLocalData(userData.data.data);

//     } catch (err) {

//       console.log(err);
//     }

//   }
//   const selectTime = (event) => {
//     setCurrentTime(event.target.value);
//     const timedivs = document.querySelectorAll(".time-button");

//     timedivs.forEach((event) => {
//       event.classList.remove("time-select");
//     });

//     event.target.classList.add("time-select");
//   };

//   const selectedDate = (val) => {
//     setCurrentDate(val.toDateString());
//   };
//   const bookAppointment = async (event) => {
//     const appointmentData = {
//       number: localData.number,
//       date: currentDate,
//       time: currentTime,
//     };

//     message.loading("Scheduling");
//     if (currentDate && currentTime && localData?.number) {
//       try {
//         const reply = await axiosInstance.post(
//           "/patient/appointments",
//           appointmentData, { withCredentials: true }
//         );
//         message.destroy();
//         message.success("Scheduled Sucessfully");
//         navigate('/');
//         console.log(appointmentData);
//         console.log(reply);
//       } catch (err) {
//         console.log(err);
//         message.error("Retry")
//       }
//     }
//   };
//   return (
//     <>
//       <div id="appointment_manager" className="appointment-manager">
//         <div className="grid-container">
//           <div className="calendar-section">
//             <div className="calendar-header">
//               <div>
//                 <div className="calendar-header-content">
//                   <h2 className="calendar-title">Appointment Calendar</h2>
//                 </div>

//                 <p>select Date</p>
//                 <Calender dateval={selectedDate} />
//               </div>
//               <div className="time-slot-maindiv">
//                 <p>select time</p>

//                 <div className="select-time-div">
//                   <button
//                     className="time-button"
//                     value="3:00 PM"
//                     onClick={selectTime}
//                   >
//                     3:00 PM
//                   </button>
//                   <button
//                     className="time-button"
//                     value="3:30 PM"
//                     onClick={selectTime}
//                   >
//                     3:30 PM
//                   </button>
//                   <button
//                     className="time-button"
//                     value="4:00 PM"
//                     onClick={selectTime}
//                   >
//                     4:00 PM
//                   </button>
//                   <button
//                     className="time-button"
//                     value="4:30 PM"
//                     onClick={selectTime}
//                   >
//                     4:30 PM
//                   </button>
//                 </div>
//                 <Popconfirm
//                   title="Schedule the Appointment"
//                   description="Are you sure to Schedule the Appointment?"
//                   onConfirm={bookAppointment}
//                   disabled={!currentDate || !currentTime}

//                 >

//                   <button className="book-appointment-button">
//                     Book Appointment
//                   </button>
//                 </Popconfirm>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Features />
//       <Testimonials />
//       <Pricing />
//     </>
//   );
// };

// export default Appointments;



import { useEffect, useState } from "react";
import Calender from "../../Calender/Calender";
import axiosInstance from "../../api//axiosInstance";
import "./Appointments.css";
import Features from "../Features/Features";
import { Popconfirm, message } from "antd";
import { useNavigate } from 'react-router-dom';
import Testimonials from "../Testimonials/Testimonials";
import Pricing from "../Pricing/Pricing";

const Appointments = () => {
  
  const [appointmentType, setAppointmentType] = useState(null);
  const [details, setDetails] = useState("");
  const [confirmed, setConfirmed] = useState(false);
 
  const navigate = useNavigate();
  const [localData, setLocalData] = useState(null);








  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);
  const [notes, setNotes] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

  // Generate calendar whenever month changes
  useEffect(() => {
    generateCalendar();
  }, [currentDate]);

  const generateCalendar = () => {
    const days = [];
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const today = new Date();

    // Add empty cells for alignment
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({ day: null, disabled: true });
    }

    // Add actual days
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
      days.push({
        day: d,
        disabled: dayDate < today,
        fullDate: dayDate
      });
    }
    setCalendarDays(days);
  };

  const changeMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const selectDate = (dayDate) => {
    if (!dayDate) return;
    setSelectedDate(dayDate);
    setSelectedTime(null); // reset time when date changes
  };

  const selectTime = (time) => {
    setSelectedTime(time);
  };

  const selectType = (type) => {
    setSelectedType(type);
  };

  const confirmAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedType) {
      alert("Please select a date, time, and appointment type.");
      return;
    }

    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    alert(
      `Appointment Confirmed!\n\nDate: ${formattedDate}\nTime: ${selectedTime}\nType: ${selectedType}\n\nYou will receive a confirmation email shortly.`
    );
  };



 

  const appointmentTypes = [
    {
      title: "Chat Consultation",
      desc: "Text-based consultation via secure messaging",
      icon: "💬",
    },
    {
      title: "Video Call",
      desc: "Face-to-face virtual consultation",
      icon: "📹",
    },
    {
      title: "In-Person",
      desc: "Traditional office visit consultation",
      icon: "🏥",
    },
  ];

 

  // const confirmAppointment = () => {
  //   if (selectedDate && selectedTime && appointmentType) {
  //     setConfirmed(true);
  //   } else {
  //     alert("Please select date, time, and appointment type.");
  //   }
  // };





  const checktoken = async () => {
    const tokendata = await axiosInstance.get('/user/check-token', { withCredentials: true });
    if (tokendata.data.success === false) {
      navigate("/login");
    }
  }

  const userDetails = async () => {
    try {
      const userData = await axiosInstance.get("/user/self-detail", { withCredentials: true });
      setLocalData(userData.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    checktoken();
    userDetails();
  }, [])

  

  // const selectDate = (val) => {
  //   setCurrentDate(val.toDateString());
  // };
  // const bookAppointment = async (event) => {
  //   const appointmentData = {
  //     number: localData.number,
  //     date: currentDate,
  //     time: currentTime,
  //   };

  //   message.loading("Scheduling");
  //   if (currentDate && currentTime && localData?.number) {
  //     try {
  //       const reply = await axiosInstance.post(
  //         "/patient/appointments",
  //         appointmentData, { withCredentials: true }
  //       );
  //       message.destroy();
  //       message.success("Scheduled Sucessfully");
  //       navigate('/');
  //       console.log(appointmentData);
  //       console.log(reply);
  //     } catch (err) {
  //       console.log(err);
  //       message.error("Retry")
  //     }
  //   }
  // };

  return (
<>
    <div className="appointment-body">
     <div className="appointment-container">
      <div className="appointment-header">
        <h1>Select Your Appointment</h1>
        <p>Choose a convenient date and time that works best for you</p>
      </div>

      <div className="appointment-content">
        <div className="booking-grid">
          {/* Calendar Section */}
          <div className="appointment-section">
            <h2 className="section-title">📅 Select Date</h2>
            <div className="month-nav">
              <button onClick={() => changeMonth(-1)}>‹</button>
              <div className="current-month">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <button onClick={() => changeMonth(1)}>›</button>
            </div>
            <div className="calendar">
              {/* Day headers */}
              {daysOfWeek.map((day) => (
                <div key={day} className="calendar-header">{day}</div>
              ))}

              {/* Days */}
              {calendarDays.map((dayObj, idx) => (
                <div
                  key={idx}
                  className={`calendar-day 
                    ${dayObj.disabled ? "disabled" : ""} 
                    ${selectedDate &&
                      dayObj.fullDate?.toDateString() === selectedDate.toDateString()
                      ? "selected"
                      : ""}`}
                  onClick={() => !dayObj.disabled && selectDate(dayObj.fullDate)}
                >
                  {dayObj.day}
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="section">
            <h2 className="section-title">🕐 Available Times</h2>
            <div className="time-slots">
              {availableTimes.map((time) => (
                <div
                  key={time}
                  className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                  onClick={() => selectTime(time)}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Type Section */}
          <div className="section">
            <h2 className="section-title">💬 Appointment Type</h2>
            <div className="appointment-types">
              {[
                {
                  icon: "💬",
                  title: "Chat Consultation",
                  desc: "Text-based consultation via secure messaging",
                },
                {
                  icon: "📹",
                  title: "Video Call",
                  desc: "Face-to-face virtual consultation",
                },
                {
                  icon: "🏥",
                  title: "In-Person",
                  desc: "Traditional office visit consultation",
                },
              ].map((type) => (
                <div
                  key={type.title}
                  className={`appointment-type ${selectedType === type.title ? "selected" : ""}`}
                  onClick={() => selectType(type.title)}
                >
                  <div className="appointment-icon">{type.icon}</div>
                  <div className="appointment-info">
                    <h3>{type.title}</h3>
                    <p>{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="appointment-notes-section">
          <h3>📝 Additional Information</h3>
          <textarea
            className="appointment-notes-textarea"
            placeholder="Please describe your symptoms, concerns, or any additional information..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Confirm Button */}
        <button className="confirm-button" onClick={confirmAppointment}>
          Confirm Appointment
        </button>
      </div>
    </div>
        </div>
      <Features />
      <Testimonials />
      <Pricing />
  </>
  );
};

export default Appointments;
