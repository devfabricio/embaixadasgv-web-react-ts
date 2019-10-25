import React, {Component, UIEventHandler} from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
    listHighlightsPosts: (previewList: Array<Post>, loadmore: boolean, lastDoc: firebase.firestore.DocumentData | null) => void
    listMyEmbassyPosts: (user: User, previewList: Array<Post>, loadmore: boolean, lastDoc: firebase.firestore.DocumentData | null) => void
    listAllPosts: (previewList: Array<Post>, loadmore: boolean, lastDoc: firebase.firestore.DocumentData | null) => void
    highlightsPosts: Array<Post>
    myEmbassyPosts: Array<Post>
    allPosts: Array<Post>
    highlightsLastDoc: firebase.firestore.DocumentData,
    embassyLastDoc: firebase.firestore.DocumentData,
    allLastDoc: firebase.firestore.DocumentData,
    authUser: firebase.firestore.DocumentData
}

interface State {
    tabName: string
    tabPath: string
    category: string
}

class MobileFeedContainer extends Component<Props, State>{
    state = {
        tabName: "feed",
        tabPath: "/",
        category: "highlights",
    };

    componentDidMount(): void {
        this.props.listHighlightsPosts([], false, null)
        let self = this
        window.addEventListener('scroll', function() {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                self.listPosts(self.state.category)
                //show loading spinner and make fetch request to api
            }
        });
    }


    handleChangeTab = (tabName: string, tabPath: string) => {
        this.setState({...this.state, tabName: tabName, tabPath: tabPath})
    };

    handleChangeCategory = (category: string) => {


        if(category !== this.state.category) {
            this.setState({...this.state, category: category})
            let user = new User()
            user.toObject(this.props.authUser)

            if(category === "highlights") {
                if(!this.props.highlightsPosts) {
                    this.props.listHighlightsPosts([], false, null)
                } else {
                    window.scrollTo({ top: 0})
                }
            }

            if(category === "myEmbassy") {
                if(!this.props.myEmbassyPosts) {
                    this.props.listMyEmbassyPosts(user, [], false, null)
                } else {
                    window.scrollTo({ top: 0})
                }
            }

            if(category === "all") {
                if(!this.props.allPosts) {
                    this.props.listAllPosts([], false, null)
                } else {
                    window.scrollTo({ top: 0})
                }
            }
        }
    };

    listPosts = (category: string) => {

        let user = new User()
        user.toObject(this.props.authUser)

        if(category === "highlights") {
            if(!!this.props.highlightsLastDoc && !!this.props.highlightsPosts) {
                this.props.listHighlightsPosts(this.props.highlightsPosts, true, this.props.highlightsLastDoc)
            } else {
                this.props.listHighlightsPosts([], false, null)
            }
        }

        if(category === "myEmbassy") {
            if(!!this.props.embassyLastDoc && !!this.props.myEmbassyPosts) {
                this.props.listMyEmbassyPosts(user, this.props.myEmbassyPosts, true, this.props.embassyLastDoc)
            } else {
                this.props.listMyEmbassyPosts(user, [], false, null)
            }

        }

        if(category === "all") {
            if(!!this.props.allLastDoc && !!this.props.allPosts) {
                this.props.listAllPosts(this.props.allPosts, true, this.props.allLastDoc)
            } else {
                this.props.listAllPosts([], false, null)
            }
        }

    }

    render() {

        let highlightsPosts: Array<Post>;
        let myEmbassyPosts: Array<Post>;
        let allPosts: Array<Post>;

        if(this.state.tabName !== "feed") {
            return (
                <Redirect to={this.state.tabPath} />
            )
        }


        if(!!this.props.highlightsPosts) {
            highlightsPosts = this.props.highlightsPosts;
        } else {
            highlightsPosts = [];
        }

        if(!!this.props.myEmbassyPosts) {
            myEmbassyPosts = this.props.myEmbassyPosts
        } else {
            myEmbassyPosts = []
        }

        if(!!this.props.allPosts) {
            allPosts = this.props.allPosts
        } else {
            allPosts = []
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
                    {this.state.category === "highlights" && <div className={"feed-container"}>
                        <ul className={"list-posts"}>
                            {highlightsPosts.map((post, i) => (
                                <li key={i}>
                                    <Link to={"/"}>
                                        <PostCard post={post} />
                                    </Link>
                                </li>
                            ))}
                            <div className={"loading-progress"}>
                                <CircularProgress size={20} id={"progress-form"} />
                            </div>
                        </ul>
                    </div>}
                    {this.state.category === "myEmbassy" && <div className={"feed-container"}>
                        <ul className={"list-posts"}>
                            {myEmbassyPosts.map((post, i) => (
                                <li key={i}>
                                    <Link to={"/"}>
                                        <PostCard post={post} />
                                    </Link>
                                </li>
                            ))}
                            <div className={"loading-progress"}>
                                <CircularProgress size={20} id={"progress-form"} />
                            </div>
                        </ul>
                    </div>}
                    {this.state.category === "all" && <div className={"feed-container"}>
                        <ul className={"list-posts"}>
                            {allPosts.map((post, i) => (
                                <li key={i}>
                                    <Link to={"/"}>
                                        <PostCard post={post} />
                                    </Link>
                                </li>
                            ))}
                            <div className={"loading-progress"}>
                                <CircularProgress size={20} id={"progress-form"} />
                            </div>
                        </ul>
                    </div>}
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
    highlightsLastDoc: state.posts.highlightsLastDoc,
    embassyLastDoc: state.posts.embassyLastDoc,
    allLastDoc: state.posts.allLastDoc
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listHighlightsPosts, listMyEmbassyPosts, listAllPosts}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileFeedContainer)