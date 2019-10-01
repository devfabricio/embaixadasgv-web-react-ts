import React from 'react'
import {Switch, Route} from 'react-router-dom'
import CompleteRegister from "../components/Auth/complete_register"
import firebase, {User} from "firebase";
import PrivateRoute from "./private_route";

interface Props {
    isLogged: boolean,
    currentUser: User | null
}

const Routes = (props: Props) => {

    return (
        <Switch>
            <PrivateRoute currentUser={props.currentUser} isLogged={props.isLogged} path={'/'} exact component={CompleteRegister} />
        </Switch>
    )
};

export default Routes