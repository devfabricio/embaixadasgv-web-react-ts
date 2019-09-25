import React, {Component} from 'react'
import {bindActionCreators, Dispatch} from "redux";
import {listEmbassy} from "../../actions/landing_actions";
import {connect} from "react-redux";
import {AppState} from "../../reducers";

class Login extends Component {

    render() {
        return (
            <div className={"wrap-auth"}>

            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    list: state.landing.embassyList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listEmbassy}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (Login)