import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"

export default function App() {
    const [listaFilmes, setListaFilmes] = useState([])
    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
        promise.then(resp => {
            const x = resp.data
            setListaFilmes(x)
        })
        promise.catch(() => console.log("deu ruim"))
    }, [])
    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                <Route path="/" element={<HomePage listaFilmes={listaFilmes} setListaFilmes={setListaFilmes} />} />       
                <Route path="/sessoes/:sessionId" element={<SessionsPage />} />
                <Route path="/assentos/:seatId" element={<SeatsPage />} />
                <Route path="/sucesso" element={<SuccessPage />} />
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
