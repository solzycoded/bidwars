const Alert = () => {
    return (
        <div 
            id="alert" 
            className="d-none">
            <div className="d-flex fixed-bottom justify-content-evenly alert-container">

                <button className="alert-btn alert-message-container">
                    <span className="alert-message-content"></span>
                </button>

            </div>
        </div>
    )
}

export default Alert;