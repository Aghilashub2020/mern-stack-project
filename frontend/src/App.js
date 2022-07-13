import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [inRoom, setInRoom] = useState(false)
  const [roomData, setRoomData] = useState(false)

  useEffect(() => {
    async function fecthData(){
      let res = await fetch("http://localhost:5000/rooms", { method: "GET"})
      res = await res.json()
      setRoomData(res)
    }
    fecthData()
  }, [])

  return (
    <div className="App">
      <h1>Hello</h1>
      <div>
        {Array.isArray(roomData) ? roomData.map((room, index) => <p key={index}>{room.name}</p>) : "Not an array"}
      </div>
    </div>
  );
};

export default App;
