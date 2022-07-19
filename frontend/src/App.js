import './App.css';
import { useState, useEffect } from 'react';
import Room from './components/Room'
import RoomSelector from './components/RoomSelector'
import UserName from './components/UserName'

function App() {
  const [roomName, setRoomName] = useState(null)
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

  const goBack = () => {
    setInRoom(false)
  }

  async function fetchRoomData(){
    let res = await fetch("https://msbjs.herokuapp.com/rooms", { method: "GET"})
    res = await res.json()
    setRoomData(res)
  }

  async function fetchMessageData(){
    let res = await fetch(`https://msbjs.herokuapp.com/messages/${roomId}`, { method: "GET"})
    res = await res.json()
    setMessageData(res)
  }

  const inputKeydown = async (e, text) => {
    if (e.key === 'Enter') {
      await fetch(`https://msbjs.herokuapp.com/messages/${roomId}`, { method: "POST", headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        "name": userName,
        "text": text
      })})

      await fetchMessageData()
    }
  }

  const userNameInput = (e,name,callback) => {
    if (e.key === 'Enter') {
      callback(name)
    }
  }

  const handleInputChange = (e) => {
    setTextInput(e.target.value)
  }

  useEffect(() => {
    fetchRoomData()
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
      {!inRoom ? <RoomSelector roomData={roomData}
      setInRoom={setInRoom}
      setRoomName={setRoomName} setRoomId={setRoomId}/> :
      ""}
      {inRoom ? <Room messageData={messageData}
      inRoom={inRoom} handleInputChange={handleInputChange}
      inputKeydown={inputKeydown} textInput={textInput}
      setInRoom={setInRoom}
      roomName={roomName} goBack={goBack}/> :
      <UserName onKeyDown={userNameInput} setUserName={setUserName}/>}
    </div>
  );
};

export default App;
