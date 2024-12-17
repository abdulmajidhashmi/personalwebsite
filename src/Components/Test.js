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
  const room  ="docroom";
  const [status,setstatus] = useState([]);
  const [you,setyou] =useState([]);


  useEffect(()=>{

    const localdatamain =JSON.parse(localStorage.getItem('user'));
    setlocal(localdatamain);
  
    if(!localdatamain){
navigate('/login');

    }
  },[navigate])
  
  

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
    
    alluserdata();

    if (local.number) {
      socket.connect();
      socket.emit("joinRoom",local.number, room);
      console.log("socket connected");
    }
    socket.on("isOnline",(is)=>{

      console.log(is);
      setstatus((prev)=> [...prev,is])
    })
    socket.on("userLeft",(message)=>{

      setstatus((prev)=> [...prev,message])
    })
    socket.on("recieveMessage", ({message}) => {
        
       console.log(message);
        
      setmessageData((prev) => [...prev, message]);
      
    });
    return () => {
      // console.log("Disconnecting socket...");
      socket.emit('leaveRoom',local.number,room);
      socket.disconnect();
    };
  }, [local.number]);

  const sendingMessage = (event) => {
    if (event.key === "Enter") {
      const message = event.target.value;

      console.log(message);

setyou((prev)=>[...prev,message]);
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
    <h1>i am {local.name}</h1>
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

      {you.map((dat)=>< div className="rightit-div">
      
      <p>{dat}</p></div>)}
      {messageData
        ? messageData.map((dat, index) => <><p key={index}>{dat}</p></>)
        : ""}

        {/* {status.map((dat,index)=><div key={index}>
<p>{dat.userId}</p>
<p>{dat.status}</p></div>

        )} */}
    </>
  );
};

export default Test;
