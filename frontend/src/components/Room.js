import Messages from './Messages'
import BackButton from './BackButton'
import RoomName from './RoomName'

export default (props) => {
    const messageData = props.messageData
    const inRoom = props.inRoom
    const inputKeydown = props.inputKeydown
    const roomName = props.roomName
    const goBack = props.goBack

    const renderInput = () => {
        return (
          <input type="text" onKeyDown={(e) => {inputKeydown(e)}} placeholder="Type here" />
        )
      }

    return (
      <div className="room">
        <BackButton goBack={goBack}/>
        <RoomName roomName={roomName}/>
        <Messages messageData={messageData}/>
        {inRoom ? renderInput() : ""}
      </div>
    )
}