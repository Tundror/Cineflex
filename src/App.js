import { useState } from "react"
import styled from "styled-components"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"

export default function App() {
    const [tituloFinal, setTituloFinal] = useState("")
    const [dataFinal, setDataFinal] = useState("")
    const [horarioFinal, setHorarioFinal] = useState("")
    const [assentosFinais, setAssentosFinais] = useState([])
    const [nomeFinal, setNomeFinal] = useState("")
    const [cpfFinal, setCpfFinal] = useState("")
    
    
    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
                <Route path="/assentos/:idSessao" element={<SeatsPage tituloFinal={tituloFinal}
                    setTituloFinal={setTituloFinal}
                    setDataFinal={setDataFinal}
                    setHorarioFinal={setHorarioFinal}
                    assentosFinais={assentosFinais}
                    setAssentosFinais={setAssentosFinais}
                    setNomeFinal={setNomeFinal}
                    setCpfFinal={setCpfFinal} />} />
                <Route path="/sucesso" element={<SuccessPage tituloFinal={tituloFinal}
                    dataFinal={dataFinal}
                    horarioFinal={horarioFinal}
                    assentosFinais={assentosFinais}
                    nomeFinal={nomeFinal}
                    cpfFinal={cpfFinal}
                    setTituloFinal={setTituloFinal}
                    setDataFinal={setDataFinal}
                    setHorarioFinal={setHorarioFinal}
                    setAssentosFinais={setAssentosFinais}
                    setNomeFinal={setNomeFinal}
                    setCpfFinal={setCpfFinal} />}/>
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
