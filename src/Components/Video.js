import {useEffect, useRef} from "react";
import './Video.css';
const Video =()=>{

    const videoRef = useRef();

    useEffect(()=>{

        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((stream)=>{

            videoRef.current.srcObject = stream;
            videoRef.current.play();

        })
    })
    return(
        <>

        <h1>video</h1>
        <div className="liveviddiv">
            <div className="liveviddiv2">
            <video  className="livevid" ref={videoRef}></video>
            </div>
        </div>
        
        </>
    )
}

export default Video;