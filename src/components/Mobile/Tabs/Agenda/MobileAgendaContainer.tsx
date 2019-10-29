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
import EventCard from "./EventCard";

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
        window.scrollTo({ top: 0})
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
                    <div className={"event-container"}>
                        <span className={"list-title"}>Próximos eventos</span>
                        <ul className={"list-events"}>
                        {list.map((event, i) => (
                                <li>
                                    <Link to={"/"}>
                                        <EventCard event={event}/>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
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