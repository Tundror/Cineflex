import styled from "styled-components"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios';

export default function HomePage(props) {
    const [listaFilmes, setListaFilmes] = useState([])
    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
        promise.then(resp => {
            const x = resp.data
            setListaFilmes(x)
        })
        promise.catch(err => console.log(err.response.data))
    }, [])
    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {listaFilmes.map((a) => <Poster key={a.id} url={a.posterURL} title={a.title} id={a.id} />)}
            </ListContainer>

        </PageContainer>
    )
}
function Poster(props) {
    return (
        <Link to={`/sessoes/${props.id}`}>
            <MovieContainer data-test="movie">
                <img src={props.url} alt={props.title} />
            </MovieContainer>
        </Link>
    )
}
//
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
    &:hover{
        cursor: pointer;
    }
`