import React from "react";
import styled from "styled-components";
import Button from "./components/ui/button/Button";
import Header from "./components/header/Header";
import LoginForm from "./pages/auth/Login/LoginForm";
import Registration from "./pages/auth/Registration/Registration";
import Main from "./pages/main/Main";
import AppWrapper from "./style";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from "react-router-dom";


function App() {
  return (
    <AppWrapper>
        <Header />
        <Routes>
            <Route path={'/login'} element={<LoginForm/>} />
            <Route path={'/registration'} element={<Registration/>} />
            <Route path={'/'} element={<Main/>}/>
        </Routes>
    </AppWrapper>
  )
}


export default App
