import Event from "../models/Event";


interface Action {
    type: string
    payload: any
}

interface StoreState {
    eventsList?: Array<Event>
    embassyEventsList?: Array<Event>
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_LIST_EVENTS':
            return {...state, eventsList: action.payload};
        case 'ON_LIST_EMBASSY_EVENTS':
            return {...state, embassyEventsList: action.payload};
        default:
            return state
    }
}