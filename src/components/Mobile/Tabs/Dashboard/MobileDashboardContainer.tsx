import React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {getEmbassyEvents} from "../../../../actions/events_actions";
import {listBulletins} from "../../../../actions/bulletin_actions";
import {connect} from "react-redux";
import SimpleBottomNavigation from "../../../Widgets/SimpleBottomNavigation";
import CloudUpload from '@material-ui/icons/CloudUpload'
import Group from '@material-ui/icons/Group'
import PhotoLibrary from '@material-ui/icons/PhotoLibrary'
import DateRange from '@material-ui/icons/DateRange'
import {Link} from "react-router-dom";
import firebase from "firebase";
import User from "../../../../models/User";
import Event from "../../../../models/Event"
import {timestampToDate} from "../../../../utils/dates";
import {Bulletin} from "../../../../models/Bulletin";

interface Props {
    listBulletins: () => void
    bulletins: Array<Bulletin>
    authUser: firebase.firestore.DocumentData
    getEmbassyEvents: (embassyID: string) => void
    embassyEvents: Array<Event>
}

class MobileDashboardContainer extends Component<Props>{

    state = {
        tabName: "home",
        tabPath: "/"
    };

    componentDidMount(): void {
        if(!!this.props.authUser) {
            let user = new User()
            user.toObject(this.props.authUser)
            this.props.getEmbassyEvents(!!user.embassy_id ? user.embassy_id : "")
        }
        this.props.listBulletins()
    }

    handleChangeTab = (tabName: string, tabPath: string) => {
        this.setState({...this.state, tabName: tabName, tabPath: tabPath})
    };

    render() {

        if(this.state.tabName !== "home") {
            return (
                <Redirect to={this.state.tabPath} />
            )
        }

        let events: Array<Event> = [];
        let bulletins: Array<Bulletin> = [];

        if(!!this.props.embassyEvents) {
            events = this.props.embassyEvents
        }

        if(!!this.props.bulletins) {
            bulletins = this.props.bulletins
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
                    <div className={"dashboard-container"}>
                        <div className={"dashboard-section"}>
                            <h4>Próxima reunião</h4>
                            {events.length > 0 && <div className={"next-event"}>
                                <div className={"date-event"}>
                                    <Link to={"/"}>
                                        <span className={"month"}>{!!events[0].date ? timestampToDate(events[0].date).month_abbrev : ""}</span>
                                        <span className={"day"}>{!!events[0].date ? timestampToDate(events[0].date).date : ""}</span>
                                    </Link>
                                </div>
                                <div className={"description-event"}>
                                    <Link to={"/"}>
                                        <span className={"time"}>{!!events[0].date ? timestampToDate(events[0].date).weekday+" às "+timestampToDate(events[0].date).hour+":"+timestampToDate(events[0].date).min: ""}</span>
                                        <span className={"theme"}>{events[0].theme}</span>
                                        <span className={"place"}>{events[0].city+", "+events[0].state_short}</span>
                                    </Link>
                                </div>
                            </div>}
                            {(!!this.props.embassyEvents && events.length === 0) && <span className={"no-events-msg"}>Não há eventos previstos</span>}
                        </div>
                        <div className={"dashboard-section"}>
                            <h4>Minha Embaixada</h4>
                            <div className={"row-buttons"}>
                                <div className={"dashboard-button first-button"}>
                                    <Link to={"/embaixada/membros"} >
                                        <Group/>
                                        <span>Membros</span>
                                    </Link>
                                </div>
                                <div className={"dashboard-button"}>
                                    <Link to={"/embaixada/agenda"} >
                                        <DateRange/>
                                        <span>Eventos</span>
                                    </Link>
                                </div>
                                <div className={"dashboard-button"}>
                                    <Link to={"/embaixada/fotos"} >
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
                                {bulletins.map((bulletin, i) => (
                                    <li className={"bulletin-item"}>
                                        <span className={"title"}>{bulletin.title}</span>
                                        <p className={"description"}>{bulletin.resume}</p>
                                    </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <SimpleBottomNavigation currentTab={"home"} handleChangeTab={this.handleChangeTab}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    authUser: state.auth.currentUser,
    embassyEvents: state.events.embassyEventsList,
    bulletins: state.bulletins.bulletinsList
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({getEmbassyEvents, listBulletins}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileDashboardContainer)