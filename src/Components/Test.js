import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "./api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Test.css";
const socket =  io('https://personalwebsitebackend-ntzy.onrender.com');
// const socket = io("http://localhost:4020");

const Test = () => {
    const navigate=useNavigate();
  const data = useSelector((state) => state.User.value);

  const [messageData, setmessageData] = useState([]);
  const [updatedata, setupdatedata] = useState([]);
  const [touserId, settouserId] = useState("");
  const [local,setlocal]= useState({});

  const alluserdata = async () => {
    try {
       const localdata = JSON.parse(localStorage.getItem('user'));
    //   const userdata = await axiosInstance.post("/user/all",data);
      const userdata = await axiosInstance.post("/user/all",localdata);
      console.log(userdata);
      setupdatedata(userdata.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    const localdatamain =JSON.parse(localStorage.getItem('user'));
    setlocal(localdatamain);
    if(!localdatamain){
navigate('/login');

    }
    alluserdata();

    if (data.number) {
      socket.emit("joinRoom", data.number);
    }
    socket.on("recieveMessage", (data) => {
        
        console.log(data);
      setmessageData((prev) => [...prev, data.message]);
      console.log(data.message);
    });
    // return()=>{

    //     socket.disconnect();
    // }
  }, [data.number]);

  const sendingMessage = (event) => {
    if (event.key === "Enter") {
      const message = event.target.value;

      console.log(message);

      socket.emit("sendMessage", { touserId, message });
    }
  };

  const sendNumber = (touserId, event) => {
    console.log(touserId);
    settouserId(touserId);
    const allDivs = document.querySelectorAll(".users-div");
    allDivs.forEach((div) => {
      div.style.border = ""; // Remove border
    });

    event.currentTarget.style.border = "3px solid grey";
  };
  return (
    <>
      {updatedata ? (
        updatedata.map((dat, index) =>
          dat.number === local.number ? null : (
            <div
              key={index}
              onClick={(event) => sendNumber(dat.number, event)}
              className="users-div"
            >
              <h3>{dat.name}</h3>
            </div>
          )
        )
      ) : (
        <h1>no users here</h1>
      )}

      <h1></h1>
      <input placeholder="write a message" onKeyDown={sendingMessage} />

      {messageData
        ? messageData.map((dat, index) => <p key={index}>{dat}</p>)
        : ""}
    </>
  );
};

export default Test;
