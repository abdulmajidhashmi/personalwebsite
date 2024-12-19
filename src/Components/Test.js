import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "./api/axiosInstance";
import { Navigate, useNavigate } from "react-router-dom";
import socket from "./api/Socket";
import "./Test.css";


const Test = () => {
 
  const navigate = useNavigate();
  const data = useSelector((state) => state.User.value);
  const recievedRef = useRef();
  const deliveredRef = useRef();
  const chatsubdivRef = useRef();

  const [status, setstatus] = useState([]);
  const [updatedata, setupdatedata] = useState([]);
  const [touserId, settouserId] = useState("");
  const [local, setlocal] = useState({});
  const [iskeyboardopen,setiskeyboardopen] = useState(false);

  const [show, setshow] = useState(true);

  const [msg, setmsg] = useState("");

  useEffect(() => {
    const localdatamain = JSON.parse(localStorage.getItem("user"));
    setlocal(localdatamain);

    if (!localdatamain) {
      navigate("/login");
    }
  }, [navigate]);

  const alluserdata = async () => {
    try {
      const localdata = JSON.parse(localStorage.getItem("user"));
      //   const userdata = await axiosInstance.post("/user/all",data);
      const userdata = await axiosInstance.post("/user/all", localdata);
      console.log(userdata);

      if (userdata.data.data.name === "Doctor") {
        settouserId(userdata.data.data.number);

        setshow(false);
      } else {
        setupdatedata(userdata.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    alluserdata();

    if (local.name && local.name !== "Abdul Wase Hashmi") {
      socket.connect();
      const userId = String(local.number);
      socket.emit("joinRoom", userId);
      console.log("socket connected");
    
    
    if (local.name !== "Abdul Wase Hashmi") {
      socket.on("recieveMessage", ({ message }) => {
        console.log(message);

        const recievedElement = document.createElement("div");
        recievedElement.classList.add("recieved-text-div");
        recievedElement.innerHTML = `<p className="recieved-text">${message}</p>`;
        deliveredRef.current.appendChild(recievedElement);
        chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;
      });
    }
    return () => {
      if (socket.connected) {
        console.log("Disconnecting socket...");
       socket.disconnect();
      }
    
      
    };}
  }, [local.number]);

  useEffect(()=>{

    const handleresize=()=>{
      const height =window.innerHeight;
      if(height<500){

        setiskeyboardopen(true);
      }else{
        setiskeyboardopen(false);
      }

    }

    window.addEventListener('resize',handleresize)

    return(()=>{

      window.removeEventListener('resize',handleresize)
    })
  },[])

  const sendingMessage = (event) => {
    if (
      event.key === "Enter" &&
      event.target.value !== "" &&
      local.name !== "Abdul Wase Hashmi"
    ) {
      messagefn();

      event.target.value = "";
    }
  };

  const messagefn = () => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("send-text-div");
    messageElement.innerHTML = `<p className="delivered-text">${msg}</p>`;
    console.log(messageElement);

    deliveredRef.current.appendChild(messageElement);

    chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;

    console.log(msg);
    const use = String(local.number);
    socket.emit("sendMessage", { use, msg });
    
  };
  const sendclick = () => {
    if (local.name !== "Abdul Wase Hashmi") {
      messagefn();
      setmsg("");
    }
  };

  const sendNumber = (touserId, event) => {
    console.log(touserId);
    settouserId(touserId);
    navigate(`/test/${touserId}`);
  };

  const changeMessage = (event) => {
    const val = event.target.value;
    setmsg(val);
  };

  return (
    <div className="chat-enter-maindiv">
      <div className="chat-enterdiv" ref={chatsubdivRef}>
        <div className={`boxing ${iskeyboardopen?'keyboard-open':''}`}>DR. Abdul Wase Hashmi</div>
        {updatedata ? (
          updatedata.map((dat, index) =>
            dat.number === local.number ? null : dat.name ===
              "Doctor" ? null : (
              <div
                key={index}
                onClick={(event) => sendNumber(dat.number, event)}
                className="users-div"
              >
                <div className="img-chat-user-div">
                  <img
                    src="https://www.webiconio.com/_upload/255/image_255.svg"
                    className="img-user-chat"
                  />
                </div>{" "}
                <h3 className="user-name">{dat.name}</h3>
              </div>
            )
          )
        ) : (
          <h1>no users here</h1>
        )}

        {show ? null : (
          <>
            <div className="isend">
              <div className="rightit-div" ref={deliveredRef}></div>
            </div>
            <div className="inpchat-div">
              <input
                className="inp-chat"
                placeholder="Message"
                value={msg}
                onChange={changeMessage}
                onKeyDown={sendingMessage}
              />
              <div onClick={sendclick} className="send-div">
                <i class="fa-solid fa-circle-chevron-right send"></i>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Test;
