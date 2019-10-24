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
import firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
    listUsers: (previewList: Array<User>, loadmore: boolean, lastDoc: firebase.firestore.DocumentData | null, callback: (isOver: boolean) => void) => void
    users: Array<User>
    lastDoc: firebase.firestore.DocumentData
}

class MobileUsersContainer extends Component<Props>{

    state = {
        tabName: "users",
        tabPath: "/",
        isPostOver: false
    };

    componentDidMount(): void {
        this.props.listUsers([], false, null, this.listenLoadMore)
    }

    handleScroll = (e: any) => {
        let element = e.target
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            if(!this.state.isPostOver) {
                this.props.listUsers(this.props.users, true, this.props.lastDoc, this.listenLoadMore)
            }
        }
    }

    listenLoadMore = (isPostOver: boolean) => {
        if(isPostOver) {
            this.setState({...this.state, isPostOver: true})
        }
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
            <div className={"mobile-container"} style={{overflow: "hidden"}}>
                <header>
                    <div className={"mobile-toolbar"}>
                        <div className="logo">
                            <img src="assets/images/logo.png" />
                        </div>
                    </div>
                </header>
                <div className={"content"}>
                    <div className={"users-container"} onScroll={this.handleScroll}>
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
                            <div className={"loading-progress"}>
                                {!this.state.isPostOver && <CircularProgress size={20} id={"progress-form"} />}
                            </div>
                        </ul>

                    </div>
                </div>
                <SimpleBottomNavigation currentTab={"users"} handleChangeTab={this.handleChangeTab}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    users: state.users.usersList,
    lastDoc: state.users.usersLastDoc
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listUsers}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileUsersContainer)