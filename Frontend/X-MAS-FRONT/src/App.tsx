import React from "react";
import {
    Route,
    Routes
} from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LoginForm from "./pages/auth/Login/LoginForm";
import Registration from "./pages/auth/Registration/Registration";
import MainPage from "./pages/main/MainPage";
import AppWrapper from "./style";


function App() {
    return (
        <AppWrapper>
            <Header/>
            <Routes>
                <Route path={'/login'} element={<LoginForm/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/'} element={<MainPage/>}/>
        </Routes>
            <Footer/>
    </AppWrapper>
  )
}


export default App
