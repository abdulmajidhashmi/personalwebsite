import "./Test.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate ,useParams } from "react-router-dom";
import socket from "./api/Socket";
import axiosInstance from "./api/axiosInstance";



const SingleUser = () => {

  
  const navigate = useNavigate();
  const chatsubdivRef = useRef();
  const deliveredRef = useRef();
  const [status, setstatus] = useState([]);
 const [username,setusername] = useState('');
  const [msg, setmsg] = useState("");
  const [local, setlocal] = useState({});
  const params =useParams();
  const use =params.id;

  const getusername=async()=>{
try{

  const obj = {
    id:use
  }
  const data = await axiosInstance.post('/user/oneuserdetail',obj);
  console.log(data);
  setusername(data.data.data);

}catch(err){

  console.log(err);
}


  }
    
  useEffect(() => {
    
    if(use){    getusername();}
    
    
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
      socket.emit("joinRoom", userId);
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
console.log(deliveredRef);
if(deliveredRef.current){
      if (local.name === "Abdul Wase Hashmi") {
        const recievedElement = document.createElement("div");
        recievedElement.classList.add("recieved-text-div");
        recievedElement.innerHTML = `<p className="recieved-text">${message}</p>`;
        deliveredRef.current.appendChild(recievedElement);
        chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;
      }}
    });
    return () => {
    
      if (socket.connected) {
        console.log("Disconnecting socket...");
        socket.disconnect();
      }
      
    
    };
  
  }, [local.number,use,deliveredRef]);
  const changeMessage = (event) => {
    const val = event.target.value;
    setmsg(val);
  };
  const sendingMessage = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      messagefn();
      event.target.value='';
    }
  };
  const sendclick = () => {
    if(msg!==''){
    messagefn();
    setmsg('');
  }
  };
  const messagefn = () => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("send-text-div");
    messageElement.innerHTML = `<p className="delivered-text">${msg}</p>`;
    console.log(messageElement);

    deliveredRef.current.appendChild(messageElement);
    if (chatsubdivRef.current) {
      // Scroll to bottom only if the message container has not reached the input div
      if (chatsubdivRef.current.scrollHeight - chatsubdivRef.current.scrollTop > chatsubdivRef.current.clientHeight) {
        chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;
      }
    }

    console.log(msg);
     
    socket.emit("sendMessage", { use, msg });
  };
  return (
    <>
      <div className="chat-enter-maindiv">
        <div className="chat-enterdiv" ref={chatsubdivRef}>
          <div className="boxing">{username}</div>

          
        
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
          
        </div>
      </div>
    </>
  );
};

export default SingleUser;
