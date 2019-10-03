import User from "../models/User";


interface Action {
    type: string
    payload: any
}

interface StoreState {
    usersList?: Array<User>
}

export default function (state: StoreState = {}, action: Action) {

    switch (action.type) {
        case 'ON_LIST':
            return {...state, usersList: action.payload};
        default:
            return state
    }
}