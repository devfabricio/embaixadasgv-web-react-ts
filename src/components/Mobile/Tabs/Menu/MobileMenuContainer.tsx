import React, {Component} from "react";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listUsers} from "../../../../actions/users_actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import SimpleBottomNavigation from "../../../Widgets/SimpleBottomNavigation";
import {Link} from "react-router-dom";

class MobileMenuContainer extends Component{

    state = {
        tabName: "menu",
        tabPath: "/"
    };

    handleChangeTab = (tabName: string, tabPath: string) => {
        this.setState({...this.state, tabName: tabName, tabPath: tabPath})
    };

    render() {

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
                        <div className={"user-propfile"}></div>
                        <div className={"menu-section"}>
                            <span className={"section-name"}>Configurações de Conta</span>
                            <ul className={"account-settings"}>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Editar Perfil
                                </Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_change_photo.svg"/>
                                    Alterar foto de perfil</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_change_pass.svg"/>
                                    Alterar Senha</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_social_network.svg"/>
                                    Editar Redes Sociais</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_embassy.svg"/>
                                    Minha Embaixada</Link></li>
                            </ul>
                        </div>
                        <div className={"menu-section"}>
                            <span className={"section-name"}>Líderes</span>
                            <ul className={"account-settings"}>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_menu_manage_event.svg"/>
                                    Gerenciar Eventos</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_add_picture.svg"/>
                                    Gerenciar Fotos</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Convidar Membros</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Solicitação de convites</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_embassy.svg"/>
                                    Editar dados da embaixada</Link></li>
                            </ul>
                        </div>
                        <div className={"menu-section"}>
                            <span className={"section-name"}>Padrinhos</span>
                            <ul className={"account-settings"}>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Embaixadas Afiliadas</Link></li>
                            </ul>
                        </div>
                        <div className={"menu-section"}>
                            <span className={"section-name"}>Gestores</span>
                            <ul className={"account-settings"}>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Embaixadas para aprovação</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Gerenciar Padrinhos</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_create_bulletin.svg"/>
                                    Gerenciar Informativos</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Informações</Link></li>
                            </ul>
                        </div>
                        <div className={"menu-section"}>
                            <span className={"section-name"}>Privacidade</span>
                            <ul className={"account-settings"}>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Configurações de Privacidade</Link></li>
                            </ul>
                        </div>
                        <div className={"menu-section"}>
                            <span className={"section-name"}>Mais Opções</span>
                            <ul className={"menu-about"}>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Lista de embaixadas</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Sobre as embaixadas</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_edit_profile.svg"/>
                                    Sugira uma funcionalidade</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_send_message.svg"/>
                                    Envie-nos uma mensagem</Link></li>
                                <li><Link to={""}>
                                    <img src="assets/images/menu_icons/ic_logout.svg"/>
                                Sair</Link></li>
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
    currentUserDetails: state.auth.userDetails,
    users: state.users.usersList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listUsers}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileMenuContainer)