import React, {Component} from "react";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listHighlightsPosts, listMyEmbassyPosts, listAllPosts} from "../../../../actions/post_actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import SimpleBottomNavigation from "../../../Widgets/SimpleBottomNavigation";
import {Link} from "react-router-dom";
import PostCard from "./PostCard";
import {Post} from "../../../../models/Post";
import auth from "../../../../reducers/auth_reducer";
import firebase from "firebase";
import User from "../../../../models/User";

interface Props {
    listHighlightsPosts: () => void
    listMyEmbassyPosts: (user: User) => void
    listAllPosts: () => void
    highlightsPosts: Array<Post>
    myEmbassyPosts: Array<Post>
    allPosts: Array<Post>
    authUser: firebase.firestore.DocumentData
}


class MobileFeedContainer extends Component<Props>{
    state = {
        tabName: "feed",
        tabPath: "/",
        category: "highlights"
    };

    componentDidMount(): void {
        this.props.listHighlightsPosts()
    }

    handleChangeTab = (tabName: string, tabPath: string) => {
        this.setState({...this.state, tabName: tabName, tabPath: tabPath})
    };

    handleChangeCategory = (category: string) => {

        let user = new User()
        user.toObject(this.props.authUser)

        if(category !== this.state.category) {
            this.setState({...this.state, category: category})
            if(category === "highlights") {
                this.props.listHighlightsPosts()
            }

            if(category === "myEmbassy") {
                this.props.listMyEmbassyPosts(user)
            }

            if(category === "all") {
                this.props.listAllPosts()
            }
        }
    };

    render() {

        console.log(this.props.authUser)

        if(this.state.tabName !== "feed") {
            return (
                <Redirect to={this.state.tabPath} />
            )
        }

        let list: Array<Post> = [];

        if(this.state.category === "highlights") {
            if(!!this.props.highlightsPosts) {
                list = this.props.highlightsPosts
            } else {
                list = []
            }
        }

        if(this.state.category === "myEmbassy") {
            if(!!this.props.myEmbassyPosts) {
                list = this.props.myEmbassyPosts
            } else {
                list = []
            }
        }

        if(this.state.category === "all") {
            if(!!this.props.allPosts) {
                list = this.props.allPosts
            } else {
                list = []
            }
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
                        <button onClick={() => {this.handleChangeCategory("highlights")}} className={this.state.category === "highlights" ? "active" : ""}>Destaques</button>
                        <button onClick={() => {this.handleChangeCategory("myEmbassy")}} className={this.state.category === "myEmbassy" ? "active" : ""}>Minha Embaixada</button>
                        <button onClick={() => {this.handleChangeCategory("all")}} className={this.state.category === "all" ? "active" : ""}>Geral</button>
                    </div>
                </header>
                <div className={"content"}>
                    <ul className={"list-posts"}>
                        {list.map((post, i) => (
                            <li key={i}>
                                <Link to={"/"}>
                                    <PostCard post={post} />
                                </Link>
                            </li>
                        ))}

                    </ul>
                </div>
                <SimpleBottomNavigation currentTab={"feed"} handleChangeTab={this.handleChangeTab}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    authUser: state.auth.currentUser,
    highlightsPosts: state.posts.highlightsPostsList,
    myEmbassyPosts: state.posts.embassyPostsList,
    allPosts: state.posts.allPostsList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listHighlightsPosts, listMyEmbassyPosts, listAllPosts}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileFeedContainer)