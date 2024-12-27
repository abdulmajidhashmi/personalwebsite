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
          const msg = message;
          setStoreMsg((prev) => [...prev, { place: "left", message: msg }]);
          const notification = document.getElementById("message-notification");
          notification
            ?.play()
            .catch((error) => console.error("Error playing sound:", error));
        }
      });

      return () => {
        if (socket.current?.connected) {
          socket.current.emit("leaveRoom", {
            localnumber: local.number,
            status: "offline",
          });
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

      {/* <div
        className={`chat-enterdiv ${updatedata.length ? "full" : ""}`}
        ref={chatsubdivRef}
      ></div> */}

      <div class="sidebar">
        {updatedata ? (
          <div class="sidebar-header">
            <div class="search-wrapper">
              <input
                type="text"
                placeholder="Search conversations..."
                class="search-input"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="search-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        ) : null}

        <div class="conversations-list">
          {updatedata.length
            ? updatedata.map(
                (user, index) =>
                  user.number !== local.number &&
                  user.name !== "Doctor" && (
                    <div
                      key={index}
                      onClick={() => handleUserClick(user.number)}
                      class={
                        index === 0 ? "conversation active" : "conversation"
                      }
                    >
                      <img
                        src="https://avatar.iran.liara.run/public"
                        alt="Contact"
                        class="conversation-avatar"
                      />
                      <div class="conversation-details">
                        <h3 class="conversation-name">{user.name}</h3>
                        <p class="conversation-snippet">
                          Thanks for the consultation...
                        </p>
                      </div>
                      <div class="conversation-time">2m</div>
                    </div>
                  )
              )
            : null}
        </div>
      </div>

      {!show && (
        <div class="chat-container">
          <div class="chat-header">
            <div class="header-info">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="Current Chat"
                class="chat-avatar"
              />
              <div class="chat-user">
                <h2 class="chat-username">DR. Abdul Wase Hashmi</h2>
                <p class="chat-status">{true ? "Online" : "Offline"}</p>
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
            {storemsg.map(({ place, message }, index) => (
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
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button class="send-button" onClick={handleSendMessage}>
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
      )}
    </>
  );
};

export default Test;
