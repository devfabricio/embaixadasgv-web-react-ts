import React, {Component} from "react";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listUsers} from "../../../../actions/users_actions";
import {connect} from "react-redux";
import MobileToolbar from "../../Widgets/MobileToolbar";
import {UserInterface} from "../../../../interface/UserInterface";
import User from "../../../../models/User";

interface Props {
    history: any
}

class MobileEmbassyAgendaContainer extends Component<Props> {

    goBack = () => {
        this.props.history.goBack()
    };

    render() {
        return(<div className={"mobile-container"}>
            <MobileToolbar title={"Agenda"} goBack={this.goBack} />
        </div>)
    }
}

const mapStateToProps = (state: AppState) => ({
    currentUserDetails: state.auth.userDetails,
    users: state.users.usersList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listUsers}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileEmbassyAgendaContainer)