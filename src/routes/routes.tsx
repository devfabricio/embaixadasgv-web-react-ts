import React from 'react'
import {Switch, Route} from 'react-router-dom'
import MainDashboard from '../components/Main/main'
import UsersContainer from "../components/Main/Users/UsersContainer"
import firebase, {User} from "firebase";
import PrivateRoute from "./private_route";

interface Props {
    isLogged: boolean,
    currentUser: User | null
}

const Routes = (props: Props) => {

    return (
        <Switch>
            <PrivateRoute currentUser={props.currentUser} isLogged={props.isLogged} path={'/gvs'} exact component={UsersContainer} />
            <PrivateRoute currentUser={props.currentUser} isLogged={props.isLogged} path={'/'} exact component={MainDashboard} />
        </Switch>
    )
};

export default Routes