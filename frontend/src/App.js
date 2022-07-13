import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [inRoom, setInRoom] = useState(false)
  const [roomData, setRoomData] = useState(null)
  const [roomId, setRoomId] = useState(null)
  const [messageData, setMessageData] = useState(null)
  const [userName, setUserName] = useState("Default")
  const [textInput, setTextInput] = useState(null)

  async function fecthRoomData(){
    let res = await fetch("http://localhost:5000/rooms", { method: "GET"})
    res = await res.json()
    setRoomData(res)
  }

  async function fetchMessageData(id){
    let res = await fetch(`http://localhost:5000/messages/${roomId}`, { method: "GET"})
    res = await res.json()
    setMessageData(res)
  }

  const inputKeydown = (e, text) => {
    if (e.key === 'Enter') {
      fetch(`http://localhost:5000/messages/${roomId}`, { method: "POST", headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        "name": userName,
        "text": text
      })})

      fetchMessageData()
    }
  }

  const handleInputChange = (e) => {
    setTextInput(e.target.value)
  }

  const renderInput = () => {
    return (
      <input type="text" onChange={(e) => handleInputChange(e)} onKeyDown={(e) => {inputKeydown(e,textInput)}}></input>
    )
  }

  useEffect(() => {
    fecthRoomData()
  }, [])

  useEffect(() => {
    if (roomId !== null) {
      fetchMessageData()
    }
  }, [roomId])

  return (
    <div className="App">
      <h1>Hello</h1>
      <div>
        {Array.isArray(messageData) ? messageData.map((message) => {
          return (
            <div key={message._id}>
              <h2>{message.name}</h2>
              <h3>{message.text}</h3>
            </div>
          )
        }) : "You are not in a room"}
      </div>
        {inRoom ? renderInput() : ""}
      <div>
        {Array.isArray(roomData) ? roomData.map((room) => {
          return (
            <button id={room._id} key={room._id} onClick={() => {setRoomId(room._id); setInRoom(true)}}>{room.name}</button>
          )
        }) : "Not an array"}
      </div>
    </div>
  );
};

export default App;
