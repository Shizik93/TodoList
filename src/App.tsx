import React from 'react';
import './App.css';
import Todolists from "./Components/Todolists";
import Login from "./Components/Login";
import {useAppSelector} from "./Hooks/hooks";

function App() {
    const isAuthorized = useAppSelector((state) => state.app.isAuthorized)
    return (
        isAuthorized ? <Todolists/> : <Login/>
    );
}

export default App;
