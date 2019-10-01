import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Routes from './routes/routes'
import './App.css';
import {User} from "firebase";
import {AppState} from "./reducers";
import {bindActionCreators, Dispatch} from "redux";
import {checkAuth} from "./actions/auth_actions";
import {connect} from "react-redux";
import Login from "./components/Auth/index";
import Register from "./components/Auth/register";
import CompleteRegister from "./components/Auth/complete_register";
import AboutPage from "./components/Landing/about";
import ListPage from "./components/Landing/list";
import FoundPage from "./components/Landing/found";
import ContactPage from "./components/Landing/contact";
import PrivacyPage from "./components/Landing/policy-privacy";
import LandingPage from "./components/Landing";

interface Props {
    checkAuth: () => void
    isLogged?: boolean
    currentUser: User | null
}

class App extends Component<Props> {

    componentDidMount(): void {
        this.props.checkAuth()
    }

    render() {

        if(this.props.isLogged !== undefined) {
            if(this.props.isLogged) {
               return (
                   <BrowserRouter>
                       <Routes isLogged={this.props.isLogged} currentUser={this.props.currentUser}/>
                   </BrowserRouter>)
            } else {
                return (
                    <BrowserRouter>
                        <Switch>
                            <Route exact path={'/login'} component={Login} />
                            <Route exact path={'/registrar'} component={Register} />
                            <Route exact path={'/completar-registro'} component={CompleteRegister} />
                            <Route exact path={'/sobre'} component={AboutPage} />
                            <Route exact path={'/lista'} component={ListPage} />
                            <Route exact path={'/quero-fundar'} component={FoundPage} />
                            <Route exact path={'/contato'} component={ContactPage} />
                            <Route exact path={'/politicas-de-privacidade'} component={PrivacyPage} />
                            <Route exact path={'/'} component={LandingPage} />
                        </Switch>
                    </BrowserRouter>
                )
            }
        } else {
            return null
        }
    }

}

const mapStateToProps = (state: AppState) => ({
    isLogged: state.auth.isLogged,
    currentUser: state.auth.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({checkAuth}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (App)