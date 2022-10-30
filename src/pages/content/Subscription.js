import { useContext, useEffect, useState } from "react"
import { planList } from "../../services/API"
import { AuthContext } from "../../provider/auth"
import AlertBOX from "../../services/alert"
import { useNavigate } from "react-router-dom"

function Sub({ sub }) {
    return(
        <>
            <img src={sub.image} alt={`plan${sub.id}`} />
            <p>{sub.price}</p>
        </>
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
        <>
            Escolha seu Plano
            <>{plans?.map(sub => <Sub key={sub.id} sub={sub}/>)}</>
            <AlertBOX show={show} action={action} info={info} confirmMessage={confirmMessage} secButton={secButton} />
        </>
    )
}