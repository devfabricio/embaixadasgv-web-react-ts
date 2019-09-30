import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Routes from './routes/routes'
import logo from './logo.svg';
import './App.css';
import {firebaseAuth} from "./utils/firebase";
import {User} from "firebase";

function App() {

    const [values, setValues] = React.useState({
        isLogged: false,
    });

    let currentUser: User | null = null;
    let isLogged: boolean = false

    firebaseAuth.onAuthStateChanged(function(user) {
        console.log(user);
        if(!!user)  {
            currentUser = user;
            isLogged = true;
            setValues({isLogged: true})
        } else {
            currentUser = null;
            isLogged = false;
            setValues({isLogged: false})
        }
    });

    return (
        <BrowserRouter>
            <Routes isLogged={isLogged} currentUser={currentUser}/>
        </BrowserRouter>
    )

}

export default App;
