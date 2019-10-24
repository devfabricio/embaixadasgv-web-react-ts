import User from "../models/User";
import firebase from "firebase";


interface Action {
    type: string
    payload: any
}

interface StoreState {
    usersList?: Array<User>
    usersLastDoc?: firebase.firestore.DocumentData | null
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_LIST':
            return {...state, usersList: action.payload.list, usersLastDoc: action.payload.lastDoc};
        default:
            return state
    }
}