import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo-name.svg";
import { signUp } from "../../services/API";

export default function Register() {
    const [register, setRegister] = useState([]);
    const [send, setSend] = useState(false);
    const navigate = useNavigate();

    function createRegister({ value, name }) {
        setRegister({
          ...register,
          [name]: value,
        });
    }

    useEffect(() => {
        if (send) {
            signUp(register)
                .then(res => {
                    console.log(res.data)
                    navigate("/")
                })
                .catch(err => console.log(err))
        }
    }, [send])

    function submitThis(event) {
        event.preventDefault();
        setSend(true)
    }

    console.log(register)
    return(
        <Container>
            <Image src={logo} alt="logo"/>
            <Form onSubmit={submitThis}>
                <Input type="text" name="name" onChange=
                    {(e) => createRegister({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }
                placeholder="Nome" />
                <Input type="text" name="cpf" onChange=
                    {(e) => createRegister({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }
                placeholder="CPF" />
                <Input type="email" name="email" onChange=
                    {(e) => createRegister({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }
                placeholder="E-mail" />
                <Input type="password" name="password" onChange=
                    {(e) => createRegister({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }
                placeholder="Senha" />
                <Button type="submit">CADASTRAR</Button>
            </Form>
            <Login onClick={() => navigate('/')}>Já possuí uma conta? Entre</Login>
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
    margin-bottom: 8vh;
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
    margin: 8px 0;
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

const Login = styled.p`
    color: #FFFFFF;
    font-size: 14px;
    text-decoration: underline;
    font-style: italic;

    &:hover {
        color: #1F87EE;
    }
`