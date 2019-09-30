import firebase from 'firebase';
import {Invitation} from "../models/Invitation";
import User from "../models/User";

interface Action {
    type: string
    payload: any
}

interface StoreState {
    validatedCode?: boolean;
    invitation?: firebase.firestore.DocumentData
    userDetails?: User
    isCompleted?: boolean
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_SUBMIT_CODE':
            return {...state, validatedCode: action.payload.validated, invitation: action.payload.invitation};
        case 'ON_GET_USER_DETAILS':
            return {...state, userDetails: action.payload.userDetails};
        case 'ON_SET_USER_DETAILS':
            return {...state, isCompleted: action.payload.isCompleted};
        default:
            return state
    }
}