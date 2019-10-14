import React, {Component} from "react";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listUsers} from "../../../../actions/users_actions";
import {connect} from "react-redux";
import SimpleBottomNavigation from "../../../Widgets/SimpleBottomNavigation";
import CloudUpload from '@material-ui/icons/CloudUpload'
import Group from '@material-ui/icons/Group'
import PhotoLibrary from '@material-ui/icons/PhotoLibrary'
import DateRange from '@material-ui/icons/DateRange'
import {Link} from "react-router-dom";

class MobileDashboardContainer extends Component{

    render() {
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
                    <div className={"dashboard-section"}>
                        <h4>Próxima reunião</h4>
                        <div className={"next-event"}>
                            <div className={"date-event"}>
                                <Link to={"/"}>
                                    <span className={"month"}>Nov</span>
                                    <span className={"day"}>01</span>
                                </Link>
                            </div>
                            <div className={"description-event"}>
                                <Link to={"/"}>
                                    <span className={"time"}>Sexta-Feira ás 19:30</span>
                                    <span className={"theme"}>Estudo de caso</span>
                                    <span className={"place"}>Ipatinga, MG</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={"dashboard-section"}>
                        <h4>Minha Embaixada</h4>
                        <div className={"row-buttons"}>
                            <div className={"dashboard-button first-button"}>
                                <Link to={"/"} >
                                    <Group/>
                                    <span>Membros</span>
                                </Link>
                            </div>
                            <div className={"dashboard-button"}>
                                <Link to={"/"} >
                                    <DateRange/>
                                    <span>Eventos</span>
                                </Link>
                            </div>
                            <div className={"dashboard-button"}>
                                <Link to={"/"} >
                                    <PhotoLibrary/>
                                    <span>Fotos</span>
                                </Link>
                            </div>
                            <div className={"dashboard-button last-button"}>
                                <Link to={"/"} >
                                    <CloudUpload/>
                                    <span>Nuvens</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={"dashboard-section"}>
                        <h4>Informativos</h4>
                        <ul className={"bulletin-list"}>
                            <li className={"bulletin-item"}>
                                <Link to={"/"}>
                                    <span className={"title"}>Título do Informativo</span>
                                    <p className={"description"}>Breve descrição do informativo</p>
                                </Link>
                            </li>
                            <li className={"bulletin-item"}>
                                <Link to={"/"}>
                                    <span className={"title"}>Título do Informativo</span>
                                    <p className={"description"}>Breve descrição do informativo</p>
                                </Link>
                            </li>
                            <li className={"bulletin-item"}>
                                <Link to={"/"}>
                                    <span className={"title"}>Título do Informativo</span>
                                    <p className={"description"}>Breve descrição do informativo</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <SimpleBottomNavigation/>
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

export default connect (mapStateToProps, mapDispatchToProps) (MobileDashboardContainer)