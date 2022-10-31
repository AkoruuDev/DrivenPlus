import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";
import UserContext from "./provider/UserContext";

import Main from "./pages/Main";

import Login from "./pages/log/Login";
import Register from "./pages/log/Register";

import Home from "./pages/content/Home";
import Plan from "./pages/content/Plan";
import Subscription from "./pages/content/Subscription";
import { useState } from "react";
import { setItem } from "./provider/localStorage";

export default function App() {
	const tokenOnLocalStorage = localStorage.getItem("token");

    const [token, setToken] = useState(tokenOnLocalStorage);

	function setAndPersistToken(token) {
		setToken(token);
        setItem("token", token);
	}

    return(
        <UserContext.Provider value={{token, setToken, setAndPersistToken}}>
            <GlobalStyle />
            <BrowserRouter>
                <Main>
                    <Routes>
                        <Route path="/" element={ <Login /> } />
                        <Route path="/sign-up" element={ <Register /> } />
                        <Route path="/home" element={ <Home /> } />
                        <Route path="/subscriptions" element={ <Subscription /> } />
                        <Route path="/subscriptions/:PLAN_ID" element={ <Plan /> } />
                    </Routes>
                </Main>
            </BrowserRouter>
        </UserContext.Provider>
    )
}