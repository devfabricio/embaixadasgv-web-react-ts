import User from "../models/User";
import firebase from "firebase";


interface Action {
    type: string
    payload: any
}

interface StoreState {
    usersList?: Array<User>
    membersList?: Array<User>
    usersLastDoc?: firebase.firestore.DocumentData | null
    singleUser?: User
    usersCount?: number

}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_LIST':
            return {...state, usersList: action.payload.list, usersLastDoc: action.payload.lastDoc};
        case 'ON_USERS_COUNT':
            return {...state, usersCount: action.payload.usersCount};
        case 'ON_LIST_EMBASSY_MEMBERS':
            return {...state, membersList: action.payload.list};
        case 'ON_GET_SINGLE_USER':
            return {...state, singleUser: action.payload.user};
        default:
            return state
    }
}