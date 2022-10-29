import { useContext, useEffect, useState } from "react"
import { planList } from "../../services/API"
import { AuthContext } from "../../provider/auth"

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

    useEffect(() => {
        planList(user.token)
        .then(res => {
            console.log(res.data);
            setPlans(res.data)
        })
        .catch(() => console.log("Deu Ruim"))
    }, [])
    return(
        <>
            Escolha seu Plano
            <>{plans?.map(sub => <Sub key={sub.id} sub={sub}/>)}</>
        </>
    )
}