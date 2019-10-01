import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
import Routes from './routes/routes'
import './App.css';
import {firebaseAuth} from "./utils/firebase";
import {User} from "firebase";
import {AppState} from "./reducers";
import {bindActionCreators, Dispatch} from "redux";
import {checkAuth} from "./actions/auth_actions";
import {connect} from "react-redux";

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
            return (
                <BrowserRouter>
                    <Routes isLogged={this.props.isLogged} currentUser={this.props.currentUser}/>
                </BrowserRouter>
            )
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

export default connect (mapStateToProps, mapDispatchToProps) (App);
