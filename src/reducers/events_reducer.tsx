import Event from "../models/Event";


interface Action {
    type: string
    payload: any
}

interface StoreState {
    eventsList?: Array<Event>
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_LIST':
            return {...state, eventsList: action.payload};
        default:
            return state
    }
}