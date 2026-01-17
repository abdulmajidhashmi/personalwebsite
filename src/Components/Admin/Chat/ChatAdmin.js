import "./ChatAdmin.css";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Flex, Spin } from "antd";
import { io } from "socket.io-client";
import axiosInstance from "../../api/axiosInstance";
import baseURL from "../../api/BaseURL";

const ChatAdmin = () => {
  const navigate = useNavigate();
  const chatsubdivRef = useRef();
  const [username, setUsername] = useState("");
  const [userDbId, setUserDbId] = useState("");
  const [msg, setMsg] = useState("");
  const [isOnline, setIsOnline] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setloading] = useState(true);



  const transformTime = (value) =>
    new Date(value).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).toLowerCase();

  const getCurrentDateAndTime = () => {

    return new Date();
  }

  var { id: tempUserId } = useParams();


  const obj = { id: tempUserId }

  const socket = useRef(null);

  useEffect(() => {
    console.log(tempUserId);
    const checktoken = async () => {
      const tokendata = await axiosInstance.get("/user/check-token", {
        withCredentials: true,
      });

      if (tokendata.data.success === false) {
        navigate("/login");
      }
    };
    checktoken();
  }, [navigate]);

  useEffect(() => {
    const initializeSocket = async () => {
      const userInfo = await axiosInstance.get("/user/self-detail", {
        withCredentials: true,
      });


      if (userInfo?.data.data.role === 'admin' && tempUserId) {
        socket.current = io(`${baseURL}/chats`, {
          query: { roomName: tempUserId, userId: userInfo.data.data._id },
          withCredentials: true,
        });


        socket.current.on("user-status-change", (statusData) => {

          if (statusData.userId !== userInfo?.data.data._id) {
            setIsOnline(statusData.status);
          }

        })

        socket.current.on('online-users', (onlineUsersList) => {
          if (onlineUsersList.includes(tempUserId)) {
            setIsOnline(true);
          } else {
            setIsOnline(false);
          }

        })

        socket.current.on("recieveMessage", ({ text, sentAt }) => {

          console.log(text)
          if (text) {
            playAudio("message-notification");
            setMessages((prev) => [...prev, { place: "left", text, sentAt }]);
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
  }, [tempUserId]);

  useEffect(() => {
    if (chatsubdivRef.current) {
      chatsubdivRef.current.scrollTop = chatsubdivRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(obj);
        const { data } = await axiosInstance.post(
          "/user/oneuserdetail",
          obj,
          { withCredentials: true }
        );
        setUsername(data?.data?.name);
        setUserDbId(data?.data?._id)

        const chatMessages = await axiosInstance.post('/chat/userChat', { userId: data?.data?._id }, { withCredentials: true })
        console.log(".................", chatMessages);
        console.log(chatMessages.data.data.messages)
        setMessages(chatMessages.data.data.messages)


        setloading(false);
      } catch (err) {
        console.error(err);
        setloading(false);
      }
    };



    if (tempUserId) {
      fetchUserDetails();
    }
  }, [tempUserId]);

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
    const sentAt = getCurrentDateAndTime();

    if (socket.current) {
      setMessages((prev) => [...prev, { userType: "admin", text: msg, sentAt }]);
      socket.current.emit("sendMessage", { use: tempUserId, msg, userType: "admin", userDbId, sentAt });

      playAudio("send-notification");
      setMsg("");
      console.log("msg sent");

    }
  };

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
              <p class="chat-status">{isOnline === true ? "Online" : "Offline"}</p>
            </div>
          </div>
          <div class="header-actions">
            <Link to="/videoCall">
              {" "}
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
          {messages.map(({ userType, text, sentAt }, index) => (
            <>
              <div
                key={index}
                className={
                  userType === "right" || userType === "admin" ? "message sent" : "message received"
                }
              >
                {userType === "right" || userType === "admin" ? null : (
                  <img
                    src="https://avatar.iran.liara.run/public"
                    alt="Contact"
                    class="message-avatar"
                  />
                )}

                <div class="message-content">
                  <div class="message-bubble">
                    <p>{text}</p>
                  </div>
                  <span class="message-timestamp">{transformTime(sentAt)}</span>
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

export default ChatAdmin;
