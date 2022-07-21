import './App.css';
import { useState, useEffect } from 'react';
import Room from './components/Room'
import HomePage from './components/HomePage'

import { fetchRoomData } from './functions'

function App() {
  const [roomName, setRoomName] = useState(null)
  const [inRoom, setInRoom] = useState(false)
  const [roomData, setRoomData] = useState(null)
  const [roomId, setRoomId] = useState(null)
  const [messageData, setMessageData] = useState(null)
  const [userName, setUserName] = useState("New user")
  const [roomIsFound, setRoomIsFound] = useState(false)

  const goBack = () => {
    setRoomName(null)
    setRoomId(null)
    setRoomIsFound(false)
    setInRoom(false)
    setMessageData(null)
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
      if (userName !== "New user") {
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
            .then(() => fetchRoomData(setRoomData))
            .then(() => {
              for(let i = 0; i < roomData.length; i++) {
                if (roomData[i].name === roomName) {
                  setRoomId(roomData[i]._id)
                  setRoomIsFound(true)
                  setInRoom(true)
                  return
                }
              }
            })
          }
        }
      }
  }

  const roomInterval = {
    interval: null,
    start: function(fetchRoomData, setRoomData) {
      this.interval = setInterval(() => {
        fetchRoomData(setRoomData)
      },5000)
    },
    stop: function() {
      clearInterval(this.interval)
    }
  }

  useEffect(() => {
    if (!inRoom) {
      fetchRoomData(setRoomData)
      roomInterval.start(fetchRoomData, setRoomData)
      return () => {
        roomInterval.stop()
      }
    }
  }, [inRoom])

  return (
    <div className="App">
      {(inRoom && (roomId) !== null) ? <Room messageData={messageData}
      roomId={roomId} inRoom={inRoom}
      inputKeydown={inputKeydown}
      setMessageData={setMessageData} setInRoom={setInRoom}
      roomName={roomName} goBack={goBack}/> :
      <HomePage roomData={roomData} setInRoom={setInRoom}
      setRoomId={setRoomId} userName={userName} setRoomName={setRoomName}
      roomSelect={roomSelect} setUserName={setUserName} userNameInput={userNameInput}/>}
    </div>
  );
};

export default App;
