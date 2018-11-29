import { combineReducers } from 'redux';
import userAuthReducer from './userReducer';


const rootReducer = combineReducers({
    userAuth: userAuthReducer,
})

export default rootReducer