export default (props) => {
    const goBack = props.goBack

    return (
        <button className="backButton" onClick={goBack}>
            <h2>
                Back
            </h2>
        </button>
    )
}