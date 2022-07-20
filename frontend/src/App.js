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
  const [roomIsFound, setRoomIsFound] = useState(false)

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
    setRoomName(null)
    setRoomId(null)
    setRoomIsFound(false)
    setInRoom(false)
    setMessageData(null)
  }

  function fetchRoomData(){
    fetch("https://cool-team-backend.herokuapp.com/rooms", { method: "GET"})
      .then(data => data.json())
      .then(data => setRoomData(data))
  }

  function fetchMessageData(){
    fetch(`https://cool-team-backend.herokuapp.com/messages/${roomId}`, { method: "GET"})
      .then(data => data.json())
      .then(data => setMessageData(data))
  }

  const inputKeydown = (e) => {
    if (e.key === 'Enter' && roomId !== null) {
      fetch(`https://cool-team-backend.herokuapp.com/messages/${roomId}`, { method: "POST", headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        "name": userName,
        "text": e.target.value
      })})

      fetchMessageData()

      e.target.value = ""
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
          setRoomName(e.target.value)
          setRoomId(roomData[i]._id)
          setRoomIsFound(true)
          setInRoom(true)
          return
        }
      }
      if (!roomIsFound){
        fetch(`https://cool-team-backend.herokuapp.com/rooms/`, { method: "POST", headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        }, body: JSON.stringify({
        "name": e.target.value
        })})
          .then(fetchRoomData)
          .then(() => {
            for(let i = 0; i < roomData.length; i++) {
              if (roomData[i].name === roomName) {
                setRoomId(roomData[i]._id)
                return
              }
            }
          })
          .then(setInRoom(true), setRoomIsFound(true))
        }
      }
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
      {(inRoom && (roomId) !== null) ? <Room messageData={messageData}
      inRoom={inRoom}
      inputKeydown={inputKeydown}
      setInRoom={setInRoom}
      roomName={roomName} goBack={goBack}/> :
      <HomePage roomData={roomData} setInRoom={setInRoom}
      setRoomId={setRoomId} userName={userName} setRoomName={setRoomName}
      roomSelect={roomSelect} setUserName={setUserName} userNameInput={userNameInput}/>}
    </div>
  );
};

export default App;
