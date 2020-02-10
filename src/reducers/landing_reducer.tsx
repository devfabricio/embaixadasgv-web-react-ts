import {EmbassySponsor} from "../models/EmbassySponsor";
import Embassy from "../models/Embassy";
import firebase from 'firebase';


interface Action {
    type: string
    payload: any
}

interface StoreState {
    embassyRegistered?: boolean,
    embassyList?: Array<Embassy>
    policy_privacy?: string,
    sponsorsList?: Array<EmbassySponsor>
    hasEmbassy?: boolean
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_REGISTER':
            return {...state, embassyRegistered: action.payload};
        case 'ON_LIST':
            return {...state, embassyList: action.payload};
        case 'ON_LIST_EMBASSY_BY_CITY':
            return {...state, hasEmbassy: action.payload};
        case 'ON_GET_PRIVACY':
            return {...state, policy_privacy: action.payload};
        case 'ON_LIST_SPONSORS' :
            return {...state, sponsorsList: action.payload};
        default:
            return state
    }
}