import React, {Component} from "react";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listUsers} from "../../../../actions/users_actions";
import firebase from "firebase";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import SimpleBottomNavigation from "../../../Widgets/SimpleBottomNavigation";
import {Link} from "react-router-dom";
import {firebaseAuth} from "../../../../utils/firebase";
import {Post} from "../../../../models/Post";
import User from "../../../../models/User";
import UserCard from "../Users/UserCard";

interface Props {
    authUser: firebase.firestore.DocumentData
}

class MobileMenuContainer extends Component<Props>{

    state = {
        tabName: "menu",
        tabPath: "/"
    };

    handleChangeTab = (tabName: string, tabPath: string) => {
        this.setState({...this.state, tabName: tabName, tabPath: tabPath})
    };

    logout = () => {
        firebaseAuth.signOut();
        window.location.href = "/";
    }

    render() {

        let user = new User()
        user.toObject(this.props.authUser)

        if(this.state.tabName !== "menu") {
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
                </header>
                <div className={"content"}>
                    <div className={"menu-container"}>
                        <div className={"user-profile"}>
                            <Link to={"/gv/"+user.username} >
                                <img className={"profile-img"} src={!!user.profile_img ? user.profile_img : ""} />
                                <span className={"user-name"}>{user.name}</span>
                                <span className={"user-occupation"}>Visualizar perfil</span>
                            </Link>
                        </div>
                        <div className={"menu-section"}>
                            <span className={"section-name"}>Configurações de Conta</span>
                            <ul className={"account-settings"}>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Editar Perfil <i>(Em breve)</i>
                                </Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_change_photo.svg"/>
                                    Alterar foto de perfil <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_change_pass.svg"/>
                                    Alterar Senha <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_social_network.svg"/>
                                    Editar Redes Sociais <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_embassy.svg"/>
                                    Minha Embaixada <i>(Em breve)</i></Link></li>
                            </ul>
                        </div>
                        {user.leader && <div className={"menu-section"}>
                            <span className={"section-name"}>Líderes</span>
                            <ul className={"account-settings"}>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_menu_manage_event.svg"/>
                                    Gerenciar Eventos <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_add_picture.svg"/>
                                    Gerenciar Fotos <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Convidar Membros <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Solicitação de convites <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_embassy.svg"/>
                                    Editar dados da embaixada <i>(Em breve)</i></Link></li>
                            </ul>
                        </div>}
                        {user.sponsor && <div className={"menu-section"}>
                            <span className={"section-name"}>Padrinhos</span>
                            <ul className={"account-settings"}>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Embaixadas Afiliadas <i>(Em breve)</i></Link></li>
                            </ul>
                        </div>}
                        {user.manager && <div className={"menu-section"}>
                            <span className={"section-name"}>Gestores</span>
                            <ul className={"account-settings"}>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Embaixadas para aprovação <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Gerenciar Padrinhos <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_create_bulletin.svg"/>
                                    Gerenciar Informativos <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Informações <i>(Em breve)</i></Link></li>
                            </ul>
                        </div>}
                        <div className={"menu-section"}>
                            <span className={"section-name"}>Privacidade</span>
                            <ul className={"account-settings"}>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Configurações de Privacidade <i>(Em breve)</i></Link></li>
                            </ul>
                        </div>
                        <div className={"menu-section"}>
                            <span className={"section-name"}>Mais Opções</span>
                            <ul className={"menu-about"}>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Lista de embaixadas <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Sobre as embaixadas <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Sugira uma funcionalidade <i>(Em breve)</i></Link></li>
                                <li style={{opacity: 0.5}}><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_send_message.svg"/>
                                    Envie-nos uma mensagem <i>(Em breve)</i></Link></li>
                                <li><button onClick={() => {this.logout()}}>
                                    <img src="assets/images/menu_icons/ic_logout.svg"/>
                                Sair</button></li>
                            </ul>
                        </div>
                    </div>

                </div>
                <SimpleBottomNavigation currentTab={"menu"} handleChangeTab={this.handleChangeTab}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    authUser: state.auth.currentUser,
    users: state.users.usersList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listUsers}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileMenuContainer)