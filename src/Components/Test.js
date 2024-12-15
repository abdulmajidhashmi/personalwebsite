import { useEffect } from 'react';
import io from 'socket.io-client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const socket =  io('https://personalwebsitebe.vercel.app');
const Test = ()=>{

    const data = useSelector(state => state.User.value);

    const [up,setup] = useState();
    const [message,setmessage] = useState('');
    const [messageData,setmessageData] =  useState([]);

useEffect(()=>{

    if(data.number){
socket.emit('joinRoom',data.number);

}
    socket.on('recieveMessage',(data)=>{

        
        setmessageData((prev) =>[...prev,data.message]);
        console.log(data.message);
        
        })
        // return()=>{

        //     socket.disconnect();
        // }
},[data.number])
   
const sending= (event)=>{
if(event.key ==="Enter"){
console.log(event.target.value);
const touserId = event.target.value;
console.log(message);

    socket.emit('sendMessage',{touserId,message});
}

    
}

const sendingMessage = (event)=>{

    const hi = event.target.value;
    console.log(message);

setmessage(hi);
    
}


    return (

        <>

        <h1>

            
        </h1>

        <input placeholder='Enter a number ' onKeyDown={sending}/>
        <input placeholder='write a message' onChange={sendingMessage}/>

        {messageData.map((dat, index) => (
  <p key={index}>{dat}</p>
))}

        
        </>
    )
}

export default Test;