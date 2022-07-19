import './App.css';
import { useState, useEffect } from 'react';
import Room from './components/Room'
import HomePage from './components/HomePage'

function App() {
  const [roomName, setRoomName] = useState(null)
  const [inRoom, setInRoom] = useState(false)
  const [roomData, setRoomData] = useState(null)
  const [roomId, setRoomId] = useState(null)
  const [messageData, setMessageData] = useState(null)
  const [userName, setUserName] = useState("New user")
  const [textInput, setTextInput] = useState(null)

  const messageInterval = {
    interval: null,
    start: function() {
      this.interval = setInterval(() => {
        fetchMessageData()
      }, 1000)
    },
    stop: function() {
      clearInterval(this.interval)
    }
  }

  const roomInterval = {
    interval: null,
    start: function() {
      this.interval = setInterval(() => {
        fetchRoomData()
      },5000)
    },
    stop: function() {
      clearInterval(this.interval)
    }
  }

  const goBack = () => {
    setInRoom(false)
  }

  async function fetchRoomData(){
    let res = await fetch("https://cool-team-backend.herokuapp.com/rooms", { method: "GET"})
    res = await res.json()
    setRoomData(res)
  }

  async function fetchMessageData(){
    let res = await fetch(`https://cool-team-backend.herokuapp.com/messages/${roomId}`, { method: "GET"})
    res = await res.json()
    setMessageData(res)
    return res
  }

  const inputKeydown = async (e, text) => {
    if (e.key === 'Enter') {
      await fetch(`https://cool-team-backend.herokuapp.com/messages/${roomId}`, { method: "POST", headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        "name": userName,
        "text": text
      })})

      await fetchMessageData()

      e.target.value = ""
      setTextInput("")
    }
  }

  const userNameInput = (e,name,callback) => {
    if (e.key === 'Enter') {
      callback(name)

      e.target.value = ""
    }
  }

  const roomSelect = (e, setRoomName, setRoomId, roomData, setInRoom) => {
    if (e.key === 'Enter') {
      for(let i = 0; i < roomData.length; i++) {
        if (roomData[i].name === e.target.value) {
          setRoomId(roomData[i]._id)
          setInRoom(true)
          setRoomName(e.target.value)
          return
        }
      }
      fetch(`https://cool-team-backend.herokuapp.com/rooms/`, { method: "POST", headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        "name": e.target.value
      })})
        .then(fetchRoomData)
        .then(() => {setRoomName(e.target.value)})
        .then(() => {
          for(let i = 0; i < roomData.length; i++) {
            if (roomData[i].name === roomName) {
              setRoomId(roomData[i]._id)
              setInRoom(true)
              return
            }
          }
        })
    }
    
  }

  const handleInputChange = (e) => {
    setTextInput(e.target.value)
  }

  useEffect(() => {
    if (roomId !== null) {
      fetchMessageData()
      messageInterval.start()
      return () => {
        messageInterval.stop()
      }
    }
  }, [roomId])

  useEffect(() => {
    if (!inRoom) {
      fetchRoomData()
      roomInterval.start()
      return () => {
        roomInterval.stop()
      }
    }
  }, [inRoom])

  return (
    <div className="App">
      {inRoom ? <Room messageData={messageData}
      inRoom={inRoom} handleInputChange={handleInputChange}
      inputKeydown={inputKeydown} textInput={textInput}
      setInRoom={setInRoom}
      roomName={roomName} goBack={goBack}/> :
      <HomePage roomData={roomData} setInRoom={setInRoom}
      setRoomId={setRoomId} userName={userName} setRoomName={setRoomName}
      roomSelect={roomSelect} setUserName={setUserName} userNameInput={userNameInput}/>}
    </div>
  );
};

export default App;
