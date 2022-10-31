import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo-name.svg";
import { signUp } from "../../services/API";
import AlertBOX from "../../services/alert";

export default function Register() {
    const [register, setRegister] = useState([]);
    const [send, setSend] = useState(false);
    const navigate = useNavigate();

    // ---------------------------------------------
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');
    const [action, setAction] = useState();
    const [secButton, setSecButton] = useState({});
    // ---------------------------------------------

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
                .catch(err => {
                    console.log(err)
                    // ---------------------------------------------
                    setInfo('Ops! Parece que não conseguimos cadastrar você no Driven+ ...');
                    setConfirmMessage('Tudo bem, vou tentar de novo');
                    setAction(() => function () {
                        document.location.reload()
                    })
                    setSecButton({
                        ...secButton,
                        show: false
                    });
                    setShow(true);
                    // ---------------------------------------------
                })
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
            <Background show={show}><AlertBOX show={show} action={action} info={info} confirmMessage={confirmMessage} secButton={secButton} /></Background>
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

const Background = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #00000086;

    display: ${props => props.show ? 'block' : 'none'};

    position: fixed;
    top: 0;
    left: 0;
`