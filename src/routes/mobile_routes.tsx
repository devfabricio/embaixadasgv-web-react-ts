import React from 'react'
import {Switch} from 'react-router-dom'
import MobileDashboardContainer from "../components/Mobile/Tabs/Dashboard/MobileDashboardContainer"
import PrivateRoute from "./private_route";
import User from "../models/User";

interface Props {
    isLogged: boolean,
    currentUser: User | null
}

const MobileRoutes = (props: Props) => {

    return (
        <Switch>
            <PrivateRoute currentUser={props.currentUser} isLogged={props.isLogged} path={'/'} exact component={MobileDashboardContainer} />
        </Switch>
    )
};

export default MobileRoutes