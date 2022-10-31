import styled from "styled-components";
import profile from "../assets/profile.svg";

export default function Header({ logo }) {
    return(
        <Container>
            <Content>
                <Logo src={logo} alt="logo"/>
                <Profile src={profile} alt="profile"/>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 70px;

    display: flex;
    justify-content: center;

    position: fixed;
    top: 0;
`

const Content = styled.div`
    width: 70vw;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Logo = styled.img`
    height: 50px;
`

const Profile = styled.img`
    height: 32px;
`