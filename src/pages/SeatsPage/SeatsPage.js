import styled from "styled-components"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function SeatsPage() {
    const [assentos, setAssentos] = useState([])
    const { idSessao } = useParams()
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
    useEffect(() => {
        const promise = axios.get(url)
        promise.then((res) => {
            setAssentos(res.data)
        })

        promise.catch(err => console.log(err.response.data))
    }, [])
    console.log(assentos)
    if (assentos.length === 0) {
        return <PageContainer>Carregando...</PageContainer>
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.seats.map((a) => <Assento key={a.name} name={a.name} isAvailable={a.isAvailable} />)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle cor={"Selecionado"} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor={"Disponível"} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor={"Indisponível"} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={assentos.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{assentos.movie.title}</p>
                    <p>{assentos.day.weekday} - {assentos.name}</p>
                </div>
            </FooterContainer>
        </PageContainer>
    )
}
function Assento(props){
    const [isSelected, setIsSelected] = useState(false)
    function selecionarAssento(){
        if(isSelected === false && props.isAvailable === true)
        {
            setIsSelected(true)
        }
        else if(isSelected === true && props.isAvailable === true){
            setIsSelected(false)
        }
        else{
            alert("Esse assento não está disponível")
        }
    }
    return(
        <SeatItem onClick={selecionarAssento} isAvailable={props.isAvailable} isSelected={isSelected} >{props.name}</SeatItem>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props=> props.cor === "Selecionado" ? '#0E7D71' : props.cor === "Disponível" ? "#7B8B99" : "#F7C52B"};         // Essa cor deve mudar
    background-color: ${props=> props.cor === "Selecionado" ? '#1AAE9E' : props.cor === "Disponível" ? "#C3CFD9" : "#FBE192"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${props => props.isSelected ? '#0E7D71' : props.isAvailable ? '#808F9D' : '#F7C52B'};         // Essa cor deve mudar
    background-color: ${props => props.isSelected ? '#1AAE9E' : props.isAvailable ? '#C3CFD9' : '#FBE192'};   // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`