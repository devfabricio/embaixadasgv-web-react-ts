import Embassy from "../models/Embassy";
import DocumentData = firebase.firestore.DocumentData;
import {EmbassySponsor} from "../models/EmbassySponsor";

interface Action {
    type: string
    payload: any
}

interface StoreState {
    embassyRegistered?: boolean,
    embassyList?: Array<Embassy>
    policy_privacy?: DocumentData,
    sponsorsList?: Array<EmbassySponsor>
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_REGISTER':
            return {...state, embassyRegistered: action.payload};
        case 'ON_LIST':
            return {...state, embassyList: action.payload};
        case 'ON_GET_PRIVACY':
            return {...state, policy_privacy: action.payload};
        case 'ON_LIST_SPONSORS' :
            return {...state, sponsorsList: action.payload};
        default:
            return state
    }
}