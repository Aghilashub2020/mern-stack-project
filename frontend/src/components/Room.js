import Messages from './Messages'

export default (props) => {
    const messageData = props.messageData
    const inRoom = props.inRoom
    const handleInputChange = props.handleInputChange
    const inputKeydown = props.inputKeydown
    const textInput = props.textInput
    const roomName = props.roomName

    const renderInput = () => {
        return (
          <input type="text" onChange={(e) => handleInputChange(e)} onKeyDown={(e) => {inputKeydown(e, textInput)}} placeholder="Type here" />
        )
      }

    return (
        <div className="room">
            <Messages messageData={messageData}/>
            {inRoom? renderInput() : ""}
        </div>
    )
}