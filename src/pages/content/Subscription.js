import { useContext, useEffect, useState } from "react"
import { planList } from "../../services/API"
import { AuthContext } from "../../provider/auth"
import AlertBOX from "../../services/alert"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

function Sub({ sub }) {
    return(
        <Box>
            <Image src={sub.image} alt={`plan${sub.id}`} />
            <Price>{sub.price}</Price>
        </Box>
    )
}

export default function Subscription() {
    const [plans, setPlans] = useState([])
    const { user } = useContext(AuthContext);
    console.log(user);
    const navigate = useNavigate();

    // ---------------------------------------------
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');
    const [action, setAction] = useState();
    const [doAction, setDoAction] = useState(false);
    const [secButton, setSecButton] = useState({});
    // ---------------------------------------------

    function actionConfirm() {
        if(doAction) {
            navigate('/');
            document.location.reload();
        }
    }

    useEffect(() => {
        planList(user.token)
        .then(res => {
            console.log(res.data);
            setPlans(res.data)
        })
        .catch(() => {
            console.log("Deu Ruim")
            // ---------------------------------------------
            setInfo('Ops! Parece que não conseguimos conectar você com os planos...');
            setConfirmMessage('Tudo bem, vou tentar de novo');
            setAction(() => setDoAction(true))
            setSecButton({
                ...secButton,
                show: false
            });
            setShow(true);
            // ---------------------------------------------    
        })
    }, [])

    return(
        <Container>
            <Title>Escolha seu Plano</Title>
            <BoxPlan>{plans?.map(sub => <Sub key={sub.id} sub={sub}/>)}</BoxPlan>
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

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: white;
`

const BoxPlan = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vw;
    height: 80vh;
    padding: 25px 0;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`

const Box = styled.div`
    width: 97%;
    padding: 12px;
    margin: 10px 0;
    border-radius: 12px;
    border: 1px solid white;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        cursor: pointer;
        background-color: #16161E;
    }
`

const Image = styled.img`
    height: 95px;
    margin: 14px 0;
`

const Price = styled.p`
    font-size: 24px;
    font-weight: 700;
    color: white;
`