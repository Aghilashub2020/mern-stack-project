import './App.css';
import { useState, useEffect } from 'react';
import Room from './components/Room'
import RoomSelector from './components/RoomSelector'

function App() {
  const [inRoom, setInRoom] = useState(false)
  const [roomData, setRoomData] = useState(null)
  const [roomId, setRoomId] = useState(null)
  const [messageData, setMessageData] = useState(null)
  const [userName, setUserName] = useState("Default")
  const [textInput, setTextInput] = useState(null)

  const messageInterval = {
    interval: null,
    start: function() {
      this.interval = setInterval(() => {
        fetchMessageData()
      }, 2000)
    },
    stop: function() {
      clearInterval(this.interval)
    }
  }

  async function fecthRoomData(){
    let res = await fetch("http://localhost:5000/rooms", { method: "GET"})
    res = await res.json()
    setRoomData(res)
  }

  async function fetchMessageData(){
    let res = await fetch(`http://localhost:5000/messages/${roomId}`, { method: "GET"})
    res = await res.json()
    setMessageData(res)
  }

  const inputKeydown = async (e, text) => {
    if (e.key === 'Enter') {
      await fetch(`http://localhost:5000/messages/${roomId}`, { method: "POST", headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        "name": userName,
        "text": text
      })})

      await fetchMessageData()
    }
  }

  const handleInputChange = (e) => {
    setTextInput(e.target.value)
  }

  useEffect(() => {
    fecthRoomData()
  }, [])

  useEffect(() => {
    if (roomId !== null) {
      fetchMessageData()
      messageInterval.start()
      return () => {
        messageInterval.stop()
      }
    }
  }, [roomId])

  return (
    <div className="App">
      <RoomSelector roomData={roomData} setInRoom={setInRoom} setRoomId={setRoomId}/>
      <Room messageData={messageData}
      inRoom={inRoom} handleInputChange={handleInputChange} 
      inputKeydown={inputKeydown} textInput={textInput}/>
    </div>
  );
};

export default App;
