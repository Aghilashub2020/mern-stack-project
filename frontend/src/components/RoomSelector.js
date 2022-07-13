export default (props) => {
    const roomData = props.roomData
    const setRoomId = props.setRoomId
    const setInRoom = props.setInRoom

    return (
        <div className="roomSelector">
            {Array.isArray(roomData) ? roomData.map((room) => {
                return (
                    <h1 id={room._id} key={room._id} onClick={() => {setRoomId(room._id); setInRoom(true)}}>{room.name}</h1>
                )
            }) : ""}
        </div>
    )
}