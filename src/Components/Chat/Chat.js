import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { io } from "socket.io-client";
import axiosInstance from "../api/axiosInstance";
import "./Chat.css";
import baseURL from "../api/BaseURL";
import { Alert, Flex, Spin } from "antd";

const Chat = () => {
  const [loading, setloading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const chatsubdivRef = useRef();
  const [storemsg, setStoreMsg] = useState([]);
  const [msg, setMsg] = useState(null);
  const [updatedata, setUpdateData] = useState([]);
  const [touserId, setToUserId] = useState(null);
  const [show, setShow] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const [userData, setUserData] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    const checktoken = async () => {
      const tokendata = await axiosInstance.get("/user/check-token", {
        withCredentials: true,
      });

      if (tokendata.data.success === false) {
        navigate("/login");
      }
    };
    checktoken();
    fetchUserData();
  }, []);

  useEffect(() => {

    console.log(chatsubdivRef.current);
    if (chatsubdivRef.current) {
      chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;
    }
  }, [storemsg]);

  const fetchUserData = async () => {
    try {
      const selfData = await axiosInstance.get("/user/self-detail", {
        withCredentials: true,
      });
      console.log(selfData);
      setUserData(selfData.data.data);
      setToUserId(selfData.data.data.number);
      setShow(false);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  useEffect(() => {
    if (userData && userData?.role === "user") {
      socket.current = io(`${baseURL}`, {
        query: { roomName: String(userData.number) },
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
            userData: userData.number,
            status: "offline",
          });
          socket.current.disconnect();
        }
      };
    }
  }, [userData]);

  const handleSendMessage = () => {
    if (msg.trim() && userData?.role === "user" && socket.current) {
      setStoreMsg((prev) => [...prev, { place: "right", message: msg }]);

      socket.current.emit("sendMessage", { use: String(userData.number), msg });
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

  useEffect(() => {
    if (location.pathname === "/chat") {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [location]);

  return loading ? (
    <Flex className="loader" gap="middle">
      <Spin tip="Loading" size="large"></Spin>
    </Flex>
  ) : (
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
              <Link to="/videoCall">
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
              </Link>
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

          <div class="chat-messages" ref={chatsubdivRef}>
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

export default Chat;
