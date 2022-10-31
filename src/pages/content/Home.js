import Header from "../Header";
import Footer from "../Footer";
import { useContext } from "react";
import { AuthContext } from "../../provider/auth";
import styled from "styled-components";

export default function Home() {
    const { user } = useContext(AuthContext);
    console.log(user)

    return(
        <>
            <Header />
            <Container>
                <Title>Olá, {user.name}</Title>
                <Content>
                    {user.membership.perks.map(perk => <Box key={perk.id} e={perk} />)}
                </Content>
            </Container>
            <Footer />
        </>
    )
}

function Box({ e }) {
    return (
        <a href={e.link} target={'_blank'}><Button>{e.title}</Button></a>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 25px 0;
    background-color: #0e0e13;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: white;
`

const Content = styled.div`
    width: 70vw;
    height: 65vh;
    margin: 26px 0;
    display: flex;
    flex-direction: column;
`

const Button = styled.div`
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    background-color: #FF55FF;
    border-radius: 8px;

    color: white;
    font-weight: 700;
    font-size: 18px;
    font-family: 'Roboto', sans-serif;

    display: flex;
    align-items: center;
    justify-content: center;
`