import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo-name.svg";
import { signIn } from "../../services/API";
import { AuthContext } from "../../provider/auth";
import AlertBOX from "../../services/alert";

export default function Login() {
    const [login, setLogin] = useState([]);
    const [send, setSend] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // ---------------------------------------------
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');
    const [action, setAction] = useState();
    const [secButton, setSecButton] = useState({});
    // ---------------------------------------------

    function makeLogin({ value, name }) {
        setLogin({
          ...login,
          [name]: value,
        });
    }

    function submitThis(event) {
        event.preventDefault();
        setSend(true)
    }

    useEffect(() => {
        if(send) {
            signIn(login)
                .then(res => {
                    console.log(res.data);
                    setUser({
                        ...user,
                        name: res.data.name,
                        membership: res.data.membership,
                        token: res.data.token
                    });

                    if (res.data.membership === null) {
                        navigate("/subscriptions");    
                    } else {
                        navigate("/home");
                    }
                })
                .catch(() => {
                    console.log("Deu Ruim")
                    // ---------------------------------------------
                    setInfo('Ops! Parece que não conseguimos conectar você no site...');
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
    }, [send]);

    console.log(login);
    console.log(user);
    return(
        <Container>
            <Image src={logo} alt="logo"/>
            <Form onSubmit={submitThis}>
                <Input type="email" name="email" onChange=
                    {(e) => makeLogin({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }
                placeholder="E-mail" />
                <Input type="password" name="password" onChange=
                    {(e) => makeLogin({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }
                placeholder="Senha" />
                <Button type="submit">ENTRAR</Button>
            </Form>
            <Register onClick={() => navigate('/sign-up')}>Não possuí uma conta? Cadastre-se</Register>
            <AlertBOX show={show} action={action} info={info} confirmMessage={confirmMessage} secButton={secButton} />
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