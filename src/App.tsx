import React from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import {useSelector} from "react-redux";
import {AppRootType} from "./Store/store";
import Login from "./Components/Login";

function App() {
    const isAuthorized = useSelector((state: AppRootType) => state.app.isAuthorized)
    return (
        isAuthorized ? <Todolist/> : <Login/>
    );
}

export default App;
