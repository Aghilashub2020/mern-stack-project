export default (props) => {
    const messageData = props.messageData
    return (
        <div>
            {Array.isArray(messageData) ? messageData.map((message) => {
                return (
                    <div className="messages" key={message._id} id={message._id}>
                        <h3 className="messageName">{message.name}</h3>
                        <div className="messageBody">
                            <p className="messageText">{message.text}</p>
                        </div>
                    </div>
                )
            }) : ""}
        </div>
    )
}