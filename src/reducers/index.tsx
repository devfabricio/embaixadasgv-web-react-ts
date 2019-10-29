import {combineReducers} from 'redux'
import users from './users_reducer'
import posts from './posts_reducer'
import events from './events_reducer'
import auth from './auth_reducer'
import bulletins from './bulletin_reducer'
import landing from './landing_reducer'

const rootReducer = combineReducers({
    auth,
    bulletins,
    users,
    posts,
    events,
    landing
});
export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>