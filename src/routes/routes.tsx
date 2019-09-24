import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Main from '../components/Main'
import Register from "../components/Auth/register"
import ListPage from "../components/Landing/list";
import AboutPage from "../components/Landing/about";
import FoundPage from "../components/Landing/found";
import ContactPage from "../components/Landing/contact";
import PrivacyPage from "../components/Landing/policy-privacy";

const Routes = () => (
    <Switch>
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/sobre'} component={AboutPage} />
        <Route exact path={'/lista'} component={ListPage} />
        <Route exact path={'/quero-fundar'} component={FoundPage} />
        <Route exact path={'/contato'} component={ContactPage} />
        <Route exact path={'/politicas-de-privacidade'} component={PrivacyPage} />
        <Route path={'/'} component={Main} />
    </Switch>
);

export default Routes