import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";

import Main from "./pages/Main";

import Login from "./pages/log/Login";
import Register from "./pages/log/Register";

import Home from "./pages/content/Home";
import Plan from "./pages/content/Plan";
import Subscription from "./pages/content/Subscription";

export default function App() {
    return(
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Main>
                    <Routes>
                        <Route path="/" element={ <Login /> } />
                        <Route path="/sign-up" element={ <Register /> } />
                        <Route path="/home" element={ <Home /> } />
                        <Route path="/subscriptions" element={ <Subscription /> } />
                        <Route path="   " element={ <Plan /> } />
                    </Routes>
                </Main>
            </BrowserRouter>
        </>
    )
}