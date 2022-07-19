export default (props) => {
    const setUserName = props.setUserName
    const onKeyDown = props.onKeyDown
    const userName = props.userName

    return (
        <div className="userNameInput">
            <h3>{(userName !== "New user") ? `Your Username is ${userName}` : "Enter User Name:"}</h3>
             <input type="text" onKeyDown={(e) => {onKeyDown(e, e.target.value, setUserName)}} placeholder="Type here" />
        </div>
    )
}
