import React from 'react'
import {Switch} from 'react-router-dom'
import MobileDashboardContainer from "../components/Mobile/Tabs/Dashboard/MobileDashboardContainer"
import MobileUsersContainer from "../components/Mobile/Tabs/Users/MobileUsersContainer"
import MobileFeedContainer from "../components/Mobile/Tabs/Feed/MobileFeedContainer"
import MobileAgendaContainer from "../components/Mobile/Tabs/Agenda/MobileAgendaContainer"
import MobileMenuContainer from "../components/Mobile/Tabs/Menu/MobileMenuContainer"
import PrivateRoute from "./private_route";
import User from "../models/User";

interface Props {
    isLogged: boolean,
    currentUser: User | null
}

const MobileRoutes = (props: Props) => {

    return (
        <Switch>
            <PrivateRoute currentUser={props.currentUser} isLogged={props.isLogged} path={'/gvs'} exact component={MobileUsersContainer} />
            <PrivateRoute currentUser={props.currentUser} isLogged={props.isLogged} path={'/posts'} exact component={MobileFeedContainer} />
            <PrivateRoute currentUser={props.currentUser} isLogged={props.isLogged} path={'/agenda'} exact component={MobileAgendaContainer} />
            <PrivateRoute currentUser={props.currentUser} isLogged={props.isLogged} path={'/menu'} exact component={MobileMenuContainer} />
            <PrivateRoute currentUser={props.currentUser} isLogged={props.isLogged} path={'/'} exact component={MobileDashboardContainer} />
        </Switch>
    )
};

export default MobileRoutes