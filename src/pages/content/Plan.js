import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components";
import { AuthContext } from "../../provider/auth";
import { showPlan, subscribePlan } from "../../services/API";
import arrow from "../../assets/arrow.svg";
import money from "../../assets/money.svg";
import list from "../../assets/list.svg";
import AlertBOX from "../../services/alert";

export default function Plan() {
    const { PLAN_ID } = useParams();
    const { user } = useContext(AuthContext);
    const [plan, setPLan] = useState(undefined);
    const [send, setSend] = useState(false);
    const [sub, setSub] = useState({membershipId: Number(PLAN_ID)});
    const navigate = useNavigate();

    // ---------------------------------------------
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');
    const [action, setAction] = useState();
    const [secButton, setSecButton] = useState({});
    // ---------------------------------------------

    useEffect(() => {
        showPlan(PLAN_ID, user.token)
            .then(res => {
                setPLan(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (send) {
            subscribePlan(sub, user.token)
                .then(res => {
                    console.log(res.data)
                    navigate('/home');
                })
                .catch(err => {
                    console.log(err)
                    // ---------------------------------------------
                    setInfo('Ops... Acho que deu algum problema no seu pedido');
                    setConfirmMessage('Tudo bem, vou tentar de novo');
                    setAction(() => function () {setShow(false)})
                    setSecButton({
                        ...secButton,
                        show: false
                    });
                    setShow(true);
                    // --------------------------------------------- 
                })
        }
    }, [send])

    function subscribe({ value, name }) {
        setSub({
          ...sub,
          [name]: value
        });
    }

    function submitThis(event) {
        event.preventDefault();
        // ---------------------------------------------
        setInfo(`Tem certeza que deseja assinar o plano ${plan.name} (${plan.price})?`);
        setConfirmMessage('SIM');
        setAction(() => function () {setSend(true)})
        setSecButton({
            ...secButton,
            show: true,
            action: () => setShow(false),
            message: 'NÃO'
        });
        setShow(true);
        // --------------------------------------------- 
    }
    
    if (plan === undefined) {
        return(<Container><Title>Loading...</Title></Container>)
    }

    console.log(sub)
    return(
        <>
            {plan !== {} ?
                <Container>
                    <Arrow src={arrow} alt="arrow" onClick={() => navigate('/subscriptions')} />
                    <Image src={plan.image} alt="logo"/>
                    <Title>{plan.name}</Title>
                    <InfoBox>
                        <TitleBox><img src={list} alt="list"/><InfoTitle>Benefícios:</InfoTitle></TitleBox>
                        {plan.perks.map((perk, i) => <Text key={i}>{i + 1}. {perk.title}</Text>)}
                        <TitleBox><img src={money} alt="money"/><InfoTitle>Preço:</InfoTitle></TitleBox>
                        <Text>R$ {plan.price} cobrados mensalmente</Text>
                    </InfoBox>
                    <Form onSubmit={submitThis}>
                        <Input type="text" name="cardName" onChange=
                            {(e) => subscribe({
                                    name: e.target.name,
                                    value: e.target.value
                                })
                            }
                        placeholder="nome impresso no cartão" />
                        <Input type="text" name="cardNumber" onChange=
                            {(e) => subscribe({
                                    name: e.target.name,
                                    value: e.target.value
                                })
                            }
                        placeholder="Digitos do cartão" />
                        <div>
                            <Input type="password" name="securityNumber" onChange=
                                {(e) => subscribe({
                                        name: e.target.name,
                                        value: Number(e.target.value)
                                    })
                                }
                            placeholder="CVV" />
                            <Input type="month" name="expirationDate" onChange=
                                {(e) => subscribe({
                                        name: e.target.name,
                                        value: e.target.value
                                    })
                                }
                            placeholder="Validade" />
                        </div>
                        <Button type="submit">ASSINAR</Button>
                    </Form>
                    <Background show={show}><AlertBOX show={show} action={action} info={info} confirmMessage={confirmMessage} secButton={secButton} /><Close onClick={() => setShow(false)}>x</Close></Background>
                </Container>
            : ""}
        </>
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

const Arrow = styled.img`
    position: fixed;
    top: 4vh;
    left: 10vw;
`

const Image = styled.img`
    height: 95px;
    margin: 12px;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: white;
`

const InfoBox = styled.div`
    margin: 18px 0;
`

const InfoTitle = styled.p`
    width: 70vw;
    margin: 8px;
    font-size: 16px;
    color: white;
`

const Text = styled.p`
    margin-left: 8px;
    font-size: 14px;
    color: white;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 70vw;

    & div {
        display: flex;
        justify-content: space-between;
        width: 100%;

        & input {
            width: 48%;
        }
    }
`

const Input = styled.input`
    margin: 4px 0;
    height: 52px;
    border-radius: 8px;
    padding: 0 8px;
    box-sizing: border-box;
    border: 1px solid white;
`

const Button = styled.button`
    margin: 8px 0;
    height: 52px;
    border-radius: 8px;
    background-color: #FF55FF;
    box-sizing: border-box;
    border: none;
    color: white;
    font-weight: 700;
`

const TitleBox = styled.div`
    display: flex;
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

const Close = styled.div`
    position: fixed;
    top: 4vh;
    right: 14vw;
    font-size: 34px;
    color: white;
`