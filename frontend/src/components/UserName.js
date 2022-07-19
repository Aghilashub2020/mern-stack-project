export default (props) => {
    const setUserName = props.setUserName
    const onKeyDown = props.onKeyDown

    return (
        <div className="userNameInput">
            <h3>Enter User Name</h3>
             <input type="text" onKeyDown={(e) => {onKeyDown(e, e.target.value, setUserName)}} placeholder="Type here" />
        </div>
    )
}