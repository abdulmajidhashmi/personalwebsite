import "./Test.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "./api/Socket";
import axiosInstance from "./api/axiosInstance";

const SingleUser = () => {
  const navigate = useNavigate();
  const chatsubdivRef = useRef();
  const deliveredRef = useRef();
  const [status, setstatus] = useState([]);
  const [username, setusername] = useState("");
  const [msg, setmsg] = useState("");
  const [local, setlocal] = useState({});
  const [isStatus, setisStatus] = useState(false);
  const params = useParams();
  let usee = params.id;
  const [isRefsready, setisRefsready] = useState(false);
  const [storemsg,setstoremsg] = useState([]);

  useEffect(() => {
    if (chatsubdivRef.current) {
      // Scroll to the bottom of the chat container
      chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;
    }
  }, [storemsg]);
  

  const getusername = async () => {
    try {
      const obj = {
        id: usee,
      };
      const data = await axiosInstance.post("/user/oneuserdetail", obj);
      console.log(data);
      setusername(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
   

    if (usee) {
      getusername();
    }

    const localdatamain = JSON.parse(localStorage.getItem("user"));
    setlocal(localdatamain);

    if (!localdatamain) {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    if (local.name && local.name === "Abdul Wase Hashmi") {
      socket.connect();
      const userId = String(use);
      const selfid = local.number;
      socket.emit("joinRoom", { selfid, userId });
      console.log("socket connected");
    }

    socket.on("status", ({ status, who }) => {
      console.log(status);
      console.log(who);
      if (local.number) {
        if (status === "online") {
          setisStatus(true);
        } else if (status === "offline") {
          setisStatus(false);
        }
      }
    });
    
    socket.on("recieveMessage", ({ message }) => {
      if(message){
        const recievenotification = document.getElementById(
          "message-notification"
        );

      
        recievenotification.play().catch((error) => {
          console.error("Error plammmying sound:", error);
        });}
        console.log(message);
        setstoremsg((prev) => [...prev,{place:'left',message:message}]);

        if (local.name === "Abdul Wase Hashmi") {
         
          
        }
    
    });
    return () => {
      if (socket.connected) {
        console.log("Disconnecting socket...");
        socket.disconnect(local.number);
      }
    };
  }, [local.number, use]);
  const changeMessage = (event) => {
    const val = event.target.value;
    setmsg(val);
  };
  const sendingMessage = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      messagefn();
      setmsg('');
    }
  };
  const sendclick = () => {
    if (msg !== "") {
      messagefn();
      setmsg("");
    }
  };
  const messagefn = () => {
  
   

      

      console.log(msg);
      const use = String(usee);
if(msg){

  setstoremsg((prev) => [...prev,{place:'right',message:msg}]);
      socket.emit("sendMessage", { use, msg });
      const sendnotification = document.getElementById("send-notification");

      sendnotification.play().catch((err) => {
        console.log(err);
      });
    
    }
    }
  
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
        <div className="chat-enterdiv" ref={chatsubdivRef}>
          <div className="boxing">
            {isStatus ? (
              <div className="online-status"></div>
            ) : (
              <div className="offline-status"></div>
            )}
            {username}
          </div>

          {/* <div className="isend"> */}
            <div className="rightit-div" ref={deliveredRef}>{storemsg.map((dat)=>(<>

<div className={`${dat.place==="right"?'send-text-div':'recieved-text-div'}`}><p className={`${dat.place==="left"?'send-text':'recieved-text'}`}>{dat.message}</p></div ></>
            ))}
          {/* </div> */}
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
        </div>
      </div>
    </>
    
  );
           };

export default SingleUser;
