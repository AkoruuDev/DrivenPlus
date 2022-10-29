/*
    show: boolean
    action: func()
    info: ""
    confirmMessage: ""
    secButton: {
        show: boolean,
        action: func(),
        message: ""
    }
*/

export default function alertBOX({ show, action, info, confirmMessage, secButton }) {
    const message = info;
    return(
        <>{show ?
            <Alert
                message={message}
                confirmMessage={confirmMessage}
                secButton={secButton}
                action={action}
            /> : ""
        }</>
    )
}

function Alert({ message, confirmMessage, secButton, action }) {
    return(
        <div>
            <p>{message}</p>
            <div onClick={() => action()}>{confirmMessage}</div>
            {secButton.show ?
                <div onClick={() => secButton.action}>{secButton.message}</div> :
                ""
            }
        </div>
    )
}