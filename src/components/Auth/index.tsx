import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {listEmbassy} from "../../actions/landing_actions";
import {connect} from "react-redux";

class Login extends Component {

    render() {
        return (
            <div className={"wrap-auth"}>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    list: state.landing.embassyList,
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({listEmbassy}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (Login)