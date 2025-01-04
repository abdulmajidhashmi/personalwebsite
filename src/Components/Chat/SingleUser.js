import "./Test.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { io } from "socket.io-client";
import baseURL from "../api/BaseURL";

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
        const { data } = await axiosInstance.post("/user/oneuserdetail", {
          id: userId,
        });
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

      {/* <div className="chat-enter-maindiv">
        <div className="chat-enterdiv" ref={chatsubdivRef}></div>
      </div> */}

      <div class="chat-container">
        <div class="chat-header">
          <div class="header-info">
            <img
              src="https://avatar.iran.liara.run/public"
              alt="Current Chat"
              class="chat-avatar"
            />
            <div class="chat-user">
              <h2 class="chat-username">{username}</h2>
              <p class="chat-status">{isOnline ? "Online" : "Offline"}</p>
            </div>
          </div>
          <div class="header-actions">
            <button class="action-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button class="action-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="chat-messages">
          {messages.map(({ place, message }, index) => (
            <>
              <div
                key={index}
                className={
                  place === "right" ? "message sent" : "message received"
                }
              >
                {place === "right" ? null : (
                  <img
                    src="https://avatar.iran.liara.run/public"
                    alt="Contact"
                    class="message-avatar"
                  />
                )}

                <div class="message-content">
                  <div class="message-bubble">
                    <p>{message}</p>
                  </div>
                  <span class="message-timestamp">10:30 AM</span>
                </div>
              </div>
            </>
          ))}
        </div>

        <div class="chat-input">
          <button class="action-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            class="message-input"
            value={msg}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button class="send-button" onClick={handleSendClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
     
    </>
  );
};

export default SingleUser;
