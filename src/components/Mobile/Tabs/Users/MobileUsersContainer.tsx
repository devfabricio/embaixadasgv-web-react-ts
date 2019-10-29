import React, {Component} from "react";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listUsers, clearSingleUser, getUsersCount} from "../../../../actions/users_actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import Group from "@material-ui/core/SvgIcon/SvgIcon";
import SimpleBottomNavigation from "../../../Widgets/SimpleBottomNavigation";
import User from "../../../../models/User";
import firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserCard from "./UserCard";
import FormField from "../../../Widgets/TextInput";
import TextField from "@material-ui/core/TextField";
import algoliasearch from "algoliasearch";

interface Props {
    getUsersCount: () => void
    listUsers: (previewList: Array<User>, loadmore: boolean, lastDoc: firebase.firestore.DocumentData | null, callback: (isOver: boolean) => void) => void
    users: Array<User>
    usersCount: number
    lastDoc: firebase.firestore.DocumentData
}

class MobileUsersContainer extends Component<Props>{

    state = {
        query: "",
        showSearchBox: false,
        isSearching: false,
        searchList: [],
        tabName: "users",
        tabPath: "/",
        isPostOver: false
    };

    componentDidMount(): void {
        window.scrollTo({ top: 0})
        if(!this.props.users) {
            this.props.getUsersCount()
            this.props.listUsers([], false, null, this.listenLoadMore)
        }
        let self = this
        window.addEventListener('scroll', function() {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                self.props.listUsers(self.props.users, true, self.props.lastDoc, self.listenLoadMore)
                //show loading spinner and make fetch request to api
            }
        });
    }

    listenLoadMore = (isPostOver: boolean) => {
        if(isPostOver) {
            this.setState({...this.state, isPostOver: true})
        }
    }

    handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

        let query = e.target.value;

        const client = algoliasearch("2IGM62FIAI", "042b50ac3860ac597be1fbefad09b9d4");
        const index = client.initIndex('users');
        this.setState({...this.state, query: query, isSearching: true});

        let list: Array<User> = [];

        if(query.length > 0) {
            index.search({ query: query }, (err: any, { hits }: any = {}) => {
                if (err) {
                    console.log(err);
                    console.log(err.debugData);
                    return;
                }

                console.log(hits);
                if(hits.length > 0) {
                    hits.forEach((item: any, i: number) => {
                        let user = new User();
                        user.name = item.name;
                        user.occupation = item.occupation;
                        user.profile_img = item.profile_img;
                        list.push(user)
                    });
                    this.setState({...this.state, searchList: list})
                } else {
                    this.setState({...this.state, searchList: []})
                }
            });
        } else {
            this.setState({...this.state, searchList: [], query: query, isSearching: false})
        }
    };

    handleChangeTab = (tabName: string, tabPath: string) => {
        this.setState({...this.state, tabName: tabName, tabPath: tabPath})
    };

    render() {

        let list: Array<User> = [];
        let searchList: Array<User> = [];

        if(this.state.tabName !== "users") {
            return (
                <Redirect to={this.state.tabPath} />
            )
        }

        if(!!this.props.users) {
            list = this.props.users
        }

        if(this.state.isSearching) {
            searchList = this.state.searchList
        }

        return(
            <div className={"mobile-container"}>
                <header>
                    <div className={"mobile-toolbar"}>
                        <div className="logo">
                            <img src="assets/images/logo.png" />
                        </div>
                        <div className={"actions"}>
                            <button onClick={() => {this.setState({...this.state, showSearchBox: !this.state.showSearchBox})}}><i className={"fas fa-search"}/></button>
                        </div>
                    </div>
                </header>
                <div className={"content"}>
                    <div className={"users-container"} >
                        {this.state.showSearchBox && <FormField
                            type={"search"}
                            placeholder={"Pesquise por nome, cidade ou área de atuação"}
                            value={this.state.query}
                            onChange={this.handleOnSearch}/>}
                        {(searchList.length > 0 && this.state.showSearchBox) && <span className={"list-title"}>{searchList.length} GV's encontrados</span>}
                        {(!!this.props.usersCount && !this.state.showSearchBox) && <span className={"list-title"}>{this.props.usersCount} GV's cadastrados</span>}
                        {!this.state.showSearchBox && <ul className={"list-users"}>
                            {list.map((item, i) => (
                                <li key={i}>
                                    <Link to={"/gv/"+item.username}>
                                        <UserCard user={item} />
                                    </Link>
                                </li>
                            ))}
                        </ul>}
                        {this.state.showSearchBox && <ul className={"list-users"}>
                            {searchList.map((item, i) => (
                                <li key={i}>
                                    <Link to={"/gv/"+item.username}>
                                        <UserCard user={item} />
                                    </Link>
                                </li>
                            ))}
                        </ul>}
                    </div>
                </div>
                <SimpleBottomNavigation currentTab={"users"} handleChangeTab={this.handleChangeTab}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    users: state.users.usersList,
    usersCount: state.users.usersCount,
    lastDoc: state.users.usersLastDoc
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listUsers, clearSingleUser, getUsersCount}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileUsersContainer)