import React, {Component} from "react";
import {Link} from "react-router-dom";
import Sidebar from "react-sidebar";
import {firebaseCollections, firebaseStorageRefs,
    myFirebase, firebaseAuth, firebaseDatabase, firebaseStorage} from "../../utils/firebase";

const BaseLayout = (props: any) => {

    const [open, setOpen] = React.useState(false);

    const onSetSidebarOpen = (open: boolean) => {
        setOpen(open)
    };

    const logout = () => {
        firebaseAuth.signOut();
        window.location.href = "/"
    };

    const menu = () => {
        return (
            <div>
                <ul className={"menu-list"}>
                    <li className={"menu-section"}>Configurações de Conta</li>
                    <li className={"menu-item"}><Link to={"/"}><i className={"fas fa-edit"} /> Editar Perfil</Link></li>
                    <li className={"menu-item"}><Link to={"/"}><i className={"fas fa-camera"} /> Alterar foto de perfil</Link></li>
                    <li className={"menu-item"}><Link to={"/"}><i className={"fas fa-lock"} /> Alterar senha</Link></li>
                    <li className={"menu-item"}><Link to={"/"}><i className={"fas fa-thumbs-up"} /> Editar redes sociais</Link></li>
                    <li className={"menu-section"}>Privacidade</li>
                    <li className={"menu-item"}><Link to={"/"}><i className={"fas fa-user-shield"} /> Configurações de privacidade</Link></li>
                    <li className={"menu-section"}>Mais opções</li>
                    <li className={"menu-item"}><Link to={"/"}><i className={"fas fa-list"} /> Lista de embaixadas</Link></li>
                    <li className={"menu-item"}><Link to={"/"}><i className={"fas fa-globe-americas"} /> Sobre as embaixadas</Link></li>
                    <li className={"menu-item"}><Link to={"/"}><i className={"fas fa-lightbulb"} /> Sugira uma funcionalidade</Link></li>
                    <li className={"menu-item"}><Link to={"/"}><i className={"fas fa-star"} /> Avalie o aplicativo</Link></li>
                    <li className={"menu-item"}><Link to={"/"}><i className={"fas fa-envelope-open-text"} /> Envie-nos uma mensagem</Link></li>
                    <li className={"menu-item"}><span onClick={() => logout()}><i className={"fas fa-door-open"} /> Sair</span></li>

                </ul>
            </div>
        )
    };

    let currentUser = props.currentUser;

    return(
        <div className={"app-wrap"}>
            <header>
                <div className="container">
                    <div className="logo">
                        <Link to={"/"}><img src="assets/images/logo.png" /></Link>
                    </div>
                    <div className={"actions"}>
                        {!!currentUser && <div className={"user-action"} onClick={() => onSetSidebarOpen(true)}>
                            <i className={"fas fa-cog"}/>
                        </div>}
                    </div>
                </div>
            </header>
            <div className={"container list-users"}>
                <div className={"row"}>
                    <div className={"col-md-3 sidebar"}>
                        {!!currentUser && <div className={"user-info"}>
                            <img className={"float-left"} src={!!currentUser.profile_img ? currentUser.profile_img : ""} />
                            <div>
                                <span className={"name-header"}>{!!currentUser && currentUser.name}</span>
                                <span className={"sub-header"}>Visualizar perfil</span>
                            </div>
                        </div>}
                        <div className={"app-navigation"}>
                            <ul>
                                <li><i className={"fas fa-home"} /> <Link to={"/"}>Início</Link></li>
                                <li><i className={"fas fa-users"} /> <Link to={"/gvs"}>GV's</Link></li>
                                <li><i className={"fas fa-file-alt"} /> <Link to={"/posts"}>Conteúdo</Link></li>
                                <li><i className={"fas fa-calendar-check"} /> <Link to={"/agenda"}>Agenda</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={"col-md-9"}>
                        {props.children}
                    </div>
                </div>
            </div>
            {open && <Sidebar
                sidebar={menu()}
                open={open}
                onSetOpen={onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}
                pullRight={true}
            />}
        </div>
    )

}

export default BaseLayout