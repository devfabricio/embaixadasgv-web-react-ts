import React from "react";
import {EventInterface} from "../../../../interface/EventInterface";
import {timestampToDate} from "../../../../utils/dates";

interface Props {
    event: EventInterface
}

const EventCard = (props: Props) => {

    let event = props.event
    let cover_img = event.cover_img

    return(
        <div className={"event-card"}>
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
        </div>
    )
}

export default EventCard