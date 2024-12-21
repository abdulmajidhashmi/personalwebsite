import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import axiosInstance from "./api/axiosInstance";
import "./Test.css";
import baseURL from "./api/BaseURL";

const Test = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.User.value);
  const statusreducer = useSelector((state) => state.Online.value);

  const chatsubdivRef = useRef();
  const deliveredRef = useRef();

  const [storemsg, setStoreMsg] = useState([]);
  const [msg, setMsg] = useState("");
  const [local, setLocal] = useState({});
  const [updatedata, setUpdateData] = useState([]);
  const [touserId, setToUserId] = useState("");
  const [show, setShow] = useState(true);

  const socket = useRef(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("user"));
    setLocal(localData);

    if (!localData) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (chatsubdivRef.current) {
      chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;
    }
  }, [storemsg]);

  const fetchUserData = async () => {
    try {
      const localData = JSON.parse(localStorage.getItem("user"));
      const response = await axiosInstance.post("/user/all", localData);

      if (response.data.data.name === "Doctor") {
        setToUserId(response.data.data.number);
        setShow(false);
      } else {
        setUpdateData(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();

    if (local.name && local.name !== "Abdul Wase Hashmi") {
      socket.current = io(`${baseURL}`, {
        query: { roomName: String(local.number) },
      });

      socket.current.on("recieveMessage", ({ message }) => {
        if (message) {
          setStoreMsg((prev) => [...prev, { place: "left", message }]);
          const notification = document.getElementById("message-notification");
          notification?.play().catch((error) => console.error("Error playing sound:", error));
        }
      });

      return () => {
        if (socket.current?.connected) {
          socket.current.emit("leaveRoom", { localnumber: local.number, status: "offline" });
          socket.current.disconnect();
        }
      };
    }
  }, [local]);

  const handleSendMessage = () => {
    if (msg.trim() && local.name !== "Abdul Wase Hashmi") {
      setStoreMsg((prev) => [...prev, { place: "right", message: msg }]);

      socket.current.emit("sendMessage", { use: String(local.number), msg });
      const notification = document.getElementById("send-notification");
      notification?.play().catch((err) => console.error(err));
      setMsg("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleUserClick = (userId) => {
    setToUserId(userId);
    navigate(`/test/${userId}`);
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
        <div className={`chat-enterdiv ${updatedata.length ? "full" : ""}`} ref={chatsubdivRef}>
          <div className="boxing">DR. Abdul Wase Hashmi</div>

          {updatedata.length ? (
            updatedata.map((user, index) => (
              user.number !== local.number && user.name !== "Doctor" && (
                <div
                  key={index}
                  onClick={() => handleUserClick(user.number)}
                  className="users-div"
                >
                  <div className="img-chat-user-div">
                    <img
                      src="https://www.webiconio.com/_upload/255/image_255.svg"
                      alt="User"
                      className="img-user-chat"
                    />
                  </div>
                  <h3 className="user-name">{user.name}</h3>
                </div>
              )
            ))
          ) : (
            <h1>No users here</h1>
          )}

          {!show && (
            <>
              <div className="rightit-div" ref={deliveredRef}>
                {storemsg.map((msg, index) => (
                  <div
                    key={index}
                    className={msg.place === "right" ? "send-text-div" : "recieved-text-div"}
                  >
                    <p className={msg.place === "left" ? "send-text" : "recieved-text"}>{msg.message}</p>
                  </div>
                ))}
              </div>
              <div className="inpchat-div">
                <input
                  className="inp-chat"
                  placeholder="Message"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <div onClick={handleSendMessage} className="send-div">
                  <i className="fa-solid fa-circle-chevron-right send"></i>
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
