import React, {Component} from "react";
import {AppState} from "../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listUsers} from "../../actions/users_actions";
import {connect} from "react-redux";
import User from "../../models/User";
import AvatarCard from "../Layout/CardAvatar";
import {User as CurrentUser} from "firebase";
import BaseLayout from "./BaseLayout";

interface Props{
    currentUser: User
    listUsers: () => void;
    users: Array<User>;
}

interface States {

}

class MainDashboard extends Component<Props>{

    componentDidMount(): void {
        this.props.listUsers()
    }

    children = () => {

        let list: Array<User> = [];

        if(!!this.props.users) {
            list = this.props.users
        }

        return (
            <div className={"row list-users"}>
                <div className={"col-md-12"}>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <span className={"title-section"}>Próximos eventos da minha embaixada</span>
                        </div>
                        {list.map((user, i) => {
                            return (
                                <div className={"col-md-6 user-item"}>
                                    <AvatarCard
                                        imgSrc={user.profile_img}
                                        title={user.name}
                                        description={user.occupation}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    };

    render() {

        return(
            <BaseLayout currentUser={this.props.currentUser}>
                {this.children()}
            </BaseLayout>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    currentUserDetails: state.auth.userDetails,
    users: state.users.usersList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listUsers}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MainDashboard)