import styled from "styled-components";
import logo from "../../assets/logo-name.svg";

export default function Login() {
    return(
        <Container>
            <Image src={logo} alt="logo"/>
            <Form>
                <Input type="email" name="email" placeholder="E-mail" />
                <Input type="password" name="password" placeholder="Senha" />
                <Button>ENTRAR</Button>
            </Form>
            <Register>Não possuí uma conta? Cadastre-se</Register>
        </Container>
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

const Image = styled.img`
    width: 80vw;
    margin-bottom: 15vh;
`

const Form = styled.form`
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Input = styled.input`
    width: 100%;
    height: 52px;
    border-radius: 8px;
    margin: 16px 0;
    padding: 0 14px;
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    border: 1px solid #7E7E7E;
    color: #7E7E7E;
`

const Button = styled.button`
    width: 100%;
    height: 52px;
    margin: 24px 0;
    border-radius: 8px;
    background-color: #FF4791;
    color: #fafafa;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
`

const Register = styled.p`
    color: #FFFFFF;
    font-size: 14px;
    text-decoration: underline;
    font-style: italic;

    &:hover {
        color: #1F87EE;
    }
`