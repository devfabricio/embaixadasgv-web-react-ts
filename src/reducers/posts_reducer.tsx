import {Post} from "../models/Post";
import firebase from "firebase";

interface Action {
    type: string
    payload: any
}

interface StoreState {
    highlightsPostsList?: Array<Post>
    embassyPostsList?: Array<Post>
    allPostsList?: Array<Post>
    highlightsLastDoc?: firebase.firestore.DocumentData
    embassyLastDoc?: firebase.firestore.DocumentData
    allLastDoc?: firebase.firestore.DocumentData
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_LIST_HIGHLIGHTS_POSTS':
            return {...state, highlightsPostsList: action.payload.list, highlightsLastDoc: action.payload.lastDoc};
        case 'ON_LIST_EMBASSY_POSTS':
            return {...state, embassyPostsList: action.payload.list, embassyLastDoc: action.payload.lastDoc};
        case 'ON_LIST_ALL_POSTS':
            return {...state, allPostsList: action.payload.list, allLastDoc: action.payload.lastDoc};
        default:
            return state
    }
}