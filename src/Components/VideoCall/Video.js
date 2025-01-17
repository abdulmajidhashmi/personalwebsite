import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import './Video.css';
import { io } from "socket.io-client";
import baseURL from "../api/BaseURL";
import { Link, useNavigate } from "react-router-dom";

const Video = () => {
    const videoRef = useRef();
    const videoGridRef = useRef(null);
    const [time, setTime] = useState(0);
    const [peerId, setPeerId] = useState("");
    const socket = useRef();
    const navigate = useNavigate();
    const peerRef = useRef(null);

    useEffect(() => {
        const ROOM_ID = "12345"; // Example Room ID
        const peer = new Peer();
        peerRef.current = peer;
        socket.current = io(baseURL);

        const handleOpen = (id) => {
            setPeerId(id);
            socket.current.emit("join-room", { roomId: ROOM_ID, userId: id });
        };

        const handleStream = (stream) => {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(err => {
                console.error("Error playing the video:", err);
            });

            peer.on("call", (call) => {
                call.answer(stream);
                call.on("stream", (userStream) => {
                    addVideoStream(userStream);
                });
            });

            socket.current.on("user-connected", (userId) => {
                connectToNewUser(userId, stream, peer);
            });
        };

        const handleUserDisconnected = (userId) => {
            console.log("User disconnected:", userId);
        };

        peer.on("open", handleOpen);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(handleStream)
            .catch(err => {
                console.error("Error accessing media devices:", err);
            });

        socket.current.on("user-disconnected", handleUserDisconnected);

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
            peer.off("open", handleOpen);
            socket.current.off("user-disconnected", handleUserDisconnected);
        };
    }, []);

    const connectToNewUser = (userId, stream, peer) => {
        const call = peer.call(userId, stream);
        call.on("stream", (userStream) => {
            addVideoStream(userStream);
        });
    };

    const addVideoStream = (stream) => {
        const video = document.createElement("video");
        video.classList.add('server-video');
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            video.play();
        });
        videoGridRef.current.append(video);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formatTime = (seconds) => {
        const sec = seconds % 60;
        const min = Math.floor((seconds % 3600) / 60);
        const hours = Math.floor(seconds / 3600);

        return hours > 0 ? `${hours}:${min}:${sec}` : `${min}:${sec}`;
    };

    const backtopage =()=>{

      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
    }

    if (peerRef.current) {
        peerRef.current.disconnect();
        peerRef.current.destroy();
    }

    if (socket.current) {
        socket.current.disconnect();
    }

    navigate(-1);
        navigate(-1);
    }
    return(
        <>

      
        <section id="video_call">
  
  <div class="main-grid">
   
    <div class="header">
      <div class="header-left">
        <div class="call-status">
          <span class="status-indicator"></span>
          <span class="status-text">Call in progress</span>
        </div>
        <span class="call-duration">{formatTime(time)}</span>
      </div>
      <div class="header-right">
        <div class="control-btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div class="control-btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
    </div>

   
    <div class="content">
      <div class="video-grid">
      
        <div class="main-video" ref={videoGridRef}>
          
          
          <div class="main-video-caption">
            <p>Dr. Abdul Wase Hashmi</p>
          </div>
        </div>

        
        <div class="side-panel">
       
          <div class="secondary-video">
          

            <video  alt="Secondary video stream" className="livevid" ref={videoRef} muted></video>
            <div class="secondary-video-caption">
              <p>You</p>
            </div>
          </div>

          
          <div class="controls-panel">
            <div class="controls-group">
              <div class="control-round-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div class="control-round-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="control-round-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
           <div class="end-call-btn" onClick={backtopage}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              End Call
            </div>
          </div>

          
          <div class="notes-section">
            <h3>Session Notes</h3>
            <textarea  className="notes-area" placeholder="Take notes during the session..."></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        
        </>
    )
}

export default Video;