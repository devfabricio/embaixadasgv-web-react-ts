import React, {Component} from 'react'
import MobileToolbar from "../../Widgets/MobileToolbar";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {getSingleUser, clearSingleUser} from "../../../../actions/users_actions";
import {connect} from "react-redux";
import {UserInterface} from "../../../../interface/UserInterface";

interface Props {
    history: any
    match: any
    clearSingleUser: () => void
    getSingleUser: (username: string) => void
    user: UserInterface
}

class SingleUserContainer extends Component<Props> {

    componentDidMount(): void {
        this.props.getSingleUser(this.props.match.params.username)
    }

    componentWillUnmount(): void {
        this.props.clearSingleUser()
    }

    goBack = () => {
        this.props.history.goBack()
    };

    render() {

        let user = null

        if(!!this.props.user) {
            user = this.props.user
        }
        return(
            <div className={"mobile-container"}>
                <MobileToolbar title={!!user ? user.name : ""} goBack={this.goBack} />
                <div className={"content"}>
                    {!!user && <div className={"single-user-container"} >
                        <div className={"profile-photo"}>
                            <img src={!!user.profile_img ? user.profile_img : ""}  />
                        </div>
                        <div className={"user-name"}>
                            <h1>{user.name}</h1>
                        </div>
                        <div className={"user-info"}>
                            <ul>
                                <li><i className={"fas fa-briefcase"}/> Área de Atuação: <b>{user.occupation}</b></li>
                                <li><i className={"fas fa-graduation-cap"}/> Embaixada: <b>{!!user.embassy ? user.embassy.name : ""}</b></li>
                                <li><i className={"fas fa-map-marker-alt"}/> Cidade: <b>{user.city}</b></li>
                            </ul>
                        </div>
                        <div className={"user-description"}>
                            <span className={"section-title"}>Sobre mim</span>
                            <p>{user.description}</p>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    currentUserDetails: state.auth.userDetails,
    user: state.users.singleUser,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({getSingleUser, clearSingleUser}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (SingleUserContainer)