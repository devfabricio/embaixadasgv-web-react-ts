import React, {Component} from "react";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listUsers} from "../../../../actions/users_actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import SimpleBottomNavigation from "../../../Widgets/SimpleBottomNavigation";
import {Link} from "react-router-dom";
import PostCard from "./PostCard";

class MobileFeedContainer extends Component{
    state = {
        tabName: "feed",
        tabPath: "/"
    };

    handleChangeTab = (tabName: string, tabPath: string) => {
        this.setState({...this.state, tabName: tabName, tabPath: tabPath})
    };

    render() {

        if(this.state.tabName !== "feed") {
            return (
                <Redirect to={this.state.tabPath} />
            )
        }

        return(
            <div className={"mobile-container"}>
                <header>
                    <div className={"mobile-toolbar"}>
                        <div className="logo">
                            <img src="assets/images/logo.png" />
                        </div>
                    </div>
                    <div className={"top-navigation-feed"}>
                        <Link className={"active"} to={"/"}>Destaques</Link>
                        <Link to={"/"}>Minha Embaixada</Link>
                        <Link to={"/"}>Geral</Link>
                    </div>
                </header>
                <div className={"content"}>
                    <ul className={"list-posts"}>
                        <li>
                            <Link to={"/"}>
                                <PostCard />
                            </Link>
                        </li>
                    </ul>
                </div>
                <SimpleBottomNavigation currentTab={"feed"} handleChangeTab={this.handleChangeTab}/>
            </div>
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

export default connect (mapStateToProps, mapDispatchToProps) (MobileFeedContainer)