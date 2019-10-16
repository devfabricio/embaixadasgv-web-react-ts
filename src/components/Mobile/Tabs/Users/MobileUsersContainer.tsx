import React, {Component} from "react";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listUsers} from "../../../../actions/users_actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import Group from "@material-ui/core/SvgIcon/SvgIcon";
import SimpleBottomNavigation from "../../../Widgets/SimpleBottomNavigation";
import User from "../../../../models/User";

interface Props {
    listUsers: () => void
    users: Array<User>
}

class MobileUsersContainer extends Component<Props>{

    state = {
        tabName: "users",
        tabPath: "/"
    };

    componentDidMount(): void {
        this.props.listUsers()
    }

    handleChangeTab = (tabName: string, tabPath: string) => {
        this.setState({...this.state, tabName: tabName, tabPath: tabPath})
    };

    render() {

        let list: Array<User> = [];

        if(this.state.tabName !== "users") {
            return (
                <Redirect to={this.state.tabPath} />
            )
        }

        if(!!this.props.users) {
            list = this.props.users
        }

        return(
            <div className={"mobile-container"}>
                <header>
                    <div className={"mobile-toolbar"}>
                        <div className="logo">
                            <img src="assets/images/logo.png" />
                        </div>
                    </div>
                </header>
                <div className={"content"}>
                    <ul className={"list-users"}>
                    {list.map((item, i) => (
                        <li key={i}>
                            <Link to={""}>
                                <img className={"profile-img"} src={!!item.profile_img ? item.profile_img : ""} />
                                <span className={"user-name"}>{item.name}</span>
                                <span className={"user-occupation"}>{item.occupation}</span>
                            </Link>
                        </li>
                    ))}
                    </ul>
                </div>
                <SimpleBottomNavigation currentTab={"users"} handleChangeTab={this.handleChangeTab}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    users: state.users.usersList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listUsers}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileUsersContainer)