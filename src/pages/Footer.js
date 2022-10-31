import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { AuthContext } from "../provider/auth";
import { cancelPlan } from "../services/API";

export default function Footer() {
    const [send, setSend] = useState();
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (send) {
            cancelPlan(user.token)
                .then(() => {
                    navigate('/subscriptions')
                })
        }
    }, [send])

    return(
        <Container>
            <Content>
                <Button onClick={() => navigate('/subscriptions')}>Mudar Plano</Button>
                <Button cancel={true} onClick={() => setSend(true)}>Cancelar Plano</Button>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
`

const Content = styled.div`
    width: 70vw;
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Button = styled.div`
    width: 100%;
    padding: 12px 0;
    margin: 4px 0;
    color: white;
    font-weight: 700;
    border-radius: 8px;
    background-color: ${props => props.cancel ? '#FF5555' : '#FF55FF'};
    display: flex;
    justify-content: center;
`