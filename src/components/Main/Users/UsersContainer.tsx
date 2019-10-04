import React, {Component} from "react";
import {Link} from "react-router-dom";
import PermanentDrawerLeft from "../../Layout/Drawer";
import {AppState} from "../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listUsers} from "../../../actions/users_actions";
import {getCurrentUserDetails} from "../../../actions/auth_actions";
import {connect} from "react-redux";
import User from "../../../models/User";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AvatarCard from "../../Layout/CardAvatar";
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

    componentDidMount(): void {
        this.props.getCurrentUserDetails(this.props.currentUser)
        this.props.listUsers()
    }

    useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            }
        }),
    );

    children = () => {

        const classes = this.useStyles();
        let list: Array<User> = [];

        if(!!this.props.users) {
            list = this.props.users
        }

        return (
            <div className={"container list-users"}>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        {list.map((user, i) => {
                            return (
                                <Grid item xs={4}>
                                    <AvatarCard
                                        imgSrc={user.profile_img}
                                        title={user.name}
                                        description={user.occupation}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
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
                <PermanentDrawerLeft children={this.children} currentUser={currentUser} />
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