import React, {Component} from "react";
import {AppState} from "../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listUsers} from "../../../actions/users_actions";
import {connect} from "react-redux";
import User from "../../../models/User";
import AvatarCard from "../../Widgets/CardAvatar";
import BaseLayout from "../BaseLayout";
import FormField from "../../Widgets/TextInput";
import algoliasearch from "algoliasearch";
import firebase from "firebase";


interface Props{
    currentUser: User
    listUsers: (previewList: Array<User>, loadmore: boolean, lastDoc: firebase.firestore.DocumentData | null) => void
    users: Array<User>;
}

interface States {
    query: string
    searchList: Array<User>
    isSearching: boolean
}

class UsersContainer extends Component<Props>{

    state = {
        query: "",
        searchList: [],
        isSearching: false
    };

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

    componentDidMount(): void {
        this.props.listUsers([], false, null)
    }

    children = () => {

        let list: Array<User> = [];

        if(!!this.props.users) {
            list = this.props.users
        }

        if(this.state.isSearching) {
            list = this.state.searchList
        }

        return (
            <div className={"list-users"}>
                <div className={"row"}>
                    <div className={"col-md-12 search-form"}>
                        <FormField type={"search"}
                                   placeholder={"Pesquisar usuários"}
                                   value={this.state.query}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.handleOnSearch(e)}}
                                   autoComplete={"new-search"} />
                        {list.length > 0 && <span className={"title-section"}>{list.length} usuários cadastrados</span>}
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
    users: state.users.usersList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listUsers}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (UsersContainer)