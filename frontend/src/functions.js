// Function that will fetch current data of existing rooms
function fetchRoomData(setRoomData){
    fetch("https://cool-team-backend.herokuapp.com/rooms", { method: "GET", mode: "cors"})
      .then(data => data.json())
      .then(data => setRoomData(data))
  }

export { fetchRoomData }


// Function that will fetch message data of current room
function fetchMessageData(setMessageData, roomId){
    fetch(`https://cool-team-backend.herokuapp.com/messages/${roomId}`, { method: "GET", mode: "cors"})
      .then(data => data.json())
      .then(data => setMessageData(data))
}

export { fetchMessageData }