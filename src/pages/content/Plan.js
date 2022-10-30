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
                    <Form>
                        <Input type="text" name="buyerName" placeholder="nome impresso no cartão" />
                        <Input type="text" name="buyerName" placeholder="Digitos do cartão" />
                        <div>
                            <Input type="text" name="buyerName" placeholder="CVV" />
                            <Input type="text" name="buyerName" placeholder="Validade" />
                        </div>
                        <Button>ASSINAR</Button>
                    </Form>
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