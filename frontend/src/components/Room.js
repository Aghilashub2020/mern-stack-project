import { useEffect,useState } from 'react'


import Messages from './Messages'
import BackButton from './BackButton'
import RoomName from './RoomName'

import { fetchMessageData } from '../functions'

export default (props) => {
  const [input, setInput] = useState("");

    const messageData = props.messageData
    const inRoom = props.inRoom
    const roomName = props.roomName
    const goBack = props.goBack
    const setMessageData = props.setMessageData
    const roomId = props.roomId
    const userName = props.userName
    
      

const sendMessage = (e, isInput) => {
  if (isInput) {
    if (e.key === "Enter" && roomId !== null) {
      fetch(`https://cool-team-backend.herokuapp.com/messages/${roomId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          text: input,
        }),
      });  
    } 
  } else {
    fetch(`https://cool-team-backend.herokuapp.com/messages/${roomId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        text: input,
      }),
    });
  }
  setInput("")
}

    const renderInput = () => {
      return (
        <div>
          <input
            value={input}
            type="text"
            onChange={(e => e.target.value = input)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(e,true)
              } else if (e.key.length === 1) {
                setInput(input + e.key)
              } else if (e.key === 'Backspace' && input.length !== 0) {
                setInput(input.slice(0, -1))
              }
            }}
            placeholder="Type here"
            
            
          />
        <button onClick={(e)=> sendMessage (e,false) }>Enter</button>
        </div>
      );
    }

    const messageInterval = {
      interval: null,
      start: function(fetchMessageData, setMessageData, roomId) {
        this.interval = setInterval(() => {
          fetchMessageData(setMessageData, roomId)
        }, 1000)
      },
      stop: function() {
        clearInterval(this.interval)
      }
    }
    
    useEffect(() => {
        if (roomId !== null) {
          fetchMessageData(setMessageData, roomId)
          messageInterval.start(fetchMessageData, setMessageData, roomId)
          return () => {
            messageInterval.stop()
          }
        }
    }, [roomId])

    return (
      <div className="room">
        <BackButton goBack={goBack}/>
        <RoomName roomName={roomName}/>
        <Messages messageData={messageData}/>
        {inRoom ? renderInput() : ""}
      </div>
    )
}