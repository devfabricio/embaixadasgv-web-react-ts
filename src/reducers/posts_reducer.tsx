import {Post} from "../models/Post";

interface Action {
    type: string
    payload: any
}

interface StoreState {
    postsList?: Array<Post>
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_LIST':
            return {...state, postsList: action.payload};
        default:
            return state
    }
}