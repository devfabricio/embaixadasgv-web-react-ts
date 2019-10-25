import React, {Component} from "react";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listEmbassyMembers} from "../../../../actions/users_actions";
import {connect} from "react-redux";
import MobileToolbar from "../../Widgets/MobileToolbar";
import {Link} from "react-router-dom";
import UserCard from "../Users/UserCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import User from "../../../../models/User";
import {UserInterface} from "../../../../interface/UserInterface";

interface Props {
    history: any
    currentUser: UserInterface
    listEmbassyMembers: (embassyId: string) => void
    users: Array<User>
}


class MobileEmbassyMembersContainter extends Component<Props> {

    componentDidMount(): void {
        this.props.listEmbassyMembers(!!this.props.currentUser.embassy_id ? this.props.currentUser.embassy_id : "")
    }

    goBack = () => {
        this.props.history.goBack()
    };

    render() {
        console.log(this.props)
        let list: Array<User> = []

        if(!!this.props.users) {
            list = this.props.users
        }

        return(<div className={"mobile-container"}>
            <MobileToolbar title={"Membros da Embaixada"} goBack={this.goBack} />
            <div className={"content"}>
                <div className={"users-container"} >
                    <ul className={"list-users"}>
                        {list.map((item, i) => (
                            <li key={i}>
                                <Link to={""}>
                                    <UserCard user={item} />
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>)
    }
}

const mapStateToProps = (state: AppState) => ({
    users: state.users.membersList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listEmbassyMembers}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileEmbassyMembersContainter)