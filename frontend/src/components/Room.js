import Messages from './Messages'
import BackButton from './BackButton'
import RoomName from './RoomName'

export default (props) => {
    const messageData = props.messageData
    const setInRoom = props.setInRoom
    const inRoom = props.inRoom
    const handleInputChange = props.handleInputChange
    const inputKeydown = props.inputKeydown
    const textInput = props.textInput
    const roomName = props.roomName
    const goBack = props.goBack

    const renderInput = () => {
        return (
          <input type="text" onChange={(e) => handleInputChange(e)} onKeyDown={(e) => {inputKeydown(e, textInput)}} placeholder="Type here" />
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