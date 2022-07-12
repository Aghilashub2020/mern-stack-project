import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [inRoom, setInRoom] = useState(false)
  const [roomId, setRoomId] = useState(null)

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
};

export default App;
