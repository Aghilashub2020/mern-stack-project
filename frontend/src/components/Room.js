import { useEffect } from 'react'

import Messages from './Messages'
import BackButton from './BackButton'
import RoomName from './RoomName'

import { fetchMessageData } from '../functions'

export default (props) => {
    const messageData = props.messageData
    const inRoom = props.inRoom
    const inputKeydown = props.inputKeydown
    const roomName = props.roomName
    const goBack = props.goBack
    const setMessageData = props.setMessageData
    const roomId = props.roomId

    const renderInput = () => {
      return (
        <input type="text" onKeyDown={(e) => {inputKeydown(e)}} placeholder="Type here" />
      )
    }

    const messageInterval = {
      interval: null,
      start: function(fetchMessageData, setMessageData, roomId) {
        this.interval = setInterval(() => {
          fetchMessageData(setMessageData, roomId)
        }, 1000)
      },
      stop: function() {
        clearInterval(this.interval)
      }
    }
    
    useEffect(() => {
        if (roomId !== null) {
          fetchMessageData(setMessageData, roomId)
          messageInterval.start(fetchMessageData, setMessageData, roomId)
          return () => {
            messageInterval.stop()
          }
        }
    }, [roomId])

    return (
      <div className="room">
        <BackButton goBack={goBack}/>
        <RoomName roomName={roomName}/>
        <Messages messageData={messageData}/>
        {inRoom ? renderInput() : ""}
      </div>
    )
}