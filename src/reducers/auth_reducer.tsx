import firebase from 'firebase';
import {Invitation} from "../models/Invitation";

interface Action {
    type: string
    payload: any
}

interface StoreState {
    validatedCode?: boolean;
    invitation?: Invitation
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_SUBMIT_CODE':
            return {...state, validatedCode: action.payload.validated, invitation: action.payload.invitation};
        default:
            return state
    }
}