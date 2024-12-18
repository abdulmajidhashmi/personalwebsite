import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "./api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Test.css";
 const socket =  io('https://personalwebsitebackend-ntzy.onrender.com');
//const socket = io("http://localhost:4020");

const Test = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.User.value);
  const recievedRef = useRef();
  const deliveredRef = useRef();
  const chatsubdivRef = useRef();

  const [messageData, setmessageData] = useState([]);
  const [updatedata, setupdatedata] = useState([]);
  const [touserId, settouserId] = useState("");
  const [local, setlocal] = useState({});
  const room = "docroom";
  const [status, setstatus] = useState([]);
  const [you, setyou] = useState([]);

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
      console.log(userdata.data.data.name);
      if (userdata.data.data.name === "Doctor") {
        settouserId(userdata.data.data.number);
      } else {
        setupdatedata(userdata.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    alluserdata();

    if (local.number) {
      socket.connect();
      socket.emit("joinRoom", local.number, room);
      console.log("socket connected");
    }
    socket.on("isOnline", (is) => {
      console.log(is);
      setstatus((prev) => [...prev, is]);
    });
    socket.on("userLeft", (message) => {
      setstatus((prev) => [...prev, message]);
    });
    socket.on("recieveMessage", ({ message }) => {
      console.log(message);

      const recievedElement = document.createElement("div");
      recievedElement.classList.add("recieved-text-div");
      recievedElement.innerHTML = `<p className="recieved-text">${message}</p>`;
      deliveredRef.current.appendChild(recievedElement);
      chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;
    });
    return () => {
      // console.log("Disconnecting socket...");
      socket.emit("leaveRoom", local.number, room);
      socket.disconnect();
    };
  }, [local.number]);

  const sendingMessage = (event) => {
    if (event.key === "Enter") {
      const message = event.target.value;

      console.log(message);
      const messageElement = document.createElement("div");
      messageElement.classList.add("send-text-div");
      messageElement.innerHTML = `<p className="delivered-text">${message}</p>`;
      console.log(messageElement);

      deliveredRef.current.appendChild(messageElement);

      chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;

      setyou((prev) => [...prev, message]);
      socket.emit("sendMessage", { touserId, message });
      event.target.value = "";
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
    <div className="chat-enter-maindiv">
      <div className="chat-enterdiv" ref={chatsubdivRef}>
        <div className="boxing">DR. Abdul Wase Hashmi</div>
        {updatedata ? (
          updatedata.map((dat, index) =>
            dat.number === local.number ? null : dat.name ===
              "Doctor" ? null : (
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

        <div className="isend">
          {/* {" "}
          <div className="recieved" ref={recievedRef}></div>{" "} */}
          <div className="rightit-div" ref={deliveredRef}></div>
        </div>
        <div className="inpchat-div">
          <input
            className="inp-chat"
            placeholder="Message"
            onKeyDown={sendingMessage}
          />
          <div className="send-div">
            <i class="fa-solid fa-circle-chevron-right send"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
