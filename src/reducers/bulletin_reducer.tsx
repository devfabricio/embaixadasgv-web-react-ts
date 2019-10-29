import {Bulletin} from "../models/Bulletin";

interface Action {
    type: string
    payload: any
}

interface StoreState {
    bulletinsList?: Array<Bulletin>
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_LIST_BULLETINS':
            return {...state, bulletinsList: action.payload};
        default:
            return state
    }
}