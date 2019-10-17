import React, {Component} from "react";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listPosts} from "../../../../actions/post_actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import SimpleBottomNavigation from "../../../Widgets/SimpleBottomNavigation";
import {Link} from "react-router-dom";
import PostCard from "./PostCard";
import Event from "../../../../models/Event";
import {Post} from "../../../../models/Post";

interface Props {
    listPosts: () => void
    posts: Array<Post>
}


class MobileFeedContainer extends Component<Props>{
    state = {
        tabName: "feed",
        tabPath: "/"
    };

    componentDidMount(): void {
        this.props.listPosts()
    }

    handleChangeTab = (tabName: string, tabPath: string) => {
        this.setState({...this.state, tabName: tabName, tabPath: tabPath})
    };

    render() {

        if(this.state.tabName !== "feed") {
            return (
                <Redirect to={this.state.tabPath} />
            )
        }

        let list: Array<Post> = [];

        if(!!this.props.posts) {
            list = this.props.posts
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
    posts: state.posts.postsList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listPosts}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileFeedContainer)