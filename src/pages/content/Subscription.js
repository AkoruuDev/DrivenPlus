import { useContext, useState } from "react"
import { planList } from "../../services/API"
import { AuthContext } from "../../provider/auth"

function Sub() {
    return(
        <></>
    )
}

export default function Subscription() {
    const [plans, setPlans] = useState([])
    const { user } = useContext(AuthContext);
    console.log(user);

    planList(user.token)
        .then(res => console.log(res.data))
        .catch(() => console.log("Deu Ruim"))
    return(
        <>
            Escolha seu Plano
            <>{plans?.map(sub => <Sub />)}</>
        </>
    )
}