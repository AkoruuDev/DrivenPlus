import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";
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
        return(<Container><Title>Loading...</Title></Container>)
    }

    return(
        <>
            {plan !== {} ?
                <Container>
                    <Image src={plan.image} alt="logo"/>
                    <Title>{plan.name}</Title>
                    <InfoBox>
                        <InfoTitle>Benefícios:</InfoTitle>
                        {plan.perks.map((perk, i) => <Text key={i}>{i + 1}. {perk.title}</Text>)}
                        <InfoTitle>Preço:</InfoTitle>
                        <Text>R$ {plan.price} cobrados mensalmente</Text>
                    </InfoBox>
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
    margin: 8px 0;
    font-size: 16px;
    color: white;
`

const Text = styled.p`
    margin-left: 8px;
    font-size: 14px;
    color: white;
`