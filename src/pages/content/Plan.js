import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AuthContext } from "../../provider/auth";
import { showPlan } from "../../services/API";

export default function Plan() {
    const [plan, setPLan] = useState(undefined);
    const { PLAN_ID } = useParams();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        showPlan(PLAN_ID, user.token)
            .then(res => {
                setPLan(res.data);
            })
            .catch(err => console.log(err))
    }, [])
    
    if (plan === undefined) {
        return(<>Loading...</>)
    }

    return(
        <>
            {plan !== {} ?
                <>
                    {console.log(plan)}
                    <img src={plan.image} alt="logo"/>
                    <h1>{plan.name}</h1>
                    <h2>Benefícios:</h2>
                    {plan.perks.map((perk, i) => <p key={i}>{i + 1}. {perk.title}</p>)} {/* Linha com erro */}
                    <h2>Preço:</h2>
                    <p>R$ {plan.price} cobrados mensalmente</p>
                </>
            : ""}
        </>
    )
}