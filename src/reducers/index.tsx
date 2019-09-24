import {combineReducers} from 'redux'
import auth from './auth_reducer'
import landing from './landing_reducer'

const rootReducer = combineReducers({
    auth,
    landing
});

export default rootReducer;