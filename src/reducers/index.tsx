import {combineReducers} from 'redux'
import users from './users_reducer'
import events from './events_reducer'
import auth from './auth_reducer'
import landing from './landing_reducer'

const rootReducer = combineReducers({
    auth,
    users,
    events,
    landing
});
export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>