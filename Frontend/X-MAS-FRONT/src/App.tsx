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
    interface Card {
        keyWords: string[],
        name: string,
        date: string,
        status: string,
        types: string[],
        score: Float32Array,
    }
    //localhost:9000/documents?page=1
    //get fetch request
    //localhost:9000/documents?page=2
    const [cards, setCards] = React.useState<Card[] | null>(null);

    fetch('http://localhost:9000/documents?page=1')
        .then(response => response.json())
        .then(data => setCards(data));




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
