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
import {User as CurrentUser} from "firebase";

interface Props{
    getCurrentUserDetails: (currentUser: any) => void
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
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {list.map((user, i) => {
                        return (
                            <Grid item xs={6}>
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
        )
    };

    render() {

        let currentUser = !!this.props.currentUser ? new User().toObject(this.props.currentUser) : null;
        console.log(this.props.users);

        return(
            <div className={"app-wrap"}>
                <div className="container">
                    <PermanentDrawerLeft children={this.children} currentUser={currentUser} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    currentUser: state.auth.currentUser,
    users: state.users.usersList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listUsers, getCurrentUserDetails}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (UsersContainer)