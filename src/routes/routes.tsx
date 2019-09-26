import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {firebaseCollections, myFirebase} from "../utils/firebase";
import Main from '../components/Main'
import Register from "../components/Auth/register"
import ListPage from "../components/Landing/list";
import AboutPage from "../components/Landing/about";
import FoundPage from "../components/Landing/found";
import ContactPage from "../components/Landing/contact";
import PrivacyPage from "../components/Landing/policy-privacy";
import CompleteRegister from "../components/Auth/complete_register";

const Routes = () => {

        let auth = myFirebase.auth();
        if(auth.currentUser !== undefined) {
                return (
                    <Switch>
                            <Route path={'/'} component={CompleteRegister} />
                    </Switch>
                )
        } else {
                return (
                    <Switch>
                            <Route exact path={'/register'} component={Register} />
                            <Route exact path={'/completar-registro'} component={CompleteRegister} />
                            <Route exact path={'/sobre'} component={AboutPage} />
                            <Route exact path={'/lista'} component={ListPage} />
                            <Route exact path={'/quero-fundar'} component={FoundPage} />
                            <Route exact path={'/contato'} component={ContactPage} />
                            <Route exact path={'/politicas-de-privacidade'} component={PrivacyPage} />
                            <Route path={'/'} component={Main} />
                    </Switch>
                )}
        };

export default Routes