import React, {Component} from "react";
import {Link} from "react-router-dom";
import {AppState} from "../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listUsers} from "../../../actions/users_actions";
import {getCurrentUserDetails} from "../../../actions/auth_actions";
import {connect} from "react-redux";
import User from "../../../models/User";
import AvatarCard from "../../Layout/CardAvatar";
import Sidebar from "react-sidebar";
import firebase from "firebase";
import {User as CurrentUser} from "firebase";

interface Props{
    getCurrentUserDetails: (currentUser: any) => void
    currentUserDetails: firebase.firestore.DocumentData
    currentUser: null | CurrentUser
    listUsers: () => void;
    users: Array<User>;
}

interface States {

}

class UsersContainer extends Component<Props>{

    state = {
        sidebarOpen: false
    }

    componentDidMount(): void {
        this.props.getCurrentUserDetails(this.props.currentUser)
        this.props.listUsers()
    }

    onSetSidebarOpen = (open: boolean) => {
        this.setState({ sidebarOpen: open });
    }

    children = () => {

        let list: Array<User> = [];

        if(!!this.props.users) {
            list = this.props.users
        }

        return (
            <div className={"container list-users"}>
                <div className={"row"}>
                        {list.map((user, i) => {
                            return (
                                <div className={"col-md-4 user-item"}>
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
        )
    };

    render() {

        let currentUser: User | null = null;

        if(!!this.props.currentUserDetails) {
            currentUser = new User();
            currentUser.toObject(this.props.currentUserDetails);
        }

        console.log(this.props.currentUserDetails);

        return(
            <div className={"app-wrap"}>
                <header>
                    <div className="container">
                        <div className="logo">
                            <Link to={"/"}><img src="assets/images/logo.png" /></Link>
                        </div>
                        <div className={"actions"}>
                            <div className={"user-action"} onClick={() => this.onSetSidebarOpen(true)}>
                                <img src={""} />
                                <span>Fabrício Augusto</span>
                                <i className={"fas fa-sort-down"}/>
                            </div>
                        </div>
                    </div>
                </header>
                <div className={"top-tabs"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-md-3 tab-item"}><Link to={"/"}>Início</Link></div>
                            <div className={"col-md-3 tab-item active"}><Link to={"/"}>GV's</Link></div>
                            <div className={"col-md-3 tab-item"}><Link to={"/"}>Conteúdo</Link></div>
                            <div className={"col-md-3 tab-item"}><Link to={"/"}>Agenda</Link></div>
                        </div>
                    </div>
                </div>
                {this.children()}
                {this.state.sidebarOpen && <Sidebar
                    sidebar={<b>Sidebar content</b>}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { background: "white" } }}
                    pullRight={true}
                />}
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    currentUserDetails: state.auth.userDetails,
    users: state.users.usersList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listUsers, getCurrentUserDetails}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (UsersContainer)