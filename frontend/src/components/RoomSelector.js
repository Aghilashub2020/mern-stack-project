export default (props) => {
    const roomData = props.roomData
    const setRoomId = props.setRoomId
    const setInRoom = props.setInRoom
    const setRoomName = props.setRoomName

    const findRoomName = (id) => {
        for (let i = 0; i < roomData.length; i++) {
            if (roomData[i]._id === id) {
                setRoomName(roomData[i].name)
            }
        }
    }

    return (
        <div className="roomSelector">
            {Array.isArray(roomData) ? roomData.map((room) => {
                return (
                    <h1 id={room._id} key={room._id}
                    onClick={() => {setRoomId(room._id); setInRoom(true); findRoomName(room._id)}}>{room.name}</h1>
                )
            }) : ""}
        </div>
    )
}