import React, {Component} from "react";
import {AppState} from "../../../../reducers";
import {bindActionCreators, Dispatch} from "redux";
import {listEvents} from "../../../../actions/events_actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import SimpleBottomNavigation from "../../../Widgets/SimpleBottomNavigation";
import Event from "../../../../models/Event";
import User from "../../../../models/User";
import {Link} from "react-router-dom";
import firebase from "firebase";
import {timestampToDate} from "../../../../utils/dates";

interface Props {
    listEvents: () => void
    events: Array<Event>
}

class MobileAgendaContainer extends Component<Props>{

    state = {
        tabName: "agenda",
        tabPath: "/"
    };

    componentDidMount(): void {
        this.props.listEvents()
    }

    handleChangeTab = (tabName: string, tabPath: string) => {
        this.setState({...this.state, tabName: tabName, tabPath: tabPath})
    };

    render() {

        if(this.state.tabName !== "agenda") {
            return (
                <Redirect to={this.state.tabPath} />
            )
        }

        let list: Array<Event> = [];

        if(!!this.props.events) {
            list = this.props.events
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
                    <ul className={"list-events"}>
                    {list.map((event, i) => (
                            <li>
                                <Link to={"/"}>
                                    <div className={"event-item-cover"} style={{backgroundImage: !!event.cover_img ? "url("+event.cover_img+")" : "url(assets/images/bg_default_cover.png)"}}/>
                                    <div className={"event-item-description"}>
                                        <div className={"date-event"}>
                                            <span className={"month"}>{!!event.date ? timestampToDate(event.date).month_abbrev : ""}</span>
                                            <span className={"day"}>{!!event.date ? timestampToDate(event.date).date : ""}</span>
                                        </div>
                                        <div className={"description-event"}>
                                            <span className={"time"}>{!!event.date ? timestampToDate(event.date).weekday+" às "+timestampToDate(event.date).hour+":"+timestampToDate(event.date).min: ""}</span>
                                            <span className={"theme"}>{event.theme}</span>
                                            <span className={"place"}>{!!event.embassy ? event.embassy.name : ""} - {event.city+", "+event.state_short}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <SimpleBottomNavigation currentTab={"agenda"} handleChangeTab={this.handleChangeTab}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    events: state.events.eventsList,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators({listEvents}, dispatch)
);

export default connect (mapStateToProps, mapDispatchToProps) (MobileAgendaContainer)