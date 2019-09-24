interface Action {
    type: string
    payload: any
}

export default function (state={}, action: Action) {
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