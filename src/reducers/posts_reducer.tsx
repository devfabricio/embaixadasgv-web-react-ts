import {Post} from "../models/Post";

interface Action {
    type: string
    payload: any
}

interface StoreState {
    highlightsPostsList?: Array<Post>
    embassyPostsList?: Array<Post>
    allPostsList?: Array<Post>
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_LIST_HIGHLIGHTS_POSTS':
            return {...state, highlightsPostsList: action.payload};
        case 'ON_LIST_EMBASSY_POSTS':
            return {...state, embassyPostsList: action.payload};
        case 'ON_LIST_ALL_POSTS':
            return {...state, allPostsList: action.payload};
        default:
            return state
    }
}