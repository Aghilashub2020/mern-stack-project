export default (props) => {
    const roomData = props.roomData
    const setRoomId = props.setRoomId
    const setInRoom = props.setInRoom
    const setRoomName = props.setRoomName
    const roomSelect = props.roomSelect

    const findRoomName = (id) => {
        for (let i = 0; i < roomData.length; i++) {
            if (roomData[i]._id === id) {
                setRoomName(roomData[i].name)
            }
        }
    }

    return (
        <div className="roomInput">
            <h3>Choose A Room:</h3>
            <input list="room-names" name="" placeholder="Type here" 
            onKeyDown={(e) => {roomSelect(e, setRoomName, setRoomId, roomData, setInRoom)}}/>
            <datalist id="room-names">
                {Array.isArray(roomData) ? roomData.map((room) => {
                return (
                    /* 
                    <h1 id={room._id} key={room._id}
                    onClick={() => {setRoomId(room._id); setInRoom(true); findRoomName(room._id)}}>{room.name}</h1>
                    */
                    <option value={room.name} key={room._id}/>
                )
            }) : ""}
            </datalist>
            
        </div>
    )
}