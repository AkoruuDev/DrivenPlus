import { useContext, useState } from "react";
import { useParams } from "react-router-dom"
import { AuthContext } from "../../provider/auth";
import { showPlan } from "../../services/API";

export default function Plan() {
    const [plan, setPLan] = useState({});
    const { PLAN_ID } = useParams();
    const { user } = useContext(AuthContext);

    showPlan(PLAN_ID, user.token)
        .then(res => {
            setPLan(res.data);
        })
        .catch(err => console.log(err))

    return(
        <>
            {plan !== {} ?
                <>
                    {console.log(plan)}
                    <img src={plan.image} alt="logo"/>
                    <h1>{plan.name}</h1>
                    <h2>Benefícios:</h2>
                    {plan.perks?.map((perk, i) => <p>{i + 1}. {perk.title}</p>)} {/* Linha com erro */}
                    <h2>Preço:</h2>
                    <p>R$ {plan.price} cobrados mensalmente</p>
                </>
            : ""}
        </>
    )
}