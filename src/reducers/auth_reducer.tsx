import firebase from 'firebase';
import {Invitation} from "../models/Invitation";
import {User as CurrentUser} from 'firebase'
import User from "../models/User";
import {EmbassyInterface} from "../interface/EmbassyInterface";

interface Action {
    type: string
    payload: any
}

interface StoreState {
    currentUser?: firebase.firestore.DocumentData
    isLogged?: boolean
    validatedCode?: boolean
    invitation?: firebase.firestore.DocumentData
    userDetails?: User
    isCompleted?: boolean
    usernameValidate?: boolean
    embassy?: EmbassyInterface | null
    invitationSent?: boolean
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_CHECK_AUTH':
            return {...state, isLogged: action.payload.isLogged, currentUser: action.payload.currentUser};
        case 'ON_SUBMIT_CODE':
            return {...state, validatedCode: action.payload.validated, invitation: action.payload.invitation};
        case 'ON_REQUEST_INVITE':
            return {...state, embassy: action.payload.embassy, usernameValidate: action.payload.validated};
        case 'ON_SEND_REQUEST_INVITATION':
            return {...state, invitationSent: action.payload.invitationSent};
        case 'ON_GET_USER_DETAILS':
            return {...state, userDetails: action.payload.userDetails};
        case 'ON_SET_USER_DETAILS':
            return {...state, isCompleted: action.payload.isCompleted};
        default:
            return state
    }
}