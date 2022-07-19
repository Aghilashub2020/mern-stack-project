import UserName from "./UserName"
import RoomSelector from "./RoomSelector"

export default (props) => {
    const roomData = props.roomData
    const setInRoom = props.setInRoom
    const setRoomId = props.setRoomId
    const setRoomName = props.setRoomName
    const userName = props.userName
    const setUserName = props.setUserName
    const userNameInput = props.userNameInput
    const roomSelect = props.roomSelect

    return (
        <div className="homePage">
            <UserName userName={userName} onKeyDown={userNameInput} setUserName={setUserName}/>
            <RoomSelector roomData={roomData} setInRoom={setInRoom}
            roomSelect={roomSelect} setRoomName={setRoomName} setRoomId={setRoomId}/>
        </div>
    )
}