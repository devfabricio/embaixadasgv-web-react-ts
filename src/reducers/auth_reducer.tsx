interface Action {
    type: string
    payload: any
}

export default function (state={}, action: Action) {
    switch (action.type) {
        case 'ON_SUBMIT_CODE':
            return {...state, validatedCode: action.payload.validated, invitation: action.payload.invitation};
        default:
            return state
    }
}