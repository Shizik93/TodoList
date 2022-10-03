import React, {useEffect} from 'react';
import './App.css';
import Todolists from "./Components/Todolists";
import Login from "./Components/Login";
import {useAppDispatch, useAppSelector} from "./Hooks/hooks";
import {authMeTC} from "./Reducers/authReducer";

function App() {
    const dispatch = useAppDispatch()
    const isAuthorized = useAppSelector((state) => state.app.isAuthorized)
    useEffect(() => {
        dispatch(authMeTC())
    }, [])
    return (
        isAuthorized ? <Todolists/> : <Login/>
    );
}

export default App;
