import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "./api/axiosInstance";
import { Navigate, useNavigate } from "react-router-dom";
import socket from "./api/Socket";
import "./Test.css";
import { useLocation } from "react-router-dom";

const Test = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.User.value);
  const recievedRef = useRef();
  const deliveredRef = useRef();
  const chatsubdivRef = useRef();
  const statusreducer = useSelector((state) => state.Online.value);

  const [status, setstatus] = useState([]);
  const [updatedata, setupdatedata] = useState([]);
  const [touserId, settouserId] = useState("");
  const [local, setlocal] = useState({});
  const [iskeyboardopen, setiskeyboardopen] = useState(false);
  const [isRefsready, setisRefsready] = useState(false);
  const [show, setshow] = useState(true);
  const [storemsg,setstoremsg] = useState([]);

  const [msg, setmsg] = useState("");

  useEffect(() => {
    if (chatsubdivRef.current) {
      // Scroll to the bottom of the chat container
      chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;
    }
  }, [storemsg]);
  

  useEffect(() => {
    console.log(statusreducer);

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
    if (deliveredRef.current) {
      setisRefsready(true);
    }

    alluserdata();

    if (local.name && local.name !== "Abdul Wase Hashmi") {
      socket.connect();
      const userId = String(local.number);
      const selfid = local.number;
      socket.emit("joinRoom", { selfid, userId });
      console.log("socket connected");

      if (local.name !== "Abdul Wase Hashmi") {
        socket.on("recieveMessage", ({ message }) => {
          console.log(message);

          
            const recievenotification = document.getElementById(
              "message-notification"
            );

            console.log(recievenotification);
            recievenotification.play().catch((error) => {
              console.error("Error plammmying sound:", error);
            });

            setstoremsg((prev) => [...prev,{place:'left',message:message}]);
           
          
        });
      }
      return () => {
        if (socket.connected) {
          console.log("Disconnecting socket...");
          const status = "offline";
          const localnumber = local.number;
          socket.emit("leaveRoom", { localnumber, status });
          socket.disconnect();
        }
      };
    }
  }, [local.number, isRefsready, deliveredRef]);

  const sendingMessage = (event) => {
    if (
      event.key === "Enter" &&
      event.target.value !== "" &&
      local.name !== "Abdul Wase Hashmi"
    ) {
      messagefn();

     setmsg('');
    }
  };

  const messagefn = () => {
   
    if (msg) {
      setstoremsg((prev) => [...prev,{place:'right',message:msg}]);

     

      console.log(msg);
      const use = String(local.number);
      socket.emit("sendMessage", { use, msg });
      const sendnotification = document.getElementById("send-notification");

      sendnotification.play().catch((err) => {
        console.log(err);
      });
    }
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

  useEffect(() => {
    if (location.pathname === "/chat") {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [location]);

  return (
    <>
      <audio
        id="message-notification"
        src="https://cdn.uppbeat.io/audio-files/550fafd5d5403a2f6e11b6feefd0899e/5813248995dfa6aca7fce524188eb5d7/d5b64c2af9644f381f878b6041cfaf56/STREAMING-pop-up-bubble-gfx-sounds-1-00-00.mp3"
        preload="auto"
      ></audio>
      <audio
        id="send-notification"
        src="https://cdn.uppbeat.io/audio-files/13a6d3c9e914de5ab3fb451786993718/2ec11eb913fad21b859105c510f56d4d/1e1c89bd9921c412363a66f3a6ab8366/STREAMING-notification-muffled-pop-smartsound-fx-1-00-00.mp3"
        preload="auto"
      ></audio>
      <div className="chat-enter-maindiv">
        <div
          className={`chat-enterdiv ${updatedata ? "full" : ""}`}
          ref={chatsubdivRef}
        >
          <div className={`boxing ${iskeyboardopen ? "keyboard-open" : ""}`}>
            DR. Abdul Wase Hashmi
          </div>
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
              {/* <div className="isend"> */}
              <div className="rightit-div" ref={deliveredRef}>{storemsg.map((dat)=>(<>

<div className={`${dat.place==="right"?'send-text-div':'recieved-text-div'}`}><p className={`${dat.place==="left"?'send-text':'recieved-text'}`}>{dat.message}</p></div ></>
            ))}
          </div>
              {/* </div> */}
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
    </>
  );
};

export default Test;
