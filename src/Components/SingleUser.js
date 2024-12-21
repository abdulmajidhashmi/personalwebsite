import "./Test.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import { io } from "socket.io-client";
import baseURL from "./api/BaseURL";

const SingleUser = () => {
  const navigate = useNavigate();
  const chatsubdivRef = useRef();
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [localUser, setLocalUser] = useState({});
  const [isOnline, setIsOnline] = useState(false);
  const [messages, setMessages] = useState([]);
  const { id: userId } = useParams();

  const socket = useRef(null);

  useEffect(() => {
    const initializeSocket = () => {
      if (localUser?.name === "Abdul Wase Hashmi" && userId) {
        socket.current = io(`${baseURL}`, {
          query: { roomName: String(userId) },
        });

        socket.current.on("status", ({ status }) => {
          setIsOnline(status === "online");
        });

        socket.current.on("recieveMessage", ({ message }) => {
          if (message) {
            playAudio("message-notification");
            setMessages((prev) => [...prev, { place: "left", message }]);
          }
        });

        socket.current.connect();
      }
    };

    initializeSocket();

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [localUser, userId]);

  useEffect(() => {
    if (chatsubdivRef.current) {
      chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axiosInstance.post("/user/oneuserdetail", { id: userId });
        setUsername(data?.data);
      } catch (err) {
        console.error(err);
      }
    };

    const localData = JSON.parse(localStorage.getItem("user"));
    setLocalUser(localData);

    if (!localData) {
      navigate("/login");
      return;
    }

    if (userId) {
      fetchUserDetails();
    }
  }, [navigate, userId]);

  const playAudio = (id) => {
    const audio = document.getElementById(id);
    if (audio) {
      audio.play().catch((err) => console.error("Audio play error:", err));
    }
  };

  const handleInputChange = (event) => setMsg(event.target.value);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && msg.trim()) {
      sendMessage();
    }
  };

  const handleSendClick = () => {
    if (msg.trim()) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (socket.current && msg.trim()) {
      setMessages((prev) => [...prev, { place: "right", message: msg }]);
      socket.current.emit("sendMessage", { use: String(userId), msg });
      playAudio("send-notification");
      setMsg("");
    }
  };

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
            <div className={isOnline ? "online-status" : "offline-status"}></div>
            {username}
          </div>
          <div className="rightit-div">
            {messages.map(({ place, message }, index) => (
              <div
                key={index}
                className={place === "right" ? "send-text-div" : "recieved-text-div"}
              >
                <p className={place === "right" ? "send-text" : "recieved-text"}>{message}</p>
              </div>
            ))}
          </div>
          <div className="inpchat-div">
            <input
              className="inp-chat"
              placeholder="Message"
              value={msg}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <div onClick={handleSendClick} className="send-div">
              <i className="fa-solid fa-circle-chevron-right send"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;

