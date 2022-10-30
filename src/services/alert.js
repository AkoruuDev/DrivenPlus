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

import styled from "styled-components";

export default function AlertBOX({ show, action, info, confirmMessage, secButton }) {
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
        <Container>
            <Message>{message}</Message>
            <ConfirmBox>
                <Button onClick={() => action()}>{confirmMessage}</Button>
                {secButton.show ?
                    <Button secBut={secButton.show} onClick={() => secButton.action}>{secButton.message}</Button> :
                    ""
                }
            </ConfirmBox>
        </Container>
    )
}

const Container = styled.div`
    width: 75vw;
    padding: 25px 0;
    border-radius: 18px;
    background-color: #D8D8D8;
    box-shadow: 0 4px 10px 4px #a1a1a1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 20vh;
    left: 12.5vw;
`

const Message = styled.p`
    width: 65vw;
    font-weight: 700;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const ConfirmBox = styled.div`
    width: 65vw;
    margin-top: 24px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Button = styled.div`
    width: 100%;
    padding: 8px 12px;
    margin: 8px;
    border-radius: 12px;
    background-color: ${props => props.secBut ? '#99WFFFF' : '#E9E9E9'};

    display: flex;
    justify-content: center;

    &:hover {
        cursor: pointer;
        background-color: #f1f1f1;
    }
`