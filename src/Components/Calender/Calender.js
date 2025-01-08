import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calender.css";

const Calender = ({dateval}) => {


   
  const disablepreviousdates = ({ date, view }) => {
    if (view === "month") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const currentTime = new Date();
      if (
        currentTime.getHours() > 16 ||
        (currentTime.getHours() === 16 && currentTime.getMinutes() >= 15)
      ) {
        return date <= today;
      }
      return date < today;
    }
    return false;
  };

  const pickdate=(date)=>{


dateval(date);
  }
  return (
    <>
      <Calendar
        tileDisabled={disablepreviousdates}
        showNeighboringMonth={false}
        onChange={pickdate}
      />

     
      
    </>
  );
};

export default Calender;
